'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

import { RECAPTCHA_SITE_KEY } from '@/shared/lib/captcha-config';

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
  resetKey?: string | number; // For resetting the widget (renamed from 'key' to avoid React warning)
};

export const Recaptcha = ({ onSuccess, onError, onExpire, resetKey }: RecaptchaProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

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

  // Handle script load success
  const handleScriptLoad = () => {
    console.log('[RECAPTCHA] Script loaded successfully');
    // Wait a moment for grecaptcha to initialize, then check
    const checkGrecaptcha = () => {
      if (
        typeof window !== 'undefined' &&
        window.grecaptcha &&
        typeof window.grecaptcha.ready === 'function'
      ) {
        window.grecaptcha.ready(() => {
          console.log(
            '[RECAPTCHA] grecaptcha.ready callback fired - reCAPTCHA is fully initialized'
          );
          setIsLoaded(true);
        });
      } else {
        console.warn('[RECAPTCHA] grecaptcha not ready yet, retrying...');
        setTimeout(checkGrecaptcha, 200);
      }
    };
    // Start checking after a short delay
    setTimeout(checkGrecaptcha, 100);
  };

  // Handle script load error
  const handleScriptError = () => {
    const errorMsg =
      'Failed to load reCAPTCHA script. Check your internet connection and ensure the site key is valid.';
    console.error('[RECAPTCHA]', errorMsg);
    setLoadError(errorMsg);
  };

  useEffect(() => {
    console.log('[RECAPTCHA] Render effect triggered', {
      isLoaded,
      hasContainer: !!containerRef.current,
      hasSiteKey: !!RECAPTCHA_SITE_KEY,
      siteKeyPreview: RECAPTCHA_SITE_KEY ? RECAPTCHA_SITE_KEY.substring(0, 10) + '...' : 'none',
      grecaptchaAvailable: typeof window !== 'undefined' && !!window.grecaptcha,
    });

    if (!isLoaded || !containerRef.current || !RECAPTCHA_SITE_KEY) {
      if (!RECAPTCHA_SITE_KEY) {
        console.warn(
          '[RECAPTCHA] Site key not configured. Please set NEXT_PUBLIC_RECAPTCHA_SITE_KEY in your environment variables.'
        );
      }
      if (!isLoaded) {
        console.log('[RECAPTCHA] Waiting for script to load...');
      }
      if (!containerRef.current) {
        console.log('[RECAPTCHA] Waiting for container ref...');
      }
      return;
    }

    // Verify grecaptcha is available
    if (!window.grecaptcha || !window.grecaptcha.ready) {
      console.error(
        '[RECAPTCHA] grecaptcha object not available. Script may not have loaded correctly.',
        {
          grecaptchaExists: !!window.grecaptcha,
          readyExists: window.grecaptcha ? typeof window.grecaptcha.ready : 'N/A',
        }
      );
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
      if (!containerRef.current) {
        console.warn('[RECAPTCHA] Container ref is null, cannot render widget');
        return;
      }

      // Double-check container is empty
      if (containerRef.current.children.length > 0) {
        containerRef.current.innerHTML = '';
      }

      try {
        console.log(
          '[RECAPTCHA] Rendering widget with site key:',
          RECAPTCHA_SITE_KEY.substring(0, 10) + '...'
        );
        const widgetId = window.grecaptcha.render(containerRef.current, {
          sitekey: RECAPTCHA_SITE_KEY,
          callback: (token: string) => {
            console.log('[RECAPTCHA] Success callback triggered');
            onSuccessRef.current(token);
          },
          'expired-callback': () => {
            console.log('[RECAPTCHA] Token expired');
            onExpireRef.current?.();
          },
          'error-callback': () => {
            const errorMsg =
              'reCAPTCHA error callback triggered. This usually means the site key is invalid, there is a domain mismatch, or the service cannot be reached.';
            console.error('[RECAPTCHA]', errorMsg, {
              siteKey: RECAPTCHA_SITE_KEY.substring(0, 10) + '...',
              currentDomain: typeof window !== 'undefined' ? window.location.hostname : 'unknown',
            });
            setLoadError(errorMsg);
            onErrorRef.current?.();
          },
          size: 'normal', // Normal size - shows checkbox first, then image challenge if needed
          theme: 'light',
          // Note: 'type' parameter is not supported in render() for forcing image challenges
          // Google automatically determines when to show image challenge based on risk assessment
        });

        widgetIdRef.current = widgetId;
        console.log('[RECAPTCHA] Widget rendered successfully with ID:', widgetId);

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
  }, [isLoaded, resetKey]); // resetKey is used to reset the widget when it changes

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

  // Listen for recaptcha-ready event if script was already loaded
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleReady = () => {
      console.log('[RECAPTCHA] Received recaptcha-ready event');
      setIsLoaded(true);
    };

    // Check if script already exists and grecaptcha is ready
    const existingScript = document.querySelector('script[src*="google.com/recaptcha/api.js"]');
    if (existingScript && window.grecaptcha && typeof window.grecaptcha.ready === 'function') {
      window.grecaptcha.ready(() => {
        console.log('[RECAPTCHA] Script already loaded, grecaptcha ready');
        setIsLoaded(true);
      });
    }

    window.addEventListener('recaptcha-ready', handleReady);
    return () => {
      window.removeEventListener('recaptcha-ready', handleReady);
    };
  }, []);

  if (!RECAPTCHA_SITE_KEY) {
    console.warn(
      '[RECAPTCHA] Site key not configured. Please set NEXT_PUBLIC_RECAPTCHA_SITE_KEY in your .env.local file.'
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
          reCAPTCHA not configured. Please set NEXT_PUBLIC_RECAPTCHA_SITE_KEY in your environment
          variables.
        </p>
      </div>
    );
  }

  // Validate site key format (should be ~40 characters)
  if (RECAPTCHA_SITE_KEY.length < 20) {
    console.warn(
      '[RECAPTCHA] Site key appears to be invalid (too short). Please check your NEXT_PUBLIC_RECAPTCHA_SITE_KEY.'
    );
  }

  // Show error message if script failed to load
  if (loadError) {
    return (
      <div
        style={{
          padding: '15px',
          border: '1px solid #d32f2f',
          borderRadius: '4px',
          background: '#ffebee',
          color: '#c62828',
        }}
      >
        <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>reCAPTCHA Error</p>
        <p style={{ margin: 0, fontSize: '14px' }}>{loadError}</p>
        <p style={{ margin: '10px 0 0 0', fontSize: '12px', opacity: 0.8 }}>
          Please check:
          <br />• Your internet connection
          <br />• That NEXT_PUBLIC_RECAPTCHA_SITE_KEY is set correctly
          <br />• That the site key is configured for this domain in Google reCAPTCHA Console
        </p>
        <button
          onClick={() => {
            setLoadError(null);
            setIsLoaded(false);
            window.location.reload();
          }}
          style={{
            marginTop: '10px',
            padding: '8px 16px',
            background: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  // Use standard script URL - fallback=true can cause connection issues
  // For testing image challenges, use incognito mode or configure in Google Console
  const scriptUrl = 'https://www.google.com/recaptcha/api.js?render=explicit';

  // Check if script already exists
  const scriptExists =
    typeof window !== 'undefined' &&
    document.querySelector('script[src*="google.com/recaptcha/api.js"]');

  return (
    <>
      {/* Only load script once globally */}
      {!scriptExists && (
        <Script
          id="recaptcha-script"
          src={scriptUrl}
          strategy="afterInteractive"
          onLoad={handleScriptLoad}
          onError={handleScriptError}
        />
      )}
      <div ref={containerRef} />
    </>
  );
};
