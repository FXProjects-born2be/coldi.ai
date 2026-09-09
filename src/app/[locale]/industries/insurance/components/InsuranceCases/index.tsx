'use client';

import { useRef, useState } from 'react';

import { cn } from '@/shared/lib/helpers';
import { IconAuraFive } from '@/shared/ui/icons/IconAuraFive';
import { IconAuraFour } from '@/shared/ui/icons/IconAuraFour';
import { IconAuraThree } from '@/shared/ui/icons/IconAuraThree';
import { IconDotWaveOne } from '@/shared/ui/icons/IconDotWaveOne';
import { IconDotWaveTwo } from '@/shared/ui/icons/IconDotWaveTwo';
import { IconHorizonWave } from '@/shared/ui/icons/IconHorizonWave';
import { IconHorizonWaveMobile } from '@/shared/ui/icons/IconHorizonWaveMobile';
import { IconTimerFive } from '@/shared/ui/icons/IconTimerFive';
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
  visual?: 'waveform' | 'aura' | 'timer' | 'dotWave' | 'horizon';
  page?:
    | 'trading-platforms-brokers'
    | 'debt-collection'
    | 'emis-payments'
    | 'insurance'
    | 'other-industries';
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
  dotWave: {
    left: IconDotWaveOne,
    right: IconDotWaveTwo,
  },
  horizon: {
    right: IconHorizonWave,
  },
} as const;

export const InsuranceCases = ({
  title = 'Insurance Cases',
  titleAccent,
  description = 'A real renewal call, softened for privacy. Same tone your policyholders would hear',
  audio = '/audio/insurance.mp3',
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

  const visualPair = VISUALS[visual];
  const LeftVisual = 'left' in visualPair ? visualPair.left : null;
  const RightVisual = visualPair.right;

  return (
    <section className={cn(st.insurance_cases, page && st[page])}>
      <div className={'container'}>
        <div className={st.insurance_cases__row}>
          {LeftVisual && (
            <div className={st.insurance_cases__wave_left}>
              <LeftVisual active={isPlaying} />
            </div>
          )}

          <div className={st.insurance_cases__center}>
            <h2 className={st.insurance_cases__title}>
              {title}
              {titleAccent ? (
                <>
                  <br />
                  <span>{titleAccent}</span>
                </>
              ) : null}
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

          {page === 'trading-platforms-brokers' && (
            <div className={st.insurance_cases__wave_mobile}>
              <IconAuraFive active={isPlaying} />
            </div>
          )}

          {page === 'debt-collection' && (
            <div className={st.insurance_cases__wave_mobile}>
              <IconTimerFive active={isPlaying} />
            </div>
          )}

          {page === 'other-industries' && (
            <div className={st.insurance_cases__wave_mobile}>
              <IconHorizonWaveMobile active={isPlaying} />
            </div>
          )}
        </div>
        <audio ref={audioRef} src={audio} onEnded={handleEnded} preload="none" />
      </div>
    </section>
  );
};
