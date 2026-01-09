import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { areFormsEnabled } from '@/shared/lib/forms-status';
import { getRetellPhoneNumber } from '@/shared/lib/system-status';
import { getSystemStatusWithCache } from '@/shared/lib/system-status-cache';

const RETELL_API_URL = 'https://api.retellai.com/v2/create-phone-call';

const AGENT_IDS: Record<string, string> = {
  Sophie: 'agent_c7bdb8b06aea7f3d389f49eddc',
  George: 'agent_6fc05cc128bcee73ca7d0007c5',
  Kate: 'agent_783e3b56e581419bb847db9cff',
  Monica: 'agent_7883fdd6010e66c3026b30976b',
};

export async function POST(req: NextRequest) {
  // Check if forms are enabled
  const formsEnabled = await areFormsEnabled();
  if (!formsEnabled) {
    return NextResponse.json(
      { error: 'Form submissions are currently disabled. Please try again later.' },
      { status: 503 }
    );
  }

  // Get system status from cache or fetch fresh (with cookie caching)
  const { response: cachedResponse } = await getSystemStatusWithCache(req);
  // Status is now cached in cookie for 5 minutes, getRetellPhoneNumber() will use it

  const apiKey = process.env.RETELL_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'RETELL_API_KEY not configured' }, { status: 500 });
  }

  const body = await req.json();
  console.log('Received body:', body);
  const { name, email, phone, industry, company, agent, countryCode, turnstileToken } = body;
  console.log('Extracted fields:', { name, email, phone, industry, company, agent });

  // Verify Cloudflare Turnstile token if provided
  // Note: Token may be already used in /api/request-call, so timeout-or-duplicate is acceptable
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
            // Don't block - token was already verified in /api/request-call
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

  if (!name || !email || !phone || !industry || !company || !agent) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const override_agent_id = AGENT_IDS[agent];
  if (!override_agent_id) {
    console.log('Unknown agent:', agent);
    console.log('Available agents:', Object.keys(AGENT_IDS));
    return NextResponse.json({ error: 'Unknown agent' }, { status: 400 });
  }

  // Get phone number after status check to ensure correct number (primary/reserve)
  const fromNumber = getRetellPhoneNumber();
  console.log('[Retell Call] Using phone number:', fromNumber);

  const payload = {
    from_number: fromNumber,
    to_number: phone.startsWith('+') ? phone : `+${phone}`,

    override_agent_id,
    metadata: {},
    retell_llm_dynamic_variables: {
      first_name: name,
      email,
      industry,
      companySize: company,
      country_code: countryCode,
    },
    custom_sip_headers: {
      'X-Custom-Header': '1',
    },
  };

  console.log('Sending to Retell:', payload);
  console.log('Retell API Key exists:', !!apiKey);

  try {
    const retellRes = await fetch(RETELL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });
    const data = await retellRes.json();
    console.log('Retell response:', data);
    if (!retellRes.ok) {
      console.log('Retell error status:', retellRes.status);
      console.log('Retell error data:', data);
      const errorResponse = NextResponse.json({ error: data }, { status: retellRes.status });
      // Copy status cookie to error response (status was already cached at the start)
      cachedResponse.cookies.getAll().forEach((cookie) => {
        errorResponse.cookies.set(cookie.name, cookie.value, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: Math.floor((5 * 60 * 1000) / 1000),
          path: '/',
        });
      });
      return errorResponse;
    }
    const successResponse = NextResponse.json(data, { status: 200 });
    // Copy status cookie to success response (status was already cached at the start)
    cachedResponse.cookies.getAll().forEach((cookie) => {
      successResponse.cookies.set(cookie.name, cookie.value, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: Math.floor((5 * 60 * 1000) / 1000),
        path: '/',
      });
    });
    return successResponse;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
