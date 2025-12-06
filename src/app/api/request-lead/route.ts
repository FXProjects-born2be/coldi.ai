import { NextResponse } from 'next/server';

import sgMail from '@sendgrid/mail';

import { detectBot } from '@/shared/lib/anti-bot';

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
  recaptchaToken?: string;
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
      recaptchaToken,
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
