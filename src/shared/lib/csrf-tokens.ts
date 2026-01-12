/**
 * CSRF token management for securing API routes
 * Tokens are generated on server and must be included in requests
 * Tokens are stored in Supabase database for cross-worker compatibility
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Token TTL: 10 minutes
const TOKEN_TTL_MS = 10 * 60 * 1000;

/**
 * Generate a new CSRF token and store it in database
 * @returns CSRF token string
 */
export async function generateCsrfToken(): Promise<string> {
  // Generate a random token
  const token = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}-${Math.random().toString(36).substring(2, 15)}`;

  const expiresAt = new Date(Date.now() + TOKEN_TTL_MS).toISOString();

  try {
    const { error } = await supabase.from('csrf_tokens').insert({
      token,
      expires_at: expiresAt,
      used: false,
    });

    if (error) {
      console.error('[CSRF-TOKEN] Error generating token:', error);
      throw error;
    }

    console.log('[CSRF-TOKEN] Generated new token:', {
      token: token.substring(0, 50) + '...',
      expiresAt,
    });

    return token;
  } catch (error) {
    console.error('[CSRF-TOKEN] Failed to generate token:', error);
    throw error;
  }
}

/**
 * Validate and consume a CSRF token from database
 * Token can only be used once
 * @param token - CSRF token to validate
 * @returns true if token is valid and was successfully consumed, false otherwise
 */
export async function validateAndConsumeCsrfToken(
  token: string | undefined | null
): Promise<boolean> {
  if (!token || typeof token !== 'string') {
    return false;
  }

  try {
    // Find token in database
    const { data, error } = await supabase
      .from('csrf_tokens')
      .select('*')
      .eq('token', token)
      .single();

    if (error || !data) {
      console.warn('[CSRF-TOKEN] Token not found:', {
        error: error?.message,
        hasData: !!data,
      });
      return false;
    }

    // Check if token is expired
    const expiresAt = new Date(data.expires_at).getTime();
    if (expiresAt < Date.now()) {
      console.warn('[CSRF-TOKEN] Token expired', {
        expiresAt,
        now: Date.now(),
      });
      // Delete expired token
      await supabase.from('csrf_tokens').delete().eq('token', token);
      return false;
    }

    // Check if token is already used
    if (data.used) {
      console.warn('[CSRF-TOKEN] Token already used');
      return false;
    }

    // Mark token as used and delete it (one-time use)
    const { error: deleteError } = await supabase.from('csrf_tokens').delete().eq('token', token);

    if (deleteError) {
      console.error('[CSRF-TOKEN] Error deleting token:', deleteError);
      return false;
    }

    console.log('[CSRF-TOKEN] Token validated and consumed');
    return true;
  } catch (error) {
    console.error('[CSRF-TOKEN] Error validating token:', error);
    return false;
  }
}

/**
 * Clean up expired tokens from database
 */
export async function cleanupExpiredCsrfTokens(): Promise<void> {
  try {
    const now = new Date().toISOString();
    // Delete expired or used tokens
    const { error } = await supabase
      .from('csrf_tokens')
      .delete()
      .or(`expires_at.lt.${now},used.eq.true`);

    if (error) {
      console.error('[CSRF-TOKEN] Error cleaning up tokens:', error);
    } else {
      console.log('[CSRF-TOKEN] Cleaned up expired tokens');
    }
  } catch (error) {
    console.error('[CSRF-TOKEN] Error cleaning up tokens:', error);
  }
}
