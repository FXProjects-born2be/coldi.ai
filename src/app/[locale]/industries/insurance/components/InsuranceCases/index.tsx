'use client';

import { useRef, useState } from 'react';

import { cn } from '@/shared/lib/helpers';
import { IconAuraFour } from '@/shared/ui/icons/IconAuraFour';
import { IconAuraThree } from '@/shared/ui/icons/IconAuraThree';
import { IconTimerFour } from '@/shared/ui/icons/IconTimerFour';
import { IconTimerThree } from '@/shared/ui/icons/IconTimerThree';
import { IconWaveformLeft } from '@/shared/ui/icons/IconWaveformLeft';
import { IconWaveformRight } from '@/shared/ui/icons/IconWaveformRight';

import st from './InsuranceCases.module.scss';

type InsuranceCasesProps = {
  title?: string;
  titleAccent?: string;
  description?: string;
  audio?: string;
  visual?: 'waveform' | 'aura' | 'timer';
  page?: 'trading-platforms-brokers' | 'debt-collection' | 'emis-payments';
};

const VISUALS = {
  waveform: {
    left: IconWaveformLeft,
    right: IconWaveformRight,
  },
  aura: {
    left: IconAuraThree,
    right: IconAuraFour,
  },
  timer: {
    left: IconTimerThree,
    right: IconTimerFour,
  },
} as const;

export const InsuranceCases = ({
  title = 'Insurance Cases',
  titleAccent = 'Policy Renewal',
  description = 'A real renewal call, softened for privacy. Same tone your policyholders would hear',
  audio = '/audio/insurance.wav',
  visual = 'waveform',
  page,
}: InsuranceCasesProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const LeftVisual = VISUALS[visual].left;
  const RightVisual = VISUALS[visual].right;

  return (
    <section className={cn(st.insurance_cases, page && st[page])}>
      <div className={'container'}>
        <div className={st.insurance_cases__row}>
          <div className={st.insurance_cases__wave_left}>
            <LeftVisual active={isPlaying} />
          </div>

          <div className={st.insurance_cases__center}>
            <h2 className={st.insurance_cases__title}>
              {title}
              <br />
              <span>{titleAccent}</span>
            </h2>
            <p className={st.insurance_cases__desc}>{description}</p>

            <button
              type="button"
              className={cn(
                'btn btn-primary',
                st.insurance_cases__play,
                st.insurance_cases__play_desktop
              )}
              onClick={togglePlay}
            >
              {isPlaying ? 'Pause' : 'Play'}
              <span className={st.insurance_cases__play_icon}>
                {isPlaying ? (
                  <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                    <rect width="4" height="14" rx="1" fill="white" />
                    <rect x="8" width="4" height="14" rx="1" fill="white" />
                  </svg>
                ) : (
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                    <path d="M0 0L10 6L0 12V0Z" fill="white" />
                  </svg>
                )}
              </span>
            </button>
          </div>

          <div className={st.insurance_cases__wave_right}>
            <RightVisual active={isPlaying} />
          </div>

          <button
            type="button"
            className={cn(
              'btn btn-primary',
              st.insurance_cases__play,
              st.insurance_cases__play_mobile
            )}
            onClick={togglePlay}
          >
            {isPlaying ? 'Pause' : 'Play'}
            <span className={st.insurance_cases__play_icon}>
              {isPlaying ? (
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                  <rect width="4" height="14" rx="1" fill="white" />
                  <rect x="8" width="4" height="14" rx="1" fill="white" />
                </svg>
              ) : (
                <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                  <path d="M0 0L10 6L0 12V0Z" fill="white" />
                </svg>
              )}
            </span>
          </button>
        </div>
        <audio ref={audioRef} src={audio} onEnded={handleEnded} preload="none" />
      </div>
    </section>
  );
};
