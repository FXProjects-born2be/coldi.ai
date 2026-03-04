'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const MIN_DELAY_MS = 8_000;
const MIN_INTERACTIONS = 3;
const FINALIZE_POLL_MS = 2_000;

type InteractionCounts = {
  scrollCount: number;
  mouseMoveCount: number;
  keypressCount: number;
  focusCount: number;
};

export function useFormToken(formId: string) {
  const [formToken, setFormToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const preTokenRef = useRef<string | null>(null);
  const preTokenIssuedAtRef = useRef<number>(0);
  const interactionsRef = useRef<InteractionCounts>({
    scrollCount: 0,
    mouseMoveCount: 0,
    keypressCount: 0,
    focusCount: 0,
  });
  const finalizedRef = useRef(false);
  const mountedRef = useRef(true);

  const tryFinalize = useCallback(async () => {
    if (finalizedRef.current || !preTokenRef.current) return;

    const elapsed = Date.now() - preTokenIssuedAtRef.current;
    const counts = interactionsRef.current;
    const totalInteractions =
      counts.scrollCount + counts.mouseMoveCount + counts.keypressCount + counts.focusCount;

    if (elapsed < MIN_DELAY_MS || totalInteractions < MIN_INTERACTIONS) return;

    finalizedRef.current = true;

    try {
      const res = await fetch('/api/form-token/finalize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          preToken: preTokenRef.current,
          interactions: counts,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        console.warn('[FORM-TOKEN] Finalize failed:', data.error);
        finalizedRef.current = false;
        return;
      }

      const { formToken: token } = await res.json();
      if (mountedRef.current) {
        setFormToken(token);
        setIsReady(true);
      }
    } catch (err) {
      console.error('[FORM-TOKEN] Finalize error:', err);
      finalizedRef.current = false;
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;

    const fetchPreToken = async () => {
      try {
        const res = await fetch('/api/form-token/issue', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ formId }),
        });

        if (!res.ok) {
          setError('Failed to initialize form security');
          return;
        }

        const { preToken } = await res.json();
        preTokenRef.current = preToken;
        preTokenIssuedAtRef.current = Date.now();
      } catch (err) {
        console.error('[FORM-TOKEN] Issue error:', err);
        setError('Failed to initialize form security');
      }
    };

    fetchPreToken();

    let mouseMoveThrottle = 0;
    const THROTTLE_MS = 500;

    const onScroll = () => {
      interactionsRef.current.scrollCount++;
    };
    const onMouseMove = () => {
      const now = Date.now();
      if (now - mouseMoveThrottle < THROTTLE_MS) return;
      mouseMoveThrottle = now;
      interactionsRef.current.mouseMoveCount++;
    };
    const onKeyPress = () => {
      interactionsRef.current.keypressCount++;
    };
    const onFocus = () => {
      interactionsRef.current.focusCount++;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('pointermove', onMouseMove, { passive: true });
    window.addEventListener('keydown', onKeyPress, { passive: true });
    document.addEventListener('focusin', onFocus, { passive: true } as AddEventListenerOptions);

    const pollInterval = setInterval(() => {
      if (!finalizedRef.current) tryFinalize();
    }, FINALIZE_POLL_MS);

    return () => {
      mountedRef.current = false;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('pointermove', onMouseMove);
      window.removeEventListener('keydown', onKeyPress);
      document.removeEventListener('focusin', onFocus);
      clearInterval(pollInterval);
    };
  }, [formId, tryFinalize]);

  return { formToken, isReady, error };
}
