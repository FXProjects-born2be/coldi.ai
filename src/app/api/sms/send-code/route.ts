import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { validateAndConsumeCsrfToken } from '@/shared/lib/csrf-tokens';
import { getSmsSendCodeWebhookUrl } from '@/shared/lib/system-status';
import { getSystemStatusWithCache } from '@/shared/lib/system-status-cache';
import { verifyTurnstileToken } from '@/shared/lib/turnstile-verification';

/**
 * Normalize phone number to E.164 format
 */
function normalizePhone(phone: string): string {
  let normalized = phone.replace(/[^\d+]/g, '');
  if (!normalized.startsWith('+')) {
    normalized = `+${normalized}`;
  }
  return normalized;
}

/**
 * POST /api/sms/send-code
 * Body: { phone: string }
 * Sends request to webhook with { "to": phone }
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  // Get system status from cache or fetch fresh (with cookie caching)
  // This ensures correct webhook URL is used based on current status
  const { response: cachedResponse } = await getSystemStatusWithCache(request);
  // Status is now cached in cookie for 5 minutes

  const webhookUrl = getSmsSendCodeWebhookUrl();

  if (!webhookUrl) {
    return NextResponse.json(
      { message: 'SMS verification service is not configured' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { phone, turnstileToken, csrfToken } = body;

    // Require CSRF token to prevent direct API calls from console
    // CSRF token must be obtained from the page and can only be used once
    if (!validateAndConsumeCsrfToken(csrfToken)) {
      return NextResponse.json(
        { message: 'Security verification required. Please refresh the page and try again.' },
        { status: 403 }
      );
    }

    // Require Turnstile token to prevent direct API calls from console
    const isValidToken = await verifyTurnstileToken(turnstileToken);
    if (!isValidToken) {
      return NextResponse.json(
        { message: 'Security verification required. Please complete the captcha.' },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== 'string') {
      return NextResponse.json({ message: 'Phone number is required' }, { status: 400 });
    }

    const normalizedPhone = normalizePhone(phone);

    console.log('normalizedPhone', normalizedPhone);

    const sendCodeBody = {
      to: normalizedPhone,
    };

    console.log('sendCodeBody', sendCodeBody);

    // Send to webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sendCodeBody),
    });

    const data = await response.json();

    console.log('data', data);

    // Check if response is an array with error
    const responseArray = Array.isArray(data) ? data : [data];
    const result = responseArray[0]?.result || '';

    // If we got 400 error, it's an invalid number
    if (result.includes('Error 400') || result.includes('400')) {
      return NextResponse.json(
        { message: 'Invalid phone number. Please check your phone number and try again.' },
        { status: 400 }
      );
    }

    // For all other cases, always return success message
    // (Twilio doesn't validate properly, so we don't tell client about actual status)
    const successResponse = NextResponse.json({
      message: 'SMS sent to the specified number',
      success: true,
    });

    // Copy status cookie to response
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
  } catch (error) {
    console.error('[SMS Send Code] Error:', error);
    return NextResponse.json(
      { message: 'Failed to process request. Please try again later.' },
      { status: 500 }
    );
  }
}
