/**
 * Unified captcha verification helper
 * Supports both Turnstile and reCAPTCHA based on feature flags
 */

import { RECAPTCHA_ENABLED, TURNSTILE_ENABLED } from './captcha-config';
import { verifyRecaptchaToken } from './recaptcha-verification';
import { verifyTurnstileToken } from './turnstile-verification';

export type CaptchaVerificationResult = {
  isValid: boolean;
  type: 'turnstile' | 'recaptcha' | 'none';
};

/**
 * Verify captcha token (supports both Turnstile and reCAPTCHA)
 * @param token - Captcha token to verify
 * @param remoteIp - Optional IP address of the user (for reCAPTCHA)
 * @returns Promise<CaptchaVerificationResult>
 */
export async function verifyCaptchaToken(
  token: string | undefined | null,
  remoteIp?: string
): Promise<CaptchaVerificationResult> {
  // If both are disabled, skip verification (for development)
  if (!TURNSTILE_ENABLED && !RECAPTCHA_ENABLED) {
    console.warn('[CAPTCHA] Both Turnstile and reCAPTCHA are disabled, skipping verification');
    return { isValid: true, type: 'none' };
  }

  // Try Turnstile first if enabled
  if (TURNSTILE_ENABLED) {
    const isValid = await verifyTurnstileToken(token);
    return { isValid, type: 'turnstile' };
  }

  // Try reCAPTCHA if enabled
  if (RECAPTCHA_ENABLED) {
    const isValid = await verifyRecaptchaToken(token, remoteIp);
    return { isValid, type: 'recaptcha' };
  }

  // Fallback: skip verification
  return { isValid: true, type: 'none' };
}
