import { NextResponse } from 'next/server';

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Configuration
const SMS_CODE_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes
const SMS_RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_ATTEMPTS_PER_SMS = 3; // 3 attempts per SMS code
const MAX_CALLS_PER_HOUR = 3; // Max 3 calls per hour per phone

/**
 * Generate a random 6-digit code
 */
function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Normalize phone number
 */
function normalizePhone(phone: string): string {
  return phone.replace(/[^\d+]/g, '');
}

/**
 * Check if phone can request a new SMS (rate limiting)
 */
async function canRequestSms(phone: string): Promise<{ allowed: boolean; reason?: string }> {
  const normalizedPhone = normalizePhone(phone);
  const now = new Date().toISOString();

  // Get rate limit data from database
  const { data: rateLimitData, error } = await supabase
    .from('sms_rate_limits')
    .select('*')
    .eq('phone', normalizedPhone)
    .single();

  if (error && error.code !== 'PGRST116') {
    // PGRST116 = no rows returned, which is fine
    console.error('[SMS] Error checking rate limit:', error);
    return { allowed: true }; // Allow on error to not block users
  }

  if (!rateLimitData) {
    return { allowed: true };
  }

  const lastSmsSent = new Date(rateLimitData.last_sms_sent).getTime();
  const timeSinceLastSms = Date.now() - lastSmsSent;

  // If more than 1 hour has passed, reset
  if (timeSinceLastSms >= SMS_RATE_LIMIT_WINDOW_MS) {
    // Reset attempts
    await supabase
      .from('sms_rate_limits')
      .update({ attempts_used: 0, last_sms_sent: now })
      .eq('phone', normalizedPhone);
    return { allowed: true };
  }

  // If all 3 attempts are used, need to wait
  if (rateLimitData.attempts_used >= MAX_CALLS_PER_HOUR) {
    const remainingTime = Math.ceil((SMS_RATE_LIMIT_WINDOW_MS - timeSinceLastSms) / 1000 / 60);
    return {
      allowed: false,
      reason: `Maximum attempts reached. Please wait ${remainingTime} minutes before requesting a new code.`,
    };
  }

  return { allowed: true };
}

/**
 * API route to request/verify SMS code
 * POST /api/sms/verify-code
 * Body: { phone: string, code?: string }
 */
