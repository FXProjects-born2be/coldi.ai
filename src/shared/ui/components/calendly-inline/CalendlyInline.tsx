'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

import { cn } from '@/shared/lib/helpers';

const CALENDLY_SCRIPT = 'https://assets.calendly.com/assets/external/widget.js';
const CALENDLY_ORIGIN = 'https://calendly.com';
const RESET_AFTER_MS = 3000;

type CalendlyApi = {
  initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
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

type CalendlyInlineProps = {
  url: string;
  className?: string;
  active?: boolean;
};

export const CalendlyInline = ({ url, className, active = true }: CalendlyInlineProps) => {
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;

    let pollId: number | undefined;
    let resetId: number | undefined;

    const initWidget = () => {
      const parent = parentRef.current;
      const Calendly = getCalendly();

      if (!parent || !Calendly) return false;

      parent.innerHTML = '';
      Calendly.initInlineWidget({
        url,
        parentElement: parent,
      });

      return true;
    };

    if (!initWidget()) {
      pollId = window.setInterval(() => {
        if (initWidget() && pollId) window.clearInterval(pollId);
      }, 80);
    }

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== CALENDLY_ORIGIN) return;
      if (!isEventScheduled(event.data)) return;

      window.clearTimeout(resetId);
      resetId = window.setTimeout(() => {
        initWidget();
      }, RESET_AFTER_MS);
    };

    window.addEventListener('message', onMessage);

    return () => {
      window.clearInterval(pollId);
      window.clearTimeout(resetId);
      window.removeEventListener('message', onMessage);
    };
  }, [active, url]);

  return (
    <>
      <div ref={parentRef} className={cn('calendly-inline-widget', className)} />
      {active ? <Script src={CALENDLY_SCRIPT} strategy="afterInteractive" /> : null}
    </>
  );
};
