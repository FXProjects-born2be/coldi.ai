import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { checkBotId } from 'botid/server';

import { cleanupExpiredCsrfTokens, validateAndConsumeCsrfToken } from '@/shared/lib/csrf-tokens';
import { getSmsSendCodeWebhookUrl } from '@/shared/lib/system-status';
import { getSystemStatusWithCache } from '@/shared/lib/system-status-cache';

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
  console.log('[BOTID] SMS Send Code verification', {
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
    console.warn('[BOTID] Blocked SMS send-code request', {
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
    const body = await request.json();
    const { phone, csrfToken } = body;

    // Require CSRF token to prevent direct API calls from console
    // CSRF token must be obtained from the page and can only be used once
    // Check CSRF token FIRST before any other operations (including system status check)
    const isValidCsrfToken = await validateAndConsumeCsrfToken(csrfToken);
    if (!isValidCsrfToken) {
      return NextResponse.json(
        { message: 'Security verification required. Please refresh the page and try again.' },
        { status: 403 }
      );
    }

    // Only check system status if CSRF token is valid
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
    // Require Turnstile token to prevent direct API calls from console
    /*const isValidToken = await verifyTurnstileToken(turnstileToken);
    if (!isValidToken) {
      return NextResponse.json(
        { message: 'Security verification required. Please complete the captcha.' },
        { status: 400 }
      );
    }*/

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

    // Cleanup expired CSRF tokens (fire and forget)
    cleanupExpiredCsrfTokens().catch((error) => {
      console.error('[CSRF-TOKEN] Error during cleanup:', error);
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
