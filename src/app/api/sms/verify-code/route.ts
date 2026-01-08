import { NextResponse } from 'next/server';

import { getSmsVerifyCodeWebhookUrl } from '@/shared/lib/system-status';

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
export async function POST(request: Request): Promise<NextResponse> {
  const webhookUrl = getSmsVerifyCodeWebhookUrl();

  if (!webhookUrl) {
    return NextResponse.json(
      { verified: false, message: 'SMS verification service is not configured' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { phone, code } = body;

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
      return NextResponse.json({
        verified: true,
        message: 'Code verified successfully',
      });
    }

    // If result contains "Error", verification failed
    if (result?.result === 'Error') {
      return NextResponse.json({
        verified: false,
        message: 'Invalid verification code. Please try again.',
      });
    }

    // Default to failed verification
    return NextResponse.json({
      verified: false,
      message: 'Invalid verification code. Please try again.',
    });
  } catch (error) {
    console.error('[SMS Verify Code] Error:', error);
    return NextResponse.json(
      { verified: false, message: 'Failed to process request. Please try again later.' },
      { status: 500 }
    );
  }
}
