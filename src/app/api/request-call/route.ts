import { NextResponse } from 'next/server';

import sgMail from '@sendgrid/mail';
import { checkBotId } from 'botid/server';

import type { Agent } from '@/features/request-call/store/store';

import { detectBot } from '@/shared/lib/anti-bot';

type RequestCallData = {
  name: string;
  email: string;
  phone: string;
  industry: string;
  company: string;
  scenario: string;
  agent: Agent;
  website_url?: string; // Honeypot field
  recaptchaToken?: string;
};

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const bodyJSON = (await request.json()) as RequestCallData;
    const { name, email, phone, industry, company, scenario, agent, recaptchaToken } = bodyJSON;

    // BotID check (most reliable bot detection)
    try {
      const verification = await checkBotId();

      // Log full verification result for debugging
      console.log('[BOTID DEBUG] Full verification result:', JSON.stringify(verification, null, 2));
      console.log('[BOTID DEBUG] Verification keys:', Object.keys(verification));
      console.log('[BOTID DEBUG] isBot:', verification.isBot);
      console.log('[BOTID DEBUG] isVerifiedBot:', verification.isVerifiedBot);
      if ('verifiedBotName' in verification) {
        console.log('[BOTID DEBUG] verifiedBotName:', verification.verifiedBotName);
      }

      if (verification.isBot) {
        // Allow verified bots (e.g., chatgpt-operator)
        // Note: verifiedBotName may not be available in all BotID versions
        const isOperator = verification.isVerifiedBot;

        if (!isOperator) {
          console.warn('[BOT DETECTED] BotID detected bot', {
            isBot: verification.isBot,
            isVerifiedBot: verification.isVerifiedBot,
            fullVerification: verification,
          });
          return NextResponse.json({ message: 'Access denied. Bot detected.' }, { status: 403 });
        }
      } else {
        console.log('[BOTID DEBUG] User is NOT a bot, allowing request');
      }
    } catch (botIdError) {
      console.error('Error checking BotID:', botIdError);
      // Don't block on BotID errors, but log them
    }

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

    // Verify reCAPTCHA token if provided
    if (recaptchaToken) {
      try {
        // Check if using test key - if so, skip verification or use test secret
        const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';
        const isTestKey = siteKey === '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';
        const secretKey = isTestKey
          ? '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe' // Test secret key
          : process.env.RECAPTCHA_SECRET_KEY;

        // For test key, always pass verification
        if (isTestKey) {
          console.log('[TEST MODE] Using test reCAPTCHA key - skipping verification');
        } else {
          const recaptchaResponse = await fetch(
            `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`,
            { method: 'POST' }
          );
          const recaptchaData = await recaptchaResponse.json();
          if (!recaptchaData.success) {
            console.warn('[BOT DETECTED] Invalid reCAPTCHA token', {
              ip: botDetection.reason,
              errors: recaptchaData['error-codes'],
            });
            return NextResponse.json(
              { message: 'reCAPTCHA verification failed. Please try again.' },
              { status: 400 }
            );
          }
        }
      } catch (recaptchaError) {
        console.error('Error verifying reCAPTCHA:', recaptchaError);
        // Don't block on reCAPTCHA verification errors, but log them
      }
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

    return NextResponse.json({ message: 'Call request sent successfully.' });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('[ERROR] Failed to process call request:', errorMessage);
    return NextResponse.json(
      { message: 'Failed to send call request. Please try again later.' },
      { status: 500 }
    );
  }
}
