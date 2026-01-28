import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { checkBotId } from 'botid/server';

import { areFormsEnabled } from '@/shared/lib/forms-status';
import { validateAndMarkSubmissionCode } from '@/shared/lib/submission-codes';

const HUBSPOT_FORMS_API_URL =
  'https://api.hsforms.com/submissions/v3/integration/submit/146476440/fc8302ca-aa67-4e59-a6e6-e69bc1d0cd46';

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
  console.log('[BOTID] HubSpot Lead verification', {
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
    console.warn('[BOTID] Blocked HubSpot Lead request', {
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
  const { submissionCode, email, phone, ...restBody } = body;
  const properties = restBody?.properties || restBody;

  console.log('[HUBSPOT-LEAD] Received submissionCode:', {
    hasCode: !!submissionCode,
    hasEmail: !!email,
    hasPhone: !!phone,
    codePreview: submissionCode ? `${submissionCode.substring(0, 20)}...` : 'none',
  });

  // Validate submission code with email and phone
  const isValidCode = await validateAndMarkSubmissionCode(
    submissionCode,
    email,
    phone,
    'hubspot-lead'
  );

  if (!isValidCode) {
    console.warn('[HUBSPOT-LEAD] Blocked: Invalid submission code or mismatch with email/phone');
    return NextResponse.json(
      {
        error: 'Invalid or missing submission code. Please submit the form through the website.',
      },
      { status: 403 }
    );
  }

  console.log('[HUBSPOT-LEAD] Submission code validated successfully');

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

    // Add email and phone to fields if they exist (required by HubSpot)
    // Check if they already exist in fields to avoid duplicates
    if (email && !fields.find((field) => field.name === 'email')) {
      fields.push({
        name: 'email',
        value: String(email),
      });
    }
    if (phone && !fields.find((field) => field.name === 'phone')) {
      fields.push({
        name: 'phone',
        value: String(phone),
      });
    }

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
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
