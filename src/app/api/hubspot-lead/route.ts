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
    const hubspotRes = await fetch(HUBSPOT_API_URL, {
      method: 'POST',
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
