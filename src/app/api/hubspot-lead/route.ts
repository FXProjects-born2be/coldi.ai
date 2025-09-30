import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const HUBSPOT_FORMS_API_URL =
  'https://api.hsforms.com/submissions/v3/integration/submit/146476440/fc8302ca-aa67-4e59-a6e6-e69bc1d0cd46';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const properties = body?.properties || body;

  try {
    // Extract hutk from hubspotutk cookie
    const hubspotutk = req.cookies.get('hubspotutk')?.value || '';

    // Get city from IP using ipapi.co (free service)
    let city = 'unknown';
    try {
      // Replace with your actual API endpoint and key (if applicable)
      const response = await fetch(
        'https://api.ipdata.co?api-key=d44bfbc4443b29d45d5d1fe1694e3f4c6f17d6e4d00f2bb6f0838569'
      );
      const data = await response.json();
      city = data.city;
      console.log(`User's city: ${city}`);
    } catch (error) {
      console.error('Error fetching IP geolocation:', error);
    }

    // Convert properties to fields array format
    const fields = Object.entries(properties)
      .filter(([, value]) => value !== undefined && value !== null && value !== '')
      .map(([name, value]) => ({
        name,
        value: String(value),
      }));

    // Add ip_city2 field if not present
    if (!fields.find((field) => field.name === 'ip_city2')) {
      fields.push({
        name: 'ip_city2',
        value: city,
      });
    }

    const referer = req.headers.get('referer') || 'https://coldi.ai';

    const lastSegment = referer.split('/').pop() || 'coldi';
    const pageName =
      lastSegment.split('-').join(' ').charAt(0).toUpperCase() +
      lastSegment.split('-').join(' ').slice(1);

    const formData = {
      fields,
      context: {
        hutk: hubspotutk,
        pageUri: req.headers.get('referer') || 'https://coldi.ai',
        pageName: pageName,
      },
      legalConsentOptions: {
        consent: {
          consentToProcess: true,
          text: 'I agree to terms',
        },
      },
    };

    console.log('referer', req.headers.get('referer'));

    console.log('Form data:', formData);

    const hubspotRes = await fetch(HUBSPOT_FORMS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
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
