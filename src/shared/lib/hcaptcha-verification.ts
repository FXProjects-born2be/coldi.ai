/**
 * Server-side verification for hCaptcha
 */

const HCAPTCHA_SECRET_KEY = process.env.HCAPTCHA_SECRET_KEY || '';

/**
 * Verify hCaptcha token on server side
 * @param token - hCaptcha response token
 * @param remoteIp - Optional IP address of the user
 * @returns Promise<boolean> - true if token is valid
 */
export async function verifyHcaptchaToken(
  token: string | undefined | null,
  remoteIp?: string
): Promise<boolean> {
  if (!token) {
    console.warn('[HCAPTCHA] No token provided', {
      timestamp: new Date().toISOString(),
      remoteIp,
      status: 'FAILED',
      reason: 'Token missing',
    });
    return false;
  }

  if (!HCAPTCHA_SECRET_KEY) {
    console.warn('[HCAPTCHA] Secret key not configured', {
      timestamp: new Date().toISOString(),
      remoteIp,
      status: 'FAILED',
      reason: 'Secret key not configured',
    });
    return false;
  }

  try {
    const verifyUrl = 'https://hcaptcha.com/siteverify';
    const body = new URLSearchParams({
      secret: HCAPTCHA_SECRET_KEY,
      response: token,
      ...(remoteIp && { remoteip: remoteIp }),
    });

    const response = await fetch(verifyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    });

    if (!response.ok) {
      console.error('[HCAPTCHA] HTTP error during verification', {
        timestamp: new Date().toISOString(),
        remoteIp,
        status: 'FAILED',
        reason: 'HTTP error',
        statusCode: response.status,
        statusText: response.statusText,
      });
      return false;
    }

    const data = await response.json();

    if (!data.success) {
      console.warn('[HCAPTCHA] Verification failed', {
        timestamp: new Date().toISOString(),
        remoteIp,
        status: 'FAILED',
        reason: 'Verification failed',
        errorCodes: data['error-codes'] || [],
        errorMessages:
          data['error-codes']?.map((code: string) => {
            // Map error codes to human-readable messages
            const errorMessages: Record<string, string> = {
              'missing-input-secret': 'Secret key is missing',
              'invalid-input-secret': 'Secret key is invalid or malformed',
              'missing-input-response': 'Response token is missing',
              'invalid-input-response': 'Response token is invalid or malformed',
              'bad-request': 'Request is invalid or malformed',
              'invalid-or-already-seen-response':
                'Response token has already been used or is invalid',
              'not-using-dummy-passcode': 'Not using dummy passcode (for testing)',
              'sitekey-secret-mismatch': 'Site key and secret key do not match',
            };
            return errorMessages[code] || code;
          }) || [],
        fullResponse: data,
      });
      return false;
    }

    console.log('[HCAPTCHA] Verification successful', {
      timestamp: new Date().toISOString(),
      remoteIp,
      status: 'SUCCESS',
      challengeTs: data.challenge_ts,
      hostname: data.hostname,
      credit: data.credit || false, // Whether this verification will be counted toward billing
    });

    return true;
  } catch (error) {
    console.error('[HCAPTCHA] Verification error', {
      timestamp: new Date().toISOString(),
      remoteIp,
      status: 'ERROR',
      reason: 'Network or parsing error',
      error: error instanceof Error ? error.message : 'Unknown error',
      errorStack: error instanceof Error ? error.stack : undefined,
    });
    return false;
  }
}
