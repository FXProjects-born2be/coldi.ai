import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const HUBSPOT_API_URL = 'https://api.hubapi.com/crm/v3/objects/contacts';

export async function POST(req: NextRequest) {
  const token = process.env.HUBSPOT_TOKEN;
  if (!token) {
    return NextResponse.json({ error: 'HubSpot token not configured' }, { status: 500 });
  }

  const body = await req.json();
  let properties = body?.properties || body;

  // Remove 'type' property if it exists
  if (properties && typeof properties === 'object' && 'type' in properties) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { type: _removed, ...rest } = properties;
    properties = rest;
  }

  try {
    // Check if lead with email already exists
    const email = properties?.email;
    if (!email) {
      return NextResponse.json({ error: 'Email is required for lead update' }, { status: 400 });
    }

    const searchUrl = `${HUBSPOT_API_URL}/search`;
    const searchResponse = await fetch(searchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        filterGroups: [
          {
            filters: [
              {
                propertyName: 'email',
                operator: 'EQ',
                value: email,
              },
            ],
          },
        ],
        properties: ['email', 'firstname', 'lastname'],
      }),
    });

    if (!searchResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to search for existing lead' },
        { status: searchResponse.status }
      );
    }

    const searchData = await searchResponse.json();

    if (searchData.total === 0) {
      return NextResponse.json({ error: 'Lead with this email not found' }, { status: 404 });
    }

    // Get the first matching contact ID
    const contactId = searchData.results[0].id;

    // Update the existing contact
    const updateUrl = `${HUBSPOT_API_URL}/${contactId}`;
    const hubspotRes = await fetch(updateUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ properties }),
    });

    const data = await hubspotRes.json();
    if (!hubspotRes.ok) {
      return NextResponse.json({ error: data }, { status: hubspotRes.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
