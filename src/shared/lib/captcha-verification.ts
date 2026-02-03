/**
 * Unified captcha verification helper
 * Supports both Turnstile and reCAPTCHA based on feature flags
 */

import { HCAPTCHA_ENABLED, RECAPTCHA_ENABLED, TURNSTILE_ENABLED } from './captcha-config';
import { verifyHcaptchaToken } from './hcaptcha-verification';
import { verifyRecaptchaToken } from './recaptcha-verification';
import { verifyTurnstileToken } from './turnstile-verification';

export type CaptchaVerificationResult = {
  isValid: boolean;
  type: 'turnstile' | 'recaptcha' | 'hcaptcha' | 'none';
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
  // If all are disabled, skip verification (for development)
  if (!TURNSTILE_ENABLED && !RECAPTCHA_ENABLED && !HCAPTCHA_ENABLED) {
    console.warn('[CAPTCHA] All captcha services are disabled, skipping verification');
    return { isValid: true, type: 'none' };
  }

  // Try hCaptcha first if enabled (preferred for always-on image challenges)
  if (HCAPTCHA_ENABLED) {
    const isValid = await verifyHcaptchaToken(token, remoteIp);
    return { isValid, type: 'hcaptcha' };
  }

  // Try Turnstile if enabled
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
