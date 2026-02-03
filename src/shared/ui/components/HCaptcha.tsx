'use client';

import { useEffect, useRef } from 'react';

import HCaptchaLib from '@hcaptcha/react-hcaptcha';

import { HCAPTCHA_SITE_KEY } from '@/shared/lib/captcha-config';

type HCaptchaProps = {
  onSuccess: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
  resetKey?: string | number; // For resetting the widget
};

/**
 * hCaptcha component wrapper using official @hcaptcha/react-hcaptcha library
 * hCaptcha ALWAYS shows image challenge (select images with buses, stairs, etc.)
 *
 * @see https://github.com/hCaptcha/react-hcaptcha
 */
export const HCaptcha = ({ onSuccess, onError, onExpire, resetKey }: HCaptchaProps) => {
  const captchaRef = useRef<HCaptchaLib>(null);

  // Reset captcha when resetKey changes
  useEffect(() => {
    if (captchaRef.current && resetKey !== undefined) {
      captchaRef.current.resetCaptcha();
    }
  }, [resetKey]);

  if (!HCAPTCHA_SITE_KEY) {
    console.warn(
      '[HCAPTCHA] Site key not configured. Please set NEXT_PUBLIC_HCAPTCHA_SITE_KEY in your .env.local file.'
    );
    return (
      <div
        style={{
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          background: '#f9f9f9',
        }}
      >
        <p style={{ margin: 0, color: '#d32f2f' }}>
          hCaptcha not configured. Please set NEXT_PUBLIC_HCAPTCHA_SITE_KEY in your environment
          variables.
        </p>
      </div>
    );
  }

  return (
    <HCaptchaLib
      ref={captchaRef}
      sitekey={HCAPTCHA_SITE_KEY}
      onVerify={(token: string) => {
        console.log('[HCAPTCHA] Client-side verification successful', {
          timestamp: new Date().toISOString(),
          tokenLength: token.length,
          tokenPreview: token.substring(0, 20) + '...',
          status: 'SUCCESS',
        });
        onSuccess(token);
      }}
      onError={(err: unknown) => {
        console.error('[HCAPTCHA] Client-side error', {
          timestamp: new Date().toISOString(),
          error: err instanceof Error ? err.message : String(err),
          errorType: err instanceof Error ? err.name : typeof err,
          status: 'ERROR',
        });
        onError?.();
      }}
      onExpire={() => {
        console.log('[HCAPTCHA] Token expired', {
          timestamp: new Date().toISOString(),
          status: 'EXPIRED',
        });
        onExpire?.();
      }}
      onOpen={() => {
        console.log('[HCAPTCHA] Challenge opened', {
          timestamp: new Date().toISOString(),
          status: 'CHALLENGE_OPENED',
        });
      }}
      onClose={() => {
        console.log('[HCAPTCHA] Challenge closed', {
          timestamp: new Date().toISOString(),
          status: 'CHALLENGE_CLOSED',
        });
      }}
      size="normal"
      theme="light"
    />
  );
};
