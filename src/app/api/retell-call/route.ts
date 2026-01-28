import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { checkBotId } from 'botid/server';

import { areFormsEnabled } from '@/shared/lib/forms-status';
import { validateAndMarkSubmissionCode } from '@/shared/lib/submission-codes';
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
  // Get request metadata for logging
  const ip =
    req.headers.get('x-forwarded-for') ||
    req.headers.get('x-real-ip') ||
    req.headers.get('cf-connecting-ip') ||
    'unknown';
  const userAgent = req.headers.get('user-agent') || 'unknown';
  const referer = req.headers.get('referer') || 'unknown';

  // Check BotID headers
  const botIdHeaders = {
    'x-vercel-botid': req.headers.get('x-vercel-botid'),
    'x-vercel-botid-signature': req.headers.get('x-vercel-botid-signature'),
    'x-vercel-botid-version': req.headers.get('x-vercel-botid-version'),
  };

  // Feature flag: Temporarily disable BotID for debugging
  // Set to false to disable BotID check temporarily
  const BOTID_ENABLED = true;

  let verification;
  if (BOTID_ENABLED) {
    // Check BotID with development options for local testing
    // In production, this will use real bot detection
    verification = await checkBotId({
      developmentOptions: {
        bypass: 'HUMAN', // In development, always allow (set to 'BAD-BOT' to test blocking)
      },
    });
  } else {
    // Temporarily bypass BotID for debugging
    verification = { isBot: false };
    console.warn('[BOTID] BotID check is DISABLED for debugging');
  }

  // Log BotID verification result with all headers
  console.log('[BOTID] Retell Call verification', {
    timestamp: new Date().toISOString(),
    ip,
    userAgent,
    referer,
    isBot: verification.isBot,
    verification: JSON.stringify(verification, null, 2),
    botIdHeaders,
    hasBotIdHeaders: !!botIdHeaders['x-vercel-botid'],
    allHeaders: Object.fromEntries(req.headers.entries()),
    status: verification.isBot ? 'BLOCKED' : 'ALLOWED',
    environment: process.env.NODE_ENV,
  });

  if (verification.isBot) {
    console.warn('[BOTID] Blocked Retell Call request', {
      timestamp: new Date().toISOString(),
      ip,
      userAgent,
      referer,
      reason: 'BotID detected bot',
      verification: JSON.stringify(verification, null, 2),
      botIdHeaders,
      hasBotIdHeaders: !!botIdHeaders['x-vercel-botid'],
      note: 'BotID requires requests from page via fetch with proper headers. Check if initBotId() is called and headers are sent.',
    });
    return NextResponse.json(
      {
        error: 'Bot detected. Access denied.',
        message:
          'BotID blocked this request. Please ensure the request is made from the website page.',
        debug: {
          hasBotIdHeaders: !!botIdHeaders['x-vercel-botid'],
          verification: verification,
        },
      },
      { status: 403 }
    );
  }

  // Check if forms are enabled
  const formsEnabled = await areFormsEnabled();
  if (!formsEnabled) {
    return NextResponse.json(
      {
        error: 'Form submissions are currently disabled. Please try again later.',
      },
      { status: 503 }
    );
  }

  const body = await req.json();
  console.log('Received body:', body);
  const { name, email, phone, industry, company, agent, countryCode, submissionCode } = body;
  console.log('Extracted fields:', {
    name,
    email,
    phone,
    industry,
    company,
    agent,
  });

  // Validate submission code with email and phone
  const isValidCode = await validateAndMarkSubmissionCode(
    submissionCode,
    email,
    phone,
    'retell-call'
  );

  if (!isValidCode) {
    console.warn('[RETELL-CALL] Blocked: Invalid submission code or mismatch with email/phone');
    return NextResponse.json(
      {
        error: 'Invalid or missing submission code. Please submit the form through the website.',
      },
      { status: 403 }
    );
  }

  // Get system status from cache or fetch fresh (with cookie caching)
  const { response: cachedResponse } = await getSystemStatusWithCache(req);
  // Status is now cached in cookie for 5 minutes, getRetellPhoneNumber() will use it

  const apiKey = process.env.RETELL_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'RETELL_API_KEY not configured' }, { status: 500 });
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
    // Clear session token cookie after successful validation
    successResponse.cookies.delete('session-token');
    return successResponse;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
