'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers';
import { Button } from '@/shared/ui/kit/button';

import { audioScenarios } from '../data';
import st from './HearAgents.module.scss';

const AudioScenarioCard = ({
  title,
  description,
  audioUrl,
  buttonVariant,
  videoUrl,
}: (typeof audioScenarios)[number]) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = async () => {
    if (!audioRef.current) {
      return;
    }

    await audioRef.current.play();
    setIsPlaying(true);
    videoRef.current?.play();
  };

  const handlePause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
    videoRef.current?.pause();
  };

  const handleEnded = () => {
    handlePause();
    setProgress(0);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current || !audioRef.current.duration) {
      setProgress(0);
      return;
    }

    setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
  };

  const handleTimelineClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !audioRef.current.duration) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const nextProgress = ((event.clientX - rect.left) / rect.width) * 100;
    audioRef.current.currentTime = (nextProgress / 100) * audioRef.current.duration;
    setProgress(nextProgress);
  };

  const iconPath = isPlaying
    ? '/images/residential-service-automation/pause.svg'
    : '/images/residential-service-automation/play.svg';

  return (
    <article className={st.card}>
      <video
        className={st.card__video}
        src={videoUrl}
        autoPlay={false}
        playsInline
        muted
        loop
        preload="auto"
        controls={false}
        ref={videoRef}
      />

      <div className={st.content}>
        <div className={st.copy}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>

        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={handleEnded}
          onTimeUpdate={handleTimeUpdate}
          preload="metadata"
        />

        <div className={st.timeline} onClick={handleTimelineClick} aria-hidden="true">
          <div
            className={`${st.timelineProgress} ${st[buttonVariant]}`}
            style={{ width: `${progress}%` }}
          />
        </div>

        <Button variant={buttonVariant} fullWidth onClick={isPlaying ? handlePause : handlePlay}>
          <Image src={iconPath} alt="" width={24} height={24} />
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
      </div>
    </article>
  );
};

export const HearAgents = () => {
  return (
    <section className={st.layout}>
      <motion.div
        className={st.heading}
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2>Hear AI Voice Agents in Action</h2>
        <p>
          Experience how <strong>George</strong> manages real-world interactions with natural flow
          and technical precision:
        </p>
      </motion.div>

      <div className={st.cards}>
        {audioScenarios.map((scenario, index) => (
          <motion.div
            key={scenario.title}
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={index * 0.2}
          >
            <AudioScenarioCard {...scenario} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
