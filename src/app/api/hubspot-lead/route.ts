import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { areFormsEnabled } from '@/shared/lib/forms-status';

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
  const { turnstileToken, ...restBody } = body;
  const properties = restBody?.properties || restBody;

  // Verify Cloudflare Turnstile token if provided
  // Note: Token may be already used in main route, so timeout-or-duplicate is acceptable
  if (turnstileToken) {
    try {
      const secretKey = process.env.TURNSTILE_SECRET_KEY;
      if (!secretKey) {
        console.warn('[TURNSTILE] Secret key not configured, skipping verification');
      } else {
        const turnstileResponse = await fetch(
          'https://challenges.cloudflare.com/turnstile/v0/siteverify',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              secret: secretKey,
              response: turnstileToken,
            }),
          }
        );
        const turnstileData = await turnstileResponse.json();
        if (!turnstileData.success) {
          const errorCodes = turnstileData['error-codes'] || [];
          // Allow timeout-or-duplicate errors (token already verified in main route)
          const isTimeoutOrDuplicate = errorCodes.includes('timeout-or-duplicate');

          if (isTimeoutOrDuplicate) {
            console.log('[TURNSTILE] Token already used (expected for secondary routes)');
            // Don't block - token was already verified in main route
          } else {
            console.warn('[BOT DETECTED] Invalid Turnstile token', {
              errors: errorCodes,
            });
            return NextResponse.json(
              { error: 'Security verification failed. Please try again.' },
              { status: 400 }
            );
          }
        }
      }
    } catch (turnstileError) {
      console.error('Error verifying Turnstile:', turnstileError);
      // Don't block on Turnstile verification errors, but log them
    }
  }

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
