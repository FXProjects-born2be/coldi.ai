import { NextResponse } from 'next/server';

import sgMail from '@sendgrid/mail';

import { detectBot } from '@/shared/lib/anti-bot';
import { areFormsEnabled } from '@/shared/lib/forms-status';

type RequestLeadData = {
  fullName: string;
  email: string;
  phone: string;
  industry: string;
  company: string;
  monthlyLeadVolume: string;
  primaryGoal: string[];
  message: string;
  company_website?: string; // Honeypot field
  turnstileToken?: string;
};

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const bodyJSON = (await request.json()) as RequestLeadData;
    const {
      fullName,
      email,
      phone,
      industry,
      company,
      monthlyLeadVolume,
      primaryGoal,
      message,
      turnstileToken,
    } = bodyJSON;

    // Comprehensive bot detection
    const botDetection = detectBot(request, bodyJSON, 'lead');

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

    // Verify Cloudflare Turnstile token if provided
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
            console.warn('[BOT DETECTED] Invalid Turnstile token', {
              ip: botDetection.reason,
              errors: turnstileData['error-codes'],
            });
            return NextResponse.json(
              { message: 'Security verification failed. Please try again.' },
              { status: 400 }
            );
          }
        }
      } catch (turnstileError) {
        console.error('Error verifying Turnstile:', turnstileError);
        // Don't block on Turnstile verification errors, but log them
      }
    }

    // Check if forms are enabled (after all validations: bot detection, turnstile)
    const formsEnabled = await areFormsEnabled();
    if (!formsEnabled) {
      return NextResponse.json(
        { message: 'Form submissions are currently disabled. Please try again later.' },
        { status: 503 }
      );
    }

    // Initialize SendGrid with API key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

    // Create email content
    const msg = {
      to: process.env.ADMIN_EMAIL!, // Your admin email address
      from: process.env.FROM_EMAIL!, // Verified sender email
      subject: 'New Lead Request',
      html: `
        <h2>New Lead Request</h2>
        <p><strong>Nombre:</strong> ${fullName}</p>
        <p><strong>Correo Electrónico:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Industry:</strong> ${industry}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Monthly Lead Volume:</strong> ${monthlyLeadVolume}</p>
        <p><strong>Primary Goal:</strong> ${primaryGoal}</p>
        <p><strong>Message:</strong> ${message}</p>
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

    return NextResponse.json({ message: 'Lead request sent successfully.' });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('[ERROR] Failed to process lead request:', errorMessage);
    return NextResponse.json(
      { message: 'Failed to send lead request. Please try again later.' },
      { status: 500 }
    );
  }
}
