/**
 * Captcha configuration and feature flags
 */

// Feature flag: Turnstile (set to true to re-enable Turnstile)
export const TURNSTILE_ENABLED = false;

// Feature flag: Google reCAPTCHA v2 (set to true to enable)
export const RECAPTCHA_ENABLED = false; // Disabled - use hCaptcha instead for always-on image challenges

// Feature flag: hCaptcha (set to true to enable - ALWAYS shows image challenge)
export const HCAPTCHA_ENABLED = true;

// Feature flag: Use fallback mode for reCAPTCHA (may trigger challenges more often, for testing)
// Set to true to use fallback=true parameter in reCAPTCHA script URL
export const RECAPTCHA_FALLBACK_MODE = process.env.NEXT_PUBLIC_RECAPTCHA_FALLBACK === 'true';

// Use env variable for Cloudflare Turnstile site key
export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';

// Use env variable for Google reCAPTCHA v2 site key
export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

// Use env variable for hCaptcha site key
export const HCAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || '';
