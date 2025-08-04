'use client';

import { useRef, useState } from 'react';

import { PauseIcon } from '@/shared/ui/icons/fill/pause-icon';
import { PlayIcon } from '@/shared/ui/icons/fill/play';
import { Button } from '@/shared/ui/kit/button';

import type { BotPreview } from '../../model/types';
import st from './BotCard.module.scss';

export const BotCard = ({ text, name, btnVariant, videoUrl, audioUrl }: BotPreview) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const handlePlay = () => {
    audioRef.current?.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setProgress((currentTime / duration) * 100);
    }
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = (clickX / rect.width) * 100;
    setProgress(newProgress);
    if (audioRef.current) {
      audioRef.current.currentTime = (newProgress / 100) * audioRef.current.duration;
    }
  };

  return (
    <>
      <article className={st.card}>
        <video
          className={st.card__video}
          src={videoUrl}
          autoPlay
          playsInline
          muted
          loop
          preload="auto"
          controls={false}
        />
        <section className={st.card__contentContainer}>
          <div className={st.card__content}>
            <h3>{name}</h3>
            <p>{text}</p>
          </div>
          <Button variant={btnVariant} fullWidth onClick={isPlaying ? handlePause : handlePlay}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
          <div className={st.card__audio}>
            <audio
              ref={audioRef}
              src={audioUrl}
              onEnded={handlePause}
              onTimeUpdate={handleTimeUpdate}
              style={{ display: 'none' }}
            />
            {isPlaying && (
              <div className={st.card__timeline} onClick={handleTimelineClick}>
                <div
                  className={`${st.card__timeline__progress} ${st[`${btnVariant}`]}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </div>
        </section>
      </article>
    </>
  );
};
