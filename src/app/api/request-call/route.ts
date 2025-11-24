import { NextResponse } from 'next/server';

import sgMail from '@sendgrid/mail';

import type { Agent } from '@/features/request-call/store/store';

type RequestCallData = {
  name: string;
  email: string;
  phone: string;
  industry: string;
  company: string;
  scenario: string;
  agent: Agent;
};

const ONE_HOUR_IN_MS = 60 * 60 * 1000;
const PHONE_LIMIT = 5;
const IP_LIMIT = 10;

// Simple in-memory stores scoped to the module instance
const phoneRequestLog = new Map<string, number[]>();
const ipRequestLog = new Map<string, number[]>();

const normalizePhone = (phone: string) => phone.replace(/[^\d+]/g, '');

const shouldBlock = (
  log: Map<string, number[]>,
  key: string,
  limit: number,
  now: number
): boolean => {
  if (!key) {
    return false;
  }

  const previous = log.get(key) ?? [];
  const recentRequests = previous.filter((timestamp) => now - timestamp < ONE_HOUR_IN_MS);

  if (recentRequests.length >= limit) {
    log.set(key, recentRequests);
    return true;
  }

  recentRequests.push(now);
  log.set(key, recentRequests);
  return false;
};

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const bodyJSON = (await request.json()) as RequestCallData;
    const { name, email, phone, industry, company, scenario, agent } = bodyJSON;

    const now = Date.now();
    const normalizedPhone = normalizePhone(phone);
    const forwardedFor = request.headers.get('x-forwarded-for');
    const clientIp =
      forwardedFor?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      // @ts-expect-error - Next Request may expose ip depending on runtime
      request.ip ||
      'unknown';

    if (shouldBlock(phoneRequestLog, normalizedPhone, PHONE_LIMIT, now)) {
      console.warn(`Phone rate limit exceeded for ${normalizedPhone}`);
      return NextResponse.json(
        { message: 'Too many requests for this phone number. Please try again later.' },
        { status: 429 }
      );
    }

    if (shouldBlock(ipRequestLog, clientIp, IP_LIMIT, now)) {
      console.warn(`IP rate limit exceeded for ${clientIp}`);
      return NextResponse.json(
        { message: 'Too many requests from this IP address. Please try again later.' },
        { status: 429 }
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

    return NextResponse.json({ message: 'Pricing request sent successfully.' });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error sending pricing request:', errorMessage);
    return NextResponse.json(
      { message: 'Failed to send fund access request.', error: errorMessage },
      { status: 500 }
    );
  }
}
