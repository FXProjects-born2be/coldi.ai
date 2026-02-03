import { NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID_TRASH = process.env.TELEGRAM_CHAT_ID_TRASH;

/**
 * Trash form endpoint - receives form submissions with invalid names
 * and sends them to Telegram trash chat without user knowing
 */
export async function POST(request: Request) {
  // Extract request metadata for logging
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    request.headers.get('cf-connecting-ip') ||
    'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  const referer = request.headers.get('referer') || 'unknown';

  // Log incoming request
  console.log('[TRASH-FORM] Incoming request', {
    timestamp: new Date().toISOString(),
    ip,
    userAgent,
    referer,
    method: 'POST',
    path: '/api/trash-form',
  });

  try {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID_TRASH) {
      console.error('[TRASH-FORM] Configuration error', {
        timestamp: new Date().toISOString(),
        ip,
        userAgent,
        referer,
        error: 'Required environment variables are not configured',
        hasTelegramBotToken: !!TELEGRAM_BOT_TOKEN,
        hasTelegramChatIdTrash: !!TELEGRAM_CHAT_ID_TRASH,
      });
      // Return success to user even if config is missing
      return NextResponse.json({ status: 'success' }, { status: 200 });
    }

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error('[TRASH-FORM] JSON parse error', {
        timestamp: new Date().toISOString(),
        ip,
        userAgent,
        referer,
        error: parseError instanceof Error ? parseError.message : 'Failed to parse JSON',
      });
      // Return success to user even if parsing fails
      return NextResponse.json({ status: 'success' }, { status: 200 });
    }

    // Extract form data
    const name = (body.name as string) || 'N/A';
    const email = (body.email as string) || 'N/A';
    const phone = (body.phone as string) || 'N/A';
    const formType = (body.formType as string) || 'unknown';

    // Build Telegram message
    const telegramMessage = `Form Submission (Invalid Name)\n\nForm Type: ${formType}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nFull Data:\n${JSON.stringify(body, null, 2)}`;

    // Send to Telegram
    const messageRes = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID_TRASH,
          text: telegramMessage,
        }),
      }
    );

    if (!messageRes.ok) {
      const messageError = await messageRes.text();
      console.error('[TRASH-FORM] Telegram message failed', {
        timestamp: new Date().toISOString(),
        ip,
        userAgent,
        referer,
        email,
        name,
        phone,
        error: messageError,
      });
      // Still return success to user
      return NextResponse.json({ status: 'success' }, { status: 200 });
    }

    console.log('[TRASH-FORM] Successfully sent trash notification', {
      timestamp: new Date().toISOString(),
      ip,
      userAgent,
      referer,
      email,
      name,
      phone,
      formType,
    });

    // Always return success to user (they shouldn't know it's trash)
    return NextResponse.json({ status: 'success' }, { status: 200 });
  } catch (error) {
    console.error('[TRASH-FORM] Unexpected error', {
      timestamp: new Date().toISOString(),
      ip,
      userAgent,
      referer,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    // Always return success to user even on error
    return NextResponse.json({ status: 'success' }, { status: 200 });
  }
}
