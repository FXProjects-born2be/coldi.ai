'use client';

import { useEffect, useRef } from 'react';

import { cn } from '@/shared/lib/helpers';

import st from './Hero.module.scss';

export const UseCasesHero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={st.hero}>
      <div className={cn('container', st.inner)}>
        <h1 className={st.title}>See How Coldi Automates Business Calls</h1>
        <p className={st.subtitle}>
          Real AI voice agents handling real business workflows:
          <br />
          from qualification and follow-ups to support, scheduling, and compliance.
        </p>
      </div>
      <video
        ref={videoRef}
        className={st.video}
        src="/videos/use-cases-hero.mp4"
        poster="/images/use-cases-hub/hero-poster.jpg"
        autoPlay
        playsInline
        muted
        loop
        preload="metadata"
        controls={false}
        aria-hidden
      />
      <div className={st.smoke} aria-hidden />
    </section>
  );
};
