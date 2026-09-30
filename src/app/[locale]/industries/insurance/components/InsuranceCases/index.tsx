'use client';

import { useRef, useState } from 'react';

import { useTranslations } from 'next-intl';

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
  title,
  titleAccent,
  description,
  audio = '/audio/insurance.mp3',
  visual = 'waveform',
  page,
}: InsuranceCasesProps) => {
  const t = useTranslations('InsuranceCases');
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    if (isPlaying) {
      audioEl.pause();
      audioEl.currentTime = 0;
      setIsPlaying(false);
    } else {
      audioEl.play();
      setIsPlaying(true);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const visualPair = VISUALS[visual];
  const LeftVisual = 'left' in visualPair ? visualPair.left : null;
  const RightVisual = visualPair.right;
  const useInsuranceDefaults = title === undefined;
  const resolvedTitle = title ?? t('title');
  const resolvedTitleAccent = titleAccent ?? (useInsuranceDefaults ? t('titleAccent') : undefined);
  const resolvedDescription = description ?? (useInsuranceDefaults ? t('description') : '');

  return (
    <section className={cn(st.insurance_cases, page && st[page])}>
      <div className={'container'}>
        <div className={st.insurance_cases__row}>
          {LeftVisual && (
            <div
              className={cn(
                st.insurance_cases__wave_wrapper,
                st['insurance_cases__wave_wrapper--left']
              )}
            >
              <div className={st.insurance_cases__wave_left}>
                <LeftVisual active={isPlaying} />
              </div>
            </div>
          )}

          <div className={st.insurance_cases__center}>
            <h2 className={st.insurance_cases__title}>
              {resolvedTitle}
              {resolvedTitleAccent ? (
                <>
                  <br />
                  <span>{resolvedTitleAccent}</span>
                </>
              ) : null}
            </h2>
            <p className={st.insurance_cases__desc}>{resolvedDescription}</p>

            <button
              type="button"
              className={cn(
                'btn btn-primary',
                st.insurance_cases__play,
                st.insurance_cases__play_desktop
              )}
              onClick={togglePlay}
            >
              {isPlaying ? t('pause') : t('play')}
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

          <div className={st.insurance_cases__wave_wrapper}>
            <div className={st.insurance_cases__wave_right}>
              <RightVisual active={isPlaying} />
            </div>
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
