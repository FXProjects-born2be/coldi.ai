'use client';

import { useEffect, useRef } from 'react';

import { cn } from '@/shared/lib/helpers';
import { BookDemo } from '@/shared/ui/components/book-demo';

import st from './Cta.module.scss';

export const UseCasesCta = () => {
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
      { threshold: 0.2 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={st.section}>
      <div className={cn('container', st.inner)}>
        <h2 className={st.title}>Inspired by the Results?</h2>
        <p className={st.text}>
          Tell us what your team is spending time on.
          <br />
          We&apos;ll show you where Coldi can automate the workflow.
        </p>
        <BookDemo className="btn-secondary w-max" />
      </div>
      <video
        ref={videoRef}
        className={st.video}
        src="/videos/use-cases-wave.mp4"
        poster="/images/use-cases-hub/wave-poster.jpg"
        autoPlay
        playsInline
        muted
        loop
        preload="none"
        controls={false}
        aria-hidden
      />
    </section>
  );
};
