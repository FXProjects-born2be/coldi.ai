/**
 * Email validation using webhook
 * Checks if email is valid and not high-risk
 */

const EMAIL_CHECK_WEBHOOK_URL = 'https://aitassistance.app.n8n.cloud/webhook/coldi/email-check';

export type EmailValidationResult = {
  isValid: boolean;
  reason?: string;
  message?: string;
};

/**
 * Validate email using webhook
 * @param email - Email address to validate
 * @returns Promise<EmailValidationResult>
 */
export async function validateEmail(email: string): Promise<EmailValidationResult> {
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return {
      isValid: false,
      reason: 'invalid_format',
      message: 'Please enter a valid email address',
    };
  }

  try {
    const response = await fetch(EMAIL_CHECK_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      console.error('[Email Validation] Webhook error:', response.status);
      // On webhook error, allow email (fail open)
      return { isValid: true };
    }

    const data = await response.json();

    if (data.ok === true) {
      return { isValid: true };
    }

    // Email is not valid
    return {
      isValid: false,
      reason: data.reason || 'invalid',
      message: data.message || 'Email is not valid. Please use another email address.',
    };
  } catch (error) {
    console.error('[Email Validation] Error:', error);
    // On network error, allow email (fail open)
    return { isValid: true };
  }
}
