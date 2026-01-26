import { NextResponse } from 'next/server';

import sgMail from '@sendgrid/mail';

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
  turnstileToken?: string;
};

export async function POST(request: Request): Promise<NextResponse> {
  try {
    // Check if forms are enabled
    const formsEnabled = await areFormsEnabled();
    if (!formsEnabled) {
      return NextResponse.json(
        { message: 'Form submissions are currently disabled. Please try again later.' },
        { status: 503 }
      );
    }

    const bodyJSON = (await request.json()) as RequestCallData;
    const { name, email, phone, industry, company, scenario, agent, turnstileToken } = bodyJSON;

    // Comprehensive bot detection
    const botDetection = detectBot(request, bodyJSON, 'call');

    // Block if honeypot is filled or rate limit exceeded
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

    // Require Cloudflare Turnstile token
    if (!turnstileToken) {
      console.warn('[TURNSTILE] Missing token', {
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

    try {
      const secretKey = process.env.TURNSTILE_SECRET_KEY;
      if (!secretKey) {
        console.warn('[TURNSTILE] Secret key not configured', {
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
          reason: 'Secret key not configured',
        });
        return NextResponse.json(
          { message: 'Security verification failed. Please try again.' },
          { status: 400 }
        );
      }

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
        console.warn('[TURNSTILE] Verification failed', {
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
          reason: 'Turnstile verification failed',
          errorCodes: turnstileData['error-codes'],
          turnstileResponse: turnstileData,
        });
        return NextResponse.json(
          { message: 'Security verification failed. Please try again.' },
          { status: 400 }
        );
      }

      // Log successful verification
      console.log('[TURNSTILE] Verification successful', {
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
        challengeTs: turnstileData['challenge_ts'],
        hostname: turnstileData.hostname,
      });
    } catch (turnstileError) {
      console.error('[TURNSTILE] Verification error', {
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
        status: 'ERROR',
        error: turnstileError instanceof Error ? turnstileError.message : 'Unknown error',
      });
      return NextResponse.json(
        { message: 'Security verification failed. Please try again.' },
        { status: 400 }
      );
    }

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