export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { phone, code } = body;

    if (!phone || typeof phone !== 'string') {
      return NextResponse.json({ message: 'Phone number is required' }, { status: 400 });
    }

    const normalizedPhone = normalizePhone(phone);

    // If code is provided, verify it
    if (code) {
      if (!code || typeof code !== 'string') {
        return NextResponse.json({ message: 'Verification code is required' }, { status: 400 });
      }

      // Get stored code from database
      const { data: storedData, error: fetchError } = await supabase
        .from('sms_verification_codes')
        .select('*')
        .eq('phone', normalizedPhone)
        .eq('verified', false)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (fetchError || !storedData) {
        return NextResponse.json(
          { message: 'No verification code found. Please request a new code.' },
          { status: 400 }
        );
      }

      // Check if code expired
      const expiresAt = new Date(storedData.expires_at).getTime();
      if (Date.now() > expiresAt) {
        // Mark as expired
        await supabase
          .from('sms_verification_codes')
          .update({ verified: true })
          .eq('id', storedData.id);
        return NextResponse.json(
          { message: 'Verification code has expired. Please request a new code.' },
          { status: 400 }
        );
      }

      // Check attempts
      if (storedData.attempts >= MAX_ATTEMPTS_PER_SMS) {
        // Mark as used
        await supabase
          .from('sms_verification_codes')
          .update({ verified: true })
          .eq('id', storedData.id);
        return NextResponse.json(
          { message: 'Maximum verification attempts exceeded. Please request a new code.' },
          { status: 400 }
        );
      }

      // Verify code
      const isValid = storedData.code === code.trim();

      if (!isValid) {
        // Increment attempts
        await supabase
          .from('sms_verification_codes')
          .update({ attempts: storedData.attempts + 1 })
          .eq('id', storedData.id);
        return NextResponse.json(
          {
            message: 'Invalid verification code.',
            attemptsRemaining: MAX_ATTEMPTS_PER_SMS - (storedData.attempts + 1),
          },
          { status: 400 }
        );
      }

      // Code is valid - mark as verified and update rate limit
      const now = new Date().toISOString();
      await supabase
        .from('sms_verification_codes')
        .update({ verified: true })
        .eq('id', storedData.id);

      // Update or create rate limit
      const { data: rateLimitData } = await supabase
        .from('sms_rate_limits')
        .select('*')
        .eq('phone', normalizedPhone)
        .single();

      if (rateLimitData) {
        // Reset attempts if hour has passed
        const lastSmsSent = new Date(rateLimitData.last_sms_sent).getTime();
        const attemptsUsed =
          Date.now() - lastSmsSent >= SMS_RATE_LIMIT_WINDOW_MS
            ? 1
            : rateLimitData.attempts_used + 1;

        await supabase
          .from('sms_rate_limits')
          .update({
            last_sms_sent: now,
            attempts_used: attemptsUsed,
            updated_at: now,
          })
          .eq('phone', normalizedPhone);
      } else {
        await supabase.from('sms_rate_limits').insert({
          phone: normalizedPhone,
          last_sms_sent: now,
          attempts_used: 1,
        });
      }

      console.log('[SMS] Code verified successfully:', { phone: normalizedPhone });

      return NextResponse.json({
        message: 'Code verified successfully',
        verified: true,
        attemptsRemaining: MAX_CALLS_PER_HOUR - (rateLimitData?.attempts_used || 0) - 1,
      });
    }

    // If no code, send SMS
    const canRequest = await canRequestSms(normalizedPhone);

    if (!canRequest.allowed) {
      return NextResponse.json(
        { message: canRequest.reason || 'Rate limit exceeded' },
        { status: 429 }
      );
    }

    // Generate new code
    const verificationCode = generateCode();
    const expiresAt = new Date(Date.now() + SMS_CODE_EXPIRY_MS).toISOString();
    const now = new Date().toISOString();

    // Store code in database
    const { error: insertError } = await supabase.from('sms_verification_codes').insert({
      phone: normalizedPhone,
      code: verificationCode,
      expires_at: expiresAt,
      attempts: 0,
      verified: false,
    });

    if (insertError) {
      console.error('[SMS] Error storing code:', insertError);
      return NextResponse.json(
        { message: 'Failed to store verification code. Please try again later.' },
        { status: 500 }
      );
    }

    // Send SMS via webhook
    const smsWebhookUrl = 'https://aitassistance.app.n8n.cloud/webhook/sms-for-site';

    try {
      const smsResponse = await fetch(smsWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: normalizedPhone, code: verificationCode }),
      });

      if (!smsResponse.ok) {
        const errorText = await smsResponse.text();
        console.error('[SMS] Failed to send SMS:', {
          status: smsResponse.status,
          statusText: smsResponse.statusText,
          error: errorText,
        });
        // Delete stored code if SMS failed
        await supabase
          .from('sms_verification_codes')
          .delete()
          .eq('phone', normalizedPhone)
          .eq('code', verificationCode);
        return NextResponse.json(
          { message: 'Failed to send SMS code. Please try again later.' },
          { status: 500 }
        );
      }

      const smsData = await smsResponse.json().catch(() => ({}));
      console.log('[SMS] SMS code sent successfully:', {
        phone: normalizedPhone,
        code: verificationCode,
        response: smsData,
      });

      // Update or create rate limit
      const { data: rateLimitData } = await supabase
        .from('sms_rate_limits')
        .select('*')
        .eq('phone', normalizedPhone)
        .single();

      if (rateLimitData) {
        // Reset attempts if hour has passed
        const lastSmsSent = new Date(rateLimitData.last_sms_sent).getTime();
        const attemptsUsed =
          Date.now() - lastSmsSent >= SMS_RATE_LIMIT_WINDOW_MS ? 0 : rateLimitData.attempts_used;

        await supabase
          .from('sms_rate_limits')
          .update({
            last_sms_sent: now,
            attempts_used: attemptsUsed,
            updated_at: now,
          })
          .eq('phone', normalizedPhone);
      } else {
        await supabase.from('sms_rate_limits').insert({
          phone: normalizedPhone,
          last_sms_sent: now,
          attempts_used: 0,
        });
      }

      return NextResponse.json({
        message: 'SMS code sent successfully',
        success: true,
        expiresIn: Math.floor(SMS_CODE_EXPIRY_MS / 1000 / 60), // minutes
      });
    } catch (smsError) {
      console.error('[SMS] Error sending SMS:', smsError);
      // Delete stored code if SMS failed
      await supabase
        .from('sms_verification_codes')
        .delete()
        .eq('phone', normalizedPhone)
        .eq('code', verificationCode);
      return NextResponse.json(
        { message: 'Failed to send SMS code. Please try again later.' },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('[SMS] Error processing request:', errorMessage);
    return NextResponse.json(
      { message: 'Failed to process request. Please try again later.' },
      { status: 500 }
    );
  }
}
