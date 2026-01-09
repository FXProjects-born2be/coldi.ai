/**
 * Turnstile token verification helper
 * Verifies Cloudflare Turnstile tokens to prevent direct API calls from console
 */

/**
 * Verify Turnstile token with Cloudflare
 * @param token - Turnstile token to verify
 * @returns Promise<boolean> - true if token is valid, false otherwise
 */
export async function verifyTurnstileToken(token: string | undefined | null): Promise<boolean> {
  if (!token || typeof token !== 'string') {
    return false;
  }

  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    console.warn('[TURNSTILE] Secret key not configured, rejecting request');
    return false;
  }

  try {
    const turnstileResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secret: secretKey,
          response: token,
        }),
      }
    );

    const turnstileData = await turnstileResponse.json();

    if (!turnstileData.success) {
      console.warn('[TURNSTILE] Invalid token', {
        errors: turnstileData['error-codes'],
      });
      return false;
    }

    return true;
  } catch (error) {
    console.error('[TURNSTILE] Error verifying token:', error);
    return false;
  }
}
