import { NextResponse } from 'next/server';

const WEBHOOK_URL =
  process.env.TWILIO_SEND_CODE_ENDPOINT ||
  'https://aitassistance.app.n8n.cloud/webhook/sms-for-site-new';

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
export async function POST(request: Request): Promise<NextResponse> {
  if (!WEBHOOK_URL) {
    return NextResponse.json(
      { message: 'SMS verification service is not configured' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { phone } = body;

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
    const response = await fetch(WEBHOOK_URL, {
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
    return NextResponse.json({
      message: 'SMS sent to the specified number',
      success: true,
    });
  } catch (error) {
    console.error('[SMS Send Code] Error:', error);
    return NextResponse.json(
      { message: 'Failed to process request. Please try again later.' },
      { status: 500 }
    );
  }
}
