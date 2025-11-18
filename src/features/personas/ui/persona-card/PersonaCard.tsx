'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { PauseIcon } from '@/shared/ui/icons/fill/pause-icon';
import { PlayIcon } from '@/shared/ui/icons/fill/play';

import st from './PersonaCard.module.scss';

export const PersonaCard = ({
  persona,
}: {
  persona: {
    name: string;
    description: string;
    imgUrl: string;
    type: string;
    audioUrl: string;
  };
}) => {
  const { name, description, imgUrl, type, audioUrl } = persona;
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    audioRef.current?.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  return (
    <div className={st.card}>
      <div className={st.card__content}>
        <div className={st.card__top}>
          <Image src={imgUrl} alt={name} width={509} height={484} unoptimized />
          <div>
            <h4>{name}</h4>
            <span>{type}</span>
          </div>
        </div>
        <p>{description}</p>
        <Link href={`/lead-request`}>Get Started →</Link>
      </div>
      <div className={st.card__button}>
        <audio ref={audioRef} src={audioUrl} onEnded={handlePause} style={{ display: 'none' }} />
        <button onClick={isPlaying ? handlePause : handlePlay}>
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
      </div>
    </div>
  );
};
