'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

import { cn } from '@/shared/lib/helpers';

import type { AskedAudio } from '../data';
import st from './CaseStudy.module.scss';

export const AskedAudioGrid = ({ items }: { items: readonly AskedAudio[] }) => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});

  const togglePlay = (id: string) => {
    Object.entries(audioRefs.current).forEach(([key, audio]) => {
      if (key === id || !audio) return;
      audio.pause();
      audio.currentTime = 0;
    });

    const audio = audioRefs.current[id];
    if (!audio) return;

    if (playingId === id) {
      audio.pause();
      audio.currentTime = 0;
      setPlayingId(null);
      return;
    }

    void audio.play();
    setPlayingId(id);
  };

  return (
    <div className={st.askedAudioGrid}>
      {items.map((item) => {
        const isPlaying = playingId === item.audio;

        return (
          <div
            key={item.audio}
            className={cn(st.askedAudioCard, isPlaying && st.askedAudioCardPlaying)}
          >
            <div className={st.askedAudioBgWrap}>
              <Image
                src={item.image}
                alt=""
                fill
                className={st.askedAudioBg}
                sizes="(max-width: 1024px) 100vw, 440px"
              />
            </div>
            <div>
              <p className={st.askedAudioTitle}>{item.title}</p>
              <p className={st.askedAudioText}>{item.text}</p>
            </div>
            <audio
              ref={(node) => {
                audioRefs.current[item.audio] = node;
              }}
              src={item.audio}
              onEnded={() => setPlayingId((current) => (current === item.audio ? null : current))}
              hidden
            />
            <button
              type="button"
              className={cn('btn btn-secondary w-full', st.askedAudioPlay)}
              onClick={() => togglePlay(item.audio)}
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
          </div>
        );
      })}
    </div>
  );
};
