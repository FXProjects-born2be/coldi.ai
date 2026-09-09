'use client';

import { useEffect, useRef, useState } from 'react';

import { useTranslations } from 'next-intl';

import { cn } from '@/shared/lib/helpers';
import { IconCarbonPauseFilled } from '@/shared/ui/icons/IconCarbonPauseFilled';
import { IconEntypoControllerPlay } from '@/shared/ui/icons/IconEntypoControllerPlay';
import { IconHearAura } from '@/shared/ui/icons/IconHearAura';
import { IconHearDots } from '@/shared/ui/icons/IconHearDots';
import { IconHearTimer } from '@/shared/ui/icons/IconHearTimer';
import { IconHearWaveform } from '@/shared/ui/icons/IconHearWaveform';

import st from './HomeHearVoice.module.scss';

import { Link } from '@/i18n/navigation';

const VISUALS = {
  insurance: IconHearWaveform,
  trading: IconHearAura,
  'debt-collection': IconHearTimer,
  'customer-support': IconHearDots,
} as const;

type HearVoiceId = keyof typeof VISUALS;

type HearVoiceItem = {
  id: HearVoiceId;
  audio?: string;
};

const SelectChevron = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d="M4.5 6.75L9 11.25L13.5 6.75"
      stroke="#171717"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const voices: HearVoiceItem[] = [
  {
    id: 'insurance',
    audio: '/audio/insurance.wav',
  },
  {
    id: 'trading',
    audio: '/audio/trading-platforms.mp3',
  },
  {
    id: 'debt-collection',
    audio: '/audio/debt-collection.wav',
  },
  {
    id: 'customer-support',
    audio: '/audio/emis.mp3',
  },
];

const HearVisual = ({ id, active }: { id: HearVoiceId; active?: boolean }) => {
  const Visual = VISUALS[id];

  return (
    <div className={st.home_hear_voice__visual}>
      <div className={st.home_hear_voice__visual_icon}>
        <Visual active={active} />
      </div>
    </div>
  );
};

export const HomeHearVoice = () => {
  const t = useTranslations('HomeHearVoice');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  const stopAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  };

  const togglePlay = (index: number) => {
    const item = voices[index];
    const audio = audioRef.current;
    const isSame = activeIndex === index;

    if (isSame) {
      stopAudio();
      setActiveIndex(null);
      return;
    }

    setActiveIndex(index);

    if (audio && item.audio) {
      audio.src = item.audio;
      void audio.play();
      return;
    }

    stopAudio();
  };

  const selectVoice = (index: number) => {
    setSelectedIndex(index);
    setIsSelectOpen(false);

    if (activeIndex !== null && activeIndex !== index) {
      stopAudio();
      setActiveIndex(null);
    }
  };

  useEffect(() => {
    if (!isSelectOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!selectRef.current?.contains(event.target as Node)) {
        setIsSelectOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsSelectOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSelectOpen]);

  const selectedVoice = voices[selectedIndex] ?? voices[0];

  return (
    <section className={st.home_hear_voice}>
      <audio ref={audioRef} onEnded={() => setActiveIndex(null)} preload="none" />
      <div className="container">
        <div className={st.home_hear_voice__top}>
          <h2 className={st.home_hear_voice__title}>{t('title')}</h2>

          <p className={st.home_hear_voice__description}>{t('description')}</p>
        </div>

        <ul className={st.home_hear_voice__list}>
          {voices.map((item, index) => (
            <li
              key={item.id}
              className={cn(
                st.home_hear_voice__item,
                selectedIndex === index && st.selected,
                activeIndex === index && st.playing
              )}
            >
              <div>
                <h3 className={st.home_hear_voice__item_title}>{t(`items.${item.id}.title`)}</h3>
                <p className={st.home_hear_voice__item_subtitle}>
                  {t(`items.${item.id}.subtitle`)}
                </p>
              </div>

              <HearVisual id={item.id} active={activeIndex === index} />

              <button
                type="button"
                className={cn(
                  'btn',
                  activeIndex === index ? 'btn-secondary' : 'btn-primary',
                  st.home_hear_voice__item_btn
                )}
                onClick={() => togglePlay(index)}
              >
                {activeIndex === index ? (
                  <>
                    {t('pause')}
                    <IconCarbonPauseFilled />
                  </>
                ) : (
                  <>
                    {t('play')}
                    <IconEntypoControllerPlay />
                  </>
                )}
              </button>
            </li>
          ))}
        </ul>

        <div className={st.home_hear_voice__select} ref={selectRef}>
          <button
            type="button"
            className={st.home_hear_voice__select_trigger}
            aria-haspopup="listbox"
            aria-expanded={isSelectOpen}
            aria-label={t('selectAria')}
            onClick={() => setIsSelectOpen((open) => !open)}
          >
            <span className={st.home_hear_voice__select_thumb}>
              <HearVisual id={selectedVoice.id} active={activeIndex === selectedIndex} />
            </span>
            <span className={st.home_hear_voice__select_label}>
              {t(`items.${selectedVoice.id}.title`)}
            </span>
            <span
              className={cn(st.home_hear_voice__select_chevron, isSelectOpen && st.open)}
              aria-hidden
            >
              <SelectChevron />
            </span>
          </button>

          {isSelectOpen ? (
            <ul className={st.home_hear_voice__select_list} role="listbox">
              {voices.map((item, index) => (
                <li key={item.id} role="presentation">
                  <button
                    type="button"
                    role="option"
                    aria-selected={selectedIndex === index}
                    className={cn(
                      st.home_hear_voice__select_option,
                      selectedIndex === index && st.active
                    )}
                    onClick={() => selectVoice(index)}
                  >
                    <span className={st.home_hear_voice__select_thumb}>
                      <HearVisual id={item.id} active={activeIndex === index} />
                    </span>
                    <span className={st.home_hear_voice__select_label}>
                      {t(`items.${item.id}.title`)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className={st.home_hear_voice__btn}>
          <Link href={'/products'} className="btn btn-primary d-inline-block">
            {t('exploreProducts')}
          </Link>
        </div>
      </div>
    </section>
  );
};
