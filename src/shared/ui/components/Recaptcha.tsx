'use client';

import { useEffect, useRef, useState } from 'react';

import { RECAPTCHA_FALLBACK_MODE, RECAPTCHA_SITE_KEY } from '@/shared/lib/captcha-config';

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      render: (
        element: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          'expired-callback': () => void;
          'error-callback': () => void;
          size?: 'normal' | 'compact' | 'invisible';
          theme?: 'light' | 'dark';
          type?: 'image' | 'audio';
          hl?: string;
        }
      ) => number;
      reset: (widgetId: number) => void;
      getResponse: (widgetId: number) => string;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

type RecaptchaProps = {
  onSuccess: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
  key?: string | number; // For resetting the widget
};

export const Recaptcha = ({ onSuccess, onError, onExpire, key }: RecaptchaProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Store callbacks in refs to avoid re-rendering when they change
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);
  const onExpireRef = useRef(onExpire);

  // Update refs when callbacks change
  useEffect(() => {
    onSuccessRef.current = onSuccess;
    onErrorRef.current = onError;
    onExpireRef.current = onExpire;
  }, [onSuccess, onError, onExpire]);

  useEffect(() => {
    // Load reCAPTCHA script with explicit render
    // Note: Google reCAPTCHA v2 automatically shows image challenge when needed
    // Image challenge appears after clicking checkbox based on Google's risk assessment
    // To increase chance of image challenge: set Security Preference to "Most secure" in Google Console
    const script = document.createElement('script');
    // Using fallback=true may help trigger challenges more often (for testing)
    // Configure via NEXT_PUBLIC_RECAPTCHA_FALLBACK=true in .env.local
    script.src = RECAPTCHA_FALLBACK_MODE
      ? 'https://www.google.com/recaptcha/api.js?render=explicit&fallback=true'
      : 'https://www.google.com/recaptcha/api.js?render=explicit';
    script.async = true;
    script.defer = true;

    script.onload = () => {
      setIsLoaded(true);
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || !containerRef.current || !RECAPTCHA_SITE_KEY) {
      return;
    }

    // Clear container before rendering to avoid "already rendered" error
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }

    // Reset previous widget if exists
    if (widgetIdRef.current !== null && window.grecaptcha) {
      try {
        window.grecaptcha.reset(widgetIdRef.current);
        widgetIdRef.current = null;
      } catch {
        // Ignore reset errors - widget might not exist
        widgetIdRef.current = null;
      }
    }

    // Render reCAPTCHA widget
    // Note: Google automatically shows image selection challenge after checkbox click
    // when it detects suspicious behavior or insufficient trust signals
    // To force image challenge in testing: use incognito mode or test from same IP repeatedly
    window.grecaptcha.ready(() => {
      if (!containerRef.current) return;

      // Double-check container is empty
      if (containerRef.current.children.length > 0) {
        containerRef.current.innerHTML = '';
      }

      try {
        const widgetId = window.grecaptcha.render(containerRef.current, {
          sitekey: RECAPTCHA_SITE_KEY,
          callback: (token: string) => {
            onSuccessRef.current(token);
          },
          'expired-callback': () => {
            onExpireRef.current?.();
          },
          'error-callback': () => {
            onErrorRef.current?.();
          },
          size: 'normal', // Normal size - shows checkbox first, then image challenge if needed
          theme: 'light',
          // Note: 'type' parameter is not supported in render() for forcing image challenges
          // Google automatically determines when to show image challenge based on risk assessment
        });

        widgetIdRef.current = widgetId;

        // Try to trigger image challenge by programmatically interacting with the checkbox
        // This may help trigger the challenge, but Google's algorithm ultimately decides
        setTimeout(() => {
          // Find the reCAPTCHA iframe and try to trigger interaction
          const iframe = containerRef.current?.querySelector<HTMLIFrameElement>(
            'iframe[src*="recaptcha"]'
          );
          if (iframe && iframe.contentWindow) {
            try {
              // Try to click the checkbox programmatically
              // Note: This may be blocked by browser security, but worth trying
              const checkbox =
                iframe.contentDocument?.querySelector<HTMLElement>('.recaptcha-checkbox');
              if (checkbox) {
                checkbox.click();
              }
            } catch {
              // Cross-origin restrictions may prevent this
              // This is expected and normal
            }
          }
        }, 500);
      } catch (error) {
        console.error('Error rendering reCAPTCHA:', error);
        // If rendering fails, try to clear and retry after a short delay
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
          setTimeout(() => {
            if (containerRef.current && window.grecaptcha) {
              try {
                const widgetId = window.grecaptcha.render(containerRef.current, {
                  sitekey: RECAPTCHA_SITE_KEY,
                  callback: (token: string) => {
                    onSuccessRef.current(token);
                  },
                  'expired-callback': () => {
                    onExpireRef.current?.();
                  },
                  'error-callback': () => {
                    onErrorRef.current?.();
                  },
                  size: 'normal',
                  theme: 'light',
                });
                widgetIdRef.current = widgetId;
              } catch (retryError) {
                console.error('Error retrying reCAPTCHA render:', retryError);
              }
            }
          }, 100);
        }
      }
    });
  }, [isLoaded, key]); // Removed callbacks from dependencies - using refs instead

  // Cleanup on unmount
  useEffect(() => {
    const container = containerRef.current;
    const widgetId = widgetIdRef.current;

    return () => {
      // Cleanup widget on unmount
      if (widgetId !== null && window.grecaptcha) {
        try {
          // Clear the container
          if (container) {
            container.innerHTML = '';
          }
        } catch {
          // Ignore cleanup errors
        }
      }
    };
  }, []);

  if (!RECAPTCHA_SITE_KEY) {
    console.warn('[RECAPTCHA] Site key not configured');
    return null;
  }

  return <div ref={containerRef} />;
};
