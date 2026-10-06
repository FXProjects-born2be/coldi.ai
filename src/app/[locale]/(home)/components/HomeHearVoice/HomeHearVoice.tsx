'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';

import { useTranslations } from 'next-intl';

import { cn } from '@/shared/lib/helpers';
import { IconCarbonPauseFilled } from '@/shared/ui/icons/IconCarbonPauseFilled';
import { IconEntypoControllerPlay } from '@/shared/ui/icons/IconEntypoControllerPlay';
import { IconHearAura } from '@/shared/ui/icons/IconHearAura';
import { IconHearDots } from '@/shared/ui/icons/IconHearDots';
import { IconHearTimer } from '@/shared/ui/icons/IconHearTimer';
import { IconHearWaveform } from '@/shared/ui/icons/IconHearWaveform';

import { transcripts } from './data';
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
    audio: '/audio/insurance.mp3',
  },
  {
    id: 'trading',
    audio: '/audio/trading-platforms.mp3',
  },
  {
    id: 'debt-collection',
    audio: '/audio/debt-collection.mp3',
  },
  {
    id: 'customer-support',
    audio: '/audio/digital-banking.mp3',
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
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState<number | null>(null);
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
      setIsTranscriptOpen(false);
      setCurrentMessageIndex(null);
      return;
    }

    setActiveIndex(index);
    setIsTranscriptOpen(false);
    setCurrentMessageIndex(null);

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
      setIsTranscriptOpen(false);
      setCurrentMessageIndex(null);
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

  const activeTranscript = useMemo(
    () => (activeIndex !== null ? (transcripts[voices[activeIndex].id] ?? []) : []),

    [activeIndex]
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      const currentTime = audio.currentTime;

      const index = activeTranscript.findIndex(
        (message) => currentTime >= message.start && currentTime < message.end
      );

      setCurrentMessageIndex(index === -1 ? null : index);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [activeTranscript]);

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', isTranscriptOpen);

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isTranscriptOpen]);

  return (
    <section className={st.home_hear_voice}>
      <audio
        ref={audioRef}
        onEnded={() => {
          setActiveIndex(null);
          setCurrentMessageIndex(null);
        }}
        preload="none"
      />
      <div className="container">
        <div className={st.home_hear_voice__top}>
          <h2 className={st.home_hear_voice__title}>{t('title')}</h2>

          <p className={st.home_hear_voice__description}>{t('description')}</p>
        </div>

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
                    <span>{t('pause')}</span>
                    <IconCarbonPauseFilled />
                  </>
                ) : (
                  <>
                    <span>{t('play')}</span>
                    <IconEntypoControllerPlay />
                  </>
                )}
              </button>

              {activeIndex === index && (
                <button
                  type="button"
                  className={st.home_hear_voice__item_transcript}
                  onClick={() => setIsTranscriptOpen(true)}
                >
                  See Transcript
                </button>
              )}
            </li>
          ))}
        </ul>

        <div className={st.home_hear_voice__btn}>
          <Link href={'/solutions'} className="btn btn-primary d-inline-block">
            {t('exploreProducts')}
          </Link>
        </div>

        {isTranscriptOpen && activeIndex !== null && (
          <div
            className={st.home_hear_voice__modal}
            role="dialog"
            aria-modal="true"
            aria-label="Transcript"
          >
            <div className={st.home_hear_voice__modal_overlay}>
              <div className={st.home_hear_voice__modal_content}>
                <button
                  type="button"
                  className={st.home_hear_voice__modal_close}
                  aria-label="Close transcript"
                  onClick={() => setIsTranscriptOpen(false)}
                >
                  <Image
                    src="/icons/material-symbols_close-rounded.svg"
                    width={24}
                    height={24}
                    alt="Icon"
                  />
                </button>

                <div className={st.home_hear_voice__modal_grid}>
                  {/* LEFT */}
                  <div className={st.home_hear_voice__modal_left}>
                    <div className={cn(st.home_hear_voice__item, st.selected, st.playing)}>
                      <div>
                        <h3 className={st.home_hear_voice__item_title}>
                          {t(`items.${voices[activeIndex].id}.title`)}
                        </h3>

                        <p className={st.home_hear_voice__item_subtitle}>
                          {t(`items.${voices[activeIndex].id}.subtitle`)}
                        </p>
                      </div>

                      <HearVisual id={voices[activeIndex].id} active />

                      <button
                        type="button"
                        className={cn('btn btn-secondary', st.home_hear_voice__item_btn)}
                        onClick={() => togglePlay(activeIndex)}
                      >
                        <span>{t('pause')}</span>
                        <IconCarbonPauseFilled />
                      </button>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className={st.home_hear_voice__modal_right}>
                    <div className={st.home_hear_voice__transcript}>
                      {activeTranscript.map((message, index) => (
                        <div
                          key={index}
                          className={cn(
                            st.home_hear_voice__transcript_message_wrapper,

                            message.speaker === 'client'
                              ? st.home_hear_voice__transcript_client
                              : st.home_hear_voice__transcript_coldi
                          )}
                        >
                          {message.speaker === 'client' ? (
                            <Image src="/icons/speaking.svg" width={25} height={25} alt="Icon" />
                          ) : (
                            <Image src="/icons/logo-short.svg" width={26} height={25} alt="Icon" />
                          )}

                          <p
                            className={cn(
                              st.home_hear_voice__transcript_message,
                              currentMessageIndex === index && st.active
                            )}
                          >
                            {message.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
