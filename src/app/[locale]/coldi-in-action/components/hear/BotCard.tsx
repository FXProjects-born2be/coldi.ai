'use client';

import { useRef, useState } from 'react';

import { PauseIcon } from '@/shared/ui/icons/fill/pause-icon';
import { PlayIcon } from '@/shared/ui/icons/fill/play';
import { Button } from '@/shared/ui/kit/button';

import st from './BotCard.module.scss';

export const BotCard = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    audioRef.current?.play();
    setIsPlaying(true);
    videoRef.current?.play();
  };

  const handlePause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
    videoRef.current?.pause();
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const dur = audioRef.current.duration;
      setCurrentTime(current);
      setDuration(dur);
      setProgress((current / dur) * 100);
    }
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = (clickX / rect.width) * 100;
    setProgress(newProgress);
    if (audioRef.current) {
      const newTime = (newProgress / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '00:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <article className={st.card}>
        <h2>
          Click to hear how Coldi <br />
          <span>sounds in a real client call.</span>
        </h2>
        <div className={st.card__videoWrapper}>
          <video
            className={st.card__video}
            src={'/videos/voices/variant-1.mp4'}
            autoPlay={false}
            playsInline
            muted
            loop
            preload="auto"
            controls={false}
            ref={videoRef}
          />
          <Button variant="primary" fullWidth onClick={isPlaying ? handlePause : handlePlay}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
        </div>
        <section className={st.card__contentContainer}>
          <div className={st.card__content}>
            <h3></h3>
          </div>
          <div className={st.card__audio}>
            <audio
              ref={audioRef}
              src={'/audio/recording.mp3'}
              onEnded={handlePause}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={() => {
                if (audioRef.current) {
                  setDuration(audioRef.current.duration);
                }
              }}
              style={{ display: 'none' }}
            />
            <div className={st.card__timeline} onClick={handleTimelineClick}>
              <div
                className={`${st.card__timeline__progress} ${st.primary}`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className={st.card__timelineText}>
              <p>{formatTime(currentTime)}</p>
              <p>{formatTime(duration)}</p>
            </div>
          </div>
          {/**
           * <Button variant="primary" fullWidth onClick={isPlaying ? handlePause : handlePlay}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
           */}
        </section>
      </article>
    </>
  );
};
