'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Script from 'next/script';

import st from './Hero.module.scss';

const HUBSPOT_MEETINGS_BASE = 'https://meetings-eu1.hubspot.com/hector-iglesias?embed=true';
const HUBSPOT_MEETINGS_SCRIPT =
  'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js';

const PREFILL_PARAMS = ['firstName', 'lastName', 'email'] as const;

export const Hero = () => {
  const searchParams = useSearchParams();
  const embedUrl = useMemo(() => {
    const params = new URLSearchParams();
    PREFILL_PARAMS.forEach((key) => {
      const value = searchParams.get(key);
      if (value) params.set(key, value);
    });
    const query = params.toString();
    return query ? `${HUBSPOT_MEETINGS_BASE}&${query}` : HUBSPOT_MEETINGS_BASE;
  }, [searchParams]);

  return (
    <section className={st.layout}>
      <div className={st.title}>
        <h1>
          Thank You for <br /> <span>Your Interest</span>
        </h1>
      </div>
      <div className={st.calendar}>
        <div className={`${st.meetingsEmbed} meetings-iframe-container`} data-src={embedUrl} />
        <Script src={HUBSPOT_MEETINGS_SCRIPT} strategy="afterInteractive" />
      </div>
    </section>
  );
};
