'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/shared/lib/helpers';

import st from './HomeHearVoice.module.scss';

type HearVoiceItem = {
  title: string;
  subtitle: string;
  image: string;
  secondImage: string;
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
    title: 'Insurance Cases',
    subtitle: 'Policy Renewal',
    image: '/images/home/home-built-for-one.jpg',
    secondImage: '/images/home/home-built-for-one-second.png',
    audio: '/audio/insurance.wav',
  },
  {
    title: 'Trading Platforms',
    subtitle: 'Lead Qualification',
    image: '/images/home/home-built-for-two.jpg',
    secondImage: '/images/home/home-built-for-two-second.png',
    audio: '/audio/trading-platforms.wav',
  },
  {
    title: 'Debt Collection',
    subtitle: 'Payment Reminder',
    image: '/images/home/home-built-for-three.jpg',
    secondImage: '/images/home/home-built-for-three-second.png',
    audio: '/audio/insurance.wav',
  },
  {
    title: 'Customer Support',
    subtitle: 'Verification Call',
    image: '/images/home/home-built-for-four.jpg',
    secondImage: '/images/home/home-built-for-four-second.png',
    audio: '/audio/insurance.wav',
  },
];

export const HomeHearVoice = () => {
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
          <h2 className={st.home_hear_voice__title}>Hear Voice AI in Action</h2>

          <p className={st.home_hear_voice__description}>
            Listen to real conversations across insurance, trading platforms, and debt collection,
            and hear how Coldi handles customer interactions naturally and professionally.
          </p>
        </div>

        <ul className={st.home_hear_voice__list}>
          {voices.map((item, index) => (
            <li
              key={item.title}
              className={cn(st.home_hear_voice__item, selectedIndex === index && st.selected)}
            >
              <div className={st.home_hear_voice__item_visual}>
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className={st.home_hear_voice__item_bg}
                  loading="lazy"
                />
                <div className={st.home_hear_voice__item_second}>
                  <Image src={item.secondImage} alt="" width={359} height={359} loading="lazy" />
                </div>
              </div>
              <h3 className={st.home_hear_voice__item_title}>{item.title}</h3>
              <p className={st.home_hear_voice__item_subtitle}>{item.subtitle}</p>
              <div
                className={cn(st.home_hear_voice__item_btn, activeIndex === index && st.playing)}
                aria-label={activeIndex === index ? `Stop ${item.title}` : `Play ${item.title}`}
                onClick={() => togglePlay(index)}
              >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </li>
          ))}
        </ul>

        <div className={st.home_hear_voice__select} ref={selectRef}>
          <button
            type="button"
            className={st.home_hear_voice__select_trigger}
            aria-haspopup="listbox"
            aria-expanded={isSelectOpen}
            aria-label="Select voice example"
            onClick={() => setIsSelectOpen((open) => !open)}
          >
            <span className={st.home_hear_voice__select_thumb}>
              <Image src={selectedVoice.image} alt="" fill sizes="40px" />
            </span>
            <span className={st.home_hear_voice__select_label}>{selectedVoice.title}</span>
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
                <li key={item.title} role="presentation">
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
                      <Image src={item.image} alt="" fill sizes="40px" />
                    </span>
                    <span className={st.home_hear_voice__select_label}>{item.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className={st.home_hear_voice__btn}>
          <Link href={'/products'} className="btn btn-primary d-inline-block">
            Explore Products
          </Link>
        </div>
      </div>
    </section>
  );
};
