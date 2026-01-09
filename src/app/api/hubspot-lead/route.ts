import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { areFormsEnabled } from '@/shared/lib/forms-status';
import { validateAndConsumeSessionToken } from '@/shared/lib/session-tokens';

const HUBSPOT_FORMS_API_URL =
  'https://api.hsforms.com/submissions/v3/integration/submit/146476440/fc8302ca-aa67-4e59-a6e6-e69bc1d0cd46';

export async function POST(req: NextRequest) {
  // Check if forms are enabled
  const formsEnabled = await areFormsEnabled();
  if (!formsEnabled) {
    return NextResponse.json(
      { error: 'Form submissions are currently disabled. Please try again later.' },
      { status: 503 }
    );
  }

  const body = await req.json();
  const { sessionToken: bodySessionToken, ...restBody } = body;
  const properties = restBody?.properties || restBody;

  // Get session token from cookie (preferred) or body (if referer is valid)
  const sessionTokenFromCookie = req.cookies.get('session-token')?.value;
  const referer = req.headers.get('referer');
  const isFromOurDomain =
    referer && (referer.includes('coldi.ai') || referer.includes('localhost'));

  // Use cookie if available, otherwise use body only if referer is valid (normal form submission)
  const sessionToken = sessionTokenFromCookie || (isFromOurDomain ? bodySessionToken : null);

  console.log('[HUBSPOT-LEAD] Received sessionToken:', {
    fromCookie: !!sessionTokenFromCookie,
    fromBody: !!bodySessionToken,
    tokenLength: sessionToken?.length || 0,
    tokenPreview: sessionToken ? `${sessionToken.substring(0, 20)}...` : 'none',
    referer,
    isFromOurDomain,
    usingTokenFrom: sessionTokenFromCookie
      ? 'cookie'
      : isFromOurDomain
        ? 'body (valid referer)'
        : 'none',
  });

  // Block if no token at all
  if (!sessionToken) {
    console.warn('[HUBSPOT-LEAD] Blocked: No session token (cookie or valid body with referer)');
    return NextResponse.json(
      { error: 'Invalid or missing session token. Please submit the form through the website.' },
      { status: 403 }
    );
  }

  // Block if token is only in body but referer is invalid (likely direct console call)
  if (!sessionTokenFromCookie && bodySessionToken && !isFromOurDomain) {
    console.warn(
      '[HUBSPOT-LEAD] Blocked: Token in body but invalid referer (likely direct console call)',
      {
        referer,
      }
    );
    return NextResponse.json(
      { error: 'Invalid request origin. Please submit the form through the website.' },
      { status: 403 }
    );
  }

  const isValidSession = validateAndConsumeSessionToken(sessionToken, 'hubspot-lead');
  console.log('[HUBSPOT-LEAD] Session token validation result:', isValidSession);

  if (!isValidSession) {
    console.warn('[HUBSPOT-LEAD] Session token validation failed', {
      hasToken: !!sessionToken,
      tokenType: typeof sessionToken,
      tokenValue: sessionToken ? 'present' : 'missing',
    });
    return NextResponse.json(
      { error: 'Invalid or missing session token. Please submit the form through the website.' },
      { status: 403 }
    );
  }

  // Clear cookie after successful validation
  const response = NextResponse.json({ success: true });
  response.cookies.delete('session-token');

  console.log('[HUBSPOT-LEAD] Session token validated successfully');

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

    const context: {
      hutk?: string;
      pageUri: string;
      pageName: string;
    } = {
      pageUri: req.headers.get('referer') || 'https://coldi.ai',
      pageName: pageName,
    };

    if (hubspotutk) {
      context.hutk = hubspotutk;
    }

    const formData = {
      fields,
      context,
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
