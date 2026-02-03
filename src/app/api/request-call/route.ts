import { NextResponse } from 'next/server';

import sgMail from '@sendgrid/mail';
import { checkBotId } from 'botid/server';

import type { Agent } from '@/features/request-call-tst/store/store';

import { detectBot, getClientIp } from '@/shared/lib/anti-bot';
import { areFormsEnabled } from '@/shared/lib/forms-status';
import { generateSubmissionCode } from '@/shared/lib/submission-codes';

type RequestCallData = {
  name: string;
  email: string;
  phone: string;
  industry: string;
  company: string;
  scenario: string;
  agent: Agent;
  website_url?: string; // Honeypot field
  turnstileToken?: string; // Backward compatibility
  captchaToken?: string;
  recaptchaToken?: string;
};

export async function POST(request: Request): Promise<NextResponse> {
  // Get request metadata for logging
  const ip =
    request.headers.get('x-forwarded-for') ||
    request.headers.get('x-real-ip') ||
    request.headers.get('cf-connecting-ip') ||
    'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  const referer = request.headers.get('referer') || 'unknown';

  // Check BotID headers
  const botIdHeaders = {
    'x-vercel-botid': request.headers.get('x-vercel-botid'),
    'x-vercel-botid-signature': request.headers.get('x-vercel-botid-signature'),
    'x-vercel-botid-version': request.headers.get('x-vercel-botid-version'),
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
  console.log('[BOTID] Request Call verification', {
    timestamp: new Date().toISOString(),
    ip,
    userAgent,
    referer,
    isBot: verification.isBot,
    verification: JSON.stringify(verification, null, 2),
    botIdHeaders,
    hasBotIdHeaders: !!botIdHeaders['x-vercel-botid'],
    allHeaders: Object.fromEntries(request.headers.entries()),
    status: verification.isBot ? 'BLOCKED' : 'ALLOWED',
    environment: process.env.NODE_ENV,
  });

  if (verification.isBot) {
    console.warn('[BOTID] Blocked Request Call request', {
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

  try {
    // Check if forms are enabled
    const formsEnabled = await areFormsEnabled();
    if (!formsEnabled) {
      return NextResponse.json(
        { message: 'Form submissions are currently disabled. Please try again later.' },
        { status: 503 }
      );
    }

    const bodyJSON = (await request.json()) as RequestCallData & {
      captchaToken?: string;
      recaptchaToken?: string;
    };
    const {
      name,
      email,
      phone,
      industry,
      company,
      scenario,
      agent,
      turnstileToken,
      captchaToken,
      recaptchaToken,
    } = bodyJSON;

    // Use unified captcha token (prefer new name, fallback to old names for backward compatibility)
    const token = captchaToken || recaptchaToken || turnstileToken;

    // Comprehensive bot detection (includes checkRateLimits for IP/email/phone)
    const botDetection = detectBot(request, bodyJSON, 'call');

    // Block if honeypot filled, rate limit exceeded, or suspicious pattern
    if (botDetection.blocked) {
      return NextResponse.json(
        {
          message:
            botDetection.reason ||
            'Request blocked due to security policy. Please try again later.',
        },
        { status: 429 }
      );
    }

    // Get request metadata for logging
    const ip = getClientIp(request);
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const referer = request.headers.get('referer') || 'unknown';

    // Require captcha token
    if (!token) {
      console.warn('[CAPTCHA] Missing token', {
        timestamp: new Date().toISOString(),
        formType: 'call',
        ip,
        userAgent,
        referer,
        email,
        phone,
        name,
        isBot: botDetection.isBot,
        botReason: botDetection.reason,
        status: 'FAILED',
        reason: 'Token missing',
      });
      return NextResponse.json(
        { message: 'Security verification required. Please complete the captcha.' },
        { status: 400 }
      );
    }

    // Verify captcha token (supports both Turnstile and reCAPTCHA)
    const { verifyCaptchaToken } = await import('@/shared/lib/captcha-verification');
    const captchaVerification = await verifyCaptchaToken(token, ip);

    if (!captchaVerification.isValid) {
      console.warn('[CAPTCHA] Invalid token', {
        timestamp: new Date().toISOString(),
        formType: 'call',
        ip,
        userAgent,
        referer,
        email,
        phone,
        name,
        isBot: botDetection.isBot,
        botReason: botDetection.reason,
        status: 'FAILED',
        reason: 'Invalid token',
        captchaType: captchaVerification.type,
      });
      return NextResponse.json(
        { message: 'Security verification failed. Please try again.' },
        { status: 400 }
      );
    }

    // Log successful verification
    console.log('[CAPTCHA] Verification successful', {
      timestamp: new Date().toISOString(),
      formType: 'call',
      ip,
      userAgent,
      referer,
      email,
      phone,
      name,
      isBot: botDetection.isBot,
      botReason: botDetection.reason,
      status: 'SUCCESS',
      captchaType: captchaVerification.type,
    });

    // Initialize SendGrid with API key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

    // Create email content
    const msg = {
      to: process.env.ADMIN_EMAIL!, // Your admin email address
      from: process.env.FROM_EMAIL!, // Verified sender email
      subject: 'New Call Request',
      html: `
        <h2>New Call Request</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Correo Electrónico:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Industry:</strong> ${industry}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Scenario:</strong> ${scenario}</p>
        <p><strong>Agent:</strong> ${agent}</p>
      `,
    };

    // Send email
    await sgMail.send(msg);

    /*const clientMSG = {
      to: email, // Your admin email address
      from: process.env.FROM_EMAIL!, // Verified sender email
      subject: 'Tanzora Request Received',
      html: `
      `,
    };

    await sgMail.send(clientMSG);*/

    // Generate submission code for secondary routes (retell-call, hubspot-lead)
    const submissionCode = await generateSubmissionCode(email, phone);
    console.log('[REQUEST-CALL] Generated submissionCode for response:', {
      code: submissionCode.substring(0, 50) + '...',
      codeLength: submissionCode.length,
      email,
      phone,
    });

    return NextResponse.json({
      message: 'Call request sent successfully.',
      submissionCode, // Return submission code for secondary routes
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('[ERROR] Failed to process call request:', errorMessage);
    return NextResponse.json(
      { message: 'Failed to send call request. Please try again later.' },
      { status: 500 }
    );
  }
}
