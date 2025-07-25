import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const HUBSPOT_API_URL = 'https://api.hubapi.com/crm/v3/objects/contacts';
const HUBSPOT_DEALS_URL = 'https://api.hubapi.com/crm/v3/objects/deals';

export async function POST(req: NextRequest) {
  const token = process.env.HUBSPOT_TOKEN;
  if (!token) {
    return NextResponse.json({ error: 'HubSpot token not configured' }, { status: 500 });
  }

  const body = await req.json();
  const properties = body?.properties || body;

  try {
    // First, try to find existing contact by email
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
                value: properties.email,
              },
            ],
          },
        ],
        properties: ['email', 'firstname', 'phone', 'website'],
        limit: 1,
      }),
    });

    let contactId = null;
    if (searchResponse.ok) {
      const searchData = await searchResponse.json();
      if (searchData.results && searchData.results.length > 0) {
        contactId = searchData.results[0].id;
      }
    }

    let hubspotRes;
    if (contactId) {
      console.log('updateProperties', properties);

      // Update existing contact
      hubspotRes = await fetch(`${HUBSPOT_API_URL}/${contactId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ properties }),
      });
    } else {
      // Create new contact
      hubspotRes = await fetch(HUBSPOT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ properties }),
      });
    }

    // Check if response is JSON
    const contentType = hubspotRes.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const textResponse = await hubspotRes.text();
      console.error('HubSpot returned non-JSON response:', textResponse.substring(0, 500));
      return NextResponse.json(
        {
          error: 'HubSpot API returned invalid response format',
          status: hubspotRes.status,
        },
        { status: 500 }
      );
    }

    const data = await hubspotRes.json();

    if (!hubspotRes.ok) {
      console.error('HubSpot API error:', data);
      return NextResponse.json(
        {
          error: 'Failed to create/update contact',
          details: data,
        },
        { status: hubspotRes.status }
      );
    }

    // Get contact ID for deal creation
    const finalContactId = contactId || data.id;

    const propertiesType =
      properties.type === 'pricing_request'
        ? 'Pricing Request'
        : properties.type === 'lead_request'
          ? 'Lead Request'
          : 'Call Request';

    // Create deal for this contact
    if (finalContactId) {
      const dealProperties = {
        dealname: `${propertiesType} - ${properties.email}`,
      };

      console.log('Creating deal for contact:', finalContactId);

      const dealRes = await fetch(HUBSPOT_DEALS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          properties: dealProperties,
          associations: [
            {
              to: {
                id: finalContactId,
              },
              types: [
                {
                  associationCategory: 'HUBSPOT_DEFINED',
                  associationTypeId: 1, // Contact to Deal association
                },
              ],
            },
          ],
        }),
      });

      if (dealRes.ok) {
        const dealData = await dealRes.json();
        console.log('Deal created successfully:', dealData.id);
      } else {
        const dealError = await dealRes.json();
        console.error('Failed to create deal:', dealError);
      }
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    console.error('HubSpot API error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
