/**
 * Google reCAPTCHA v2 token verification helper
 * Verifies reCAPTCHA tokens to prevent direct API calls from console
 */

/**
 * Verify reCAPTCHA token with Google
 * @param token - reCAPTCHA token to verify
 * @param remoteIp - Optional IP address of the user
 * @returns Promise<boolean> - true if token is valid, false otherwise
 */
export async function verifyRecaptchaToken(
  token: string | undefined | null,
  remoteIp?: string
): Promise<boolean> {
  if (!token || typeof token !== 'string') {
    return false;
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    console.warn('[RECAPTCHA] Secret key not configured, rejecting request');
    return false;
  }

  try {
    const params = new URLSearchParams({
      secret: secretKey,
      response: token,
    });

    if (remoteIp) {
      params.append('remoteip', remoteIp);
    }

    const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success) {
      console.warn('[RECAPTCHA] Invalid token', {
        errors: recaptchaData['error-codes'],
      });
      return false;
    }

    return true;
  } catch (error) {
    console.error('[RECAPTCHA] Error verifying token:', error);
    return false;
  }
}
