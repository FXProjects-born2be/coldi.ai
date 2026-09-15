'use client';

import { useEffect, useRef } from 'react';

import { cn } from '@/shared/lib/helpers';

const CALENDLY_SCRIPT = 'https://assets.calendly.com/assets/external/widget.js';
const CALENDLY_ORIGIN = 'https://calendly.com';
const SCRIPT_ID = 'calendly-widget-js';
const RESET_AFTER_MS = 3000;
const SCRIPT_RETRY_MS = 1200;

type CalendlyPrefill = {
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  customAnswers?: Record<string, string>;
};

type CalendlyApi = {
  initInlineWidget: (options: {
    url: string;
    parentElement: HTMLElement;
    prefill?: CalendlyPrefill;
  }) => void;
};

const getCalendly = () => (window as Window & { Calendly?: CalendlyApi }).Calendly;

const isEventScheduled = (data: unknown) => {
  let payload = data;

  if (typeof payload === 'string') {
    try {
      payload = JSON.parse(payload);
    } catch {
      return false;
    }
  }

  return (
    typeof payload === 'object' &&
    payload !== null &&
    'event' in payload &&
    payload.event === 'calendly.event_scheduled'
  );
};

const insertScript = (onLoad: () => void, cacheBust = false) => {
  const script = document.createElement('script');
  script.id = SCRIPT_ID;
  script.src = cacheBust ? `${CALENDLY_SCRIPT}?v=${Date.now()}` : CALENDLY_SCRIPT;
  script.async = true;
  script.onload = onLoad;
  document.body.appendChild(script);
  return script;
};

type CalendlyInlineProps = {
  url: string;
  className?: string;
  active?: boolean;
  prefill?: CalendlyPrefill;
};

export const CalendlyInline = ({ url, className, active = true, prefill }: CalendlyInlineProps) => {
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;

    let cancelled = false;
    let pollId: number | undefined;
    let resetId: number | undefined;
    let retried = false;
    const startedAt = Date.now();

    const initWidget = () => {
      const parent = parentRef.current;
      const Calendly = getCalendly();

      if (!parent || !Calendly) return false;

      parent.innerHTML = '';
      Calendly.initInlineWidget({
        url,
        parentElement: parent,
        ...(prefill ? { prefill } : {}),
      });

      return true;
    };

    const tryInit = () => {
      if (cancelled) return;
      if (initWidget() && pollId) {
        window.clearInterval(pollId);
        pollId = undefined;
      }
    };

    const existing = document.getElementById(SCRIPT_ID);

    if (getCalendly()) {
      tryInit();
    } else if (existing) {
      existing.addEventListener('load', tryInit);
    } else {
      insertScript(tryInit);
    }

    pollId = window.setInterval(() => {
      tryInit();

      if (cancelled || getCalendly() || retried) return;
      if (Date.now() - startedAt < SCRIPT_RETRY_MS) return;

      retried = true;
      document.getElementById(SCRIPT_ID)?.remove();
      insertScript(tryInit, true);
    }, 80);

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== CALENDLY_ORIGIN) return;
      if (!isEventScheduled(event.data)) return;

      window.clearTimeout(resetId);
      resetId = window.setTimeout(() => {
        if (!cancelled) initWidget();
      }, RESET_AFTER_MS);
    };

    window.addEventListener('message', onMessage);

    return () => {
      cancelled = true;
      window.clearInterval(pollId);
      window.clearTimeout(resetId);
      window.removeEventListener('message', onMessage);
    };
  }, [active, url, prefill]);

  return <div ref={parentRef} className={cn('calendly-inline-widget', className)} />;
};
