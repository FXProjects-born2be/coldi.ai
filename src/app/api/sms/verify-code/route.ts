import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { getSmsVerifyCodeWebhookUrl } from '@/shared/lib/system-status';
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
 * POST /api/sms/verify-code
 * Body: { phone: string, code: string }
 * Returns: { verified: boolean, message?: string }
 * Sends request to webhook with { "to": phone, "code": code }
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  // Get system status from cache or fetch fresh (with cookie caching)
  // This ensures correct webhook URL is used based on current status
  const { response: cachedResponse } = await getSystemStatusWithCache(request);
  // Status is now cached in cookie for 5 minutes

  const webhookUrl = getSmsVerifyCodeWebhookUrl();

  if (!webhookUrl) {
    return NextResponse.json(
      { verified: false, message: 'SMS verification service is not configured' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { phone, code, turnstileToken } = body;

    // Require Turnstile token to prevent direct API calls from console
    const isValidToken = await verifyTurnstileToken(turnstileToken);
    if (!isValidToken) {
      return NextResponse.json(
        {
          verified: false,
          message: 'Security verification required. Please complete the captcha.',
        },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== 'string') {
      return NextResponse.json(
        { verified: false, message: 'Phone number is required' },
        { status: 400 }
      );
    }

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { verified: false, message: 'Verification code is required' },
        { status: 400 }
      );
    }

    const normalizedPhone = normalizePhone(phone);

    // Send to webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: normalizedPhone, code: code.trim() }),
    });

    const data = await response.json();

    // Check if response is an array
    const responseArray = Array.isArray(data) ? data : [data];
    const result = responseArray[0];

    // If status is "approved" and valid is true, verification is successful
    if (result?.status === 'approved' && result?.valid === true) {
      const successResponse = NextResponse.json({
        verified: true,
        message: 'Code verified successfully',
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
    }

    // If result contains "Error", verification failed
    if (result?.result === 'Error') {
      const errorResponse = NextResponse.json({
        verified: false,
        message: 'Invalid verification code. Please try again.',
      });

      // Copy status cookie to response
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

    // Default to failed verification
    const defaultResponse = NextResponse.json({
      verified: false,
      message: 'Invalid verification code. Please try again.',
    });

    // Copy status cookie to response
    cachedResponse.cookies.getAll().forEach((cookie) => {
      defaultResponse.cookies.set(cookie.name, cookie.value, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: Math.floor((5 * 60 * 1000) / 1000),
        path: '/',
      });
    });

    return defaultResponse;
  } catch (error) {
    console.error('[SMS Verify Code] Error:', error);
    return NextResponse.json(
      { verified: false, message: 'Failed to process request. Please try again later.' },
      { status: 500 }
    );
  }
}
