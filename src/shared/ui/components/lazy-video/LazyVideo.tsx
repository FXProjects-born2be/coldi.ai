'use client';

import { useEffect, useRef } from 'react';

type LazyVideoProps = {
  src: string;
  poster?: string;
  className?: string;
};

export const LazyVideo = ({ src, poster, className }: LazyVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (video.getAttribute('src') !== src) {
            video.src = src;
            video.load();
          }
          void video.play().catch(() => undefined);
          return;
        }

        video.pause();
      },
      { rootMargin: '200px 0px', threshold: 0.01 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  return (
    <video
      ref={videoRef}
      className={className}
      poster={poster}
      playsInline
      muted
      loop
      preload="none"
      controls={false}
      aria-hidden
    />
  );
};
