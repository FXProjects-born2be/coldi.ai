'use client';

import { useState } from 'react';
import Image from 'next/image';

import { cn } from '@/shared/lib/helpers';

import st from './HomeHearVoice.module.scss';

type HearVoiceItem = {
  title: string;
  subtitle: string;
  image: string;
};

const voices: HearVoiceItem[] = [
  {
    title: 'Insurance Cases',
    subtitle: 'Policy Renewal',
    image: '/images/home/hear-voice-one.png',
  },
  {
    title: 'Trading Platforms',
    subtitle: 'Lead Qualification',
    image: '/images/home/hear-voice-two.png',
  },
  {
    title: 'Debt Collection',
    subtitle: 'Payment Reminder',
    image: '/images/home/hear-voice-three.png',
  },
  {
    title: 'Customer Support',
    subtitle: 'Verification Call',
    image: '/images/home/hear-voice-four.png',
  },
];

export const HomeHearVoice = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const togglePlay = (index: number) => {
    setActiveIndex((current) => (current === index ? null : index));
  };

  return (
    <section className={st.home_hear_voice}>
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
            <li key={item.title} className={st.home_hear_voice__item}>
              <Image
                src={item.image}
                alt={item.title}
                width={320}
                height={420}
                className={cn(st.home_hear_voice__item_image, activeIndex === index && st.spinning)}
                loading="lazy"
              />
              <h3 className={st.home_hear_voice__item_title}>{item.title}</h3>
              <p className={st.home_hear_voice__item_subtitle}>{item.subtitle}</p>
              <button
                type="button"
                className={cn(st.home_hear_voice__item_btn, activeIndex === index && st.playing)}
                aria-label={activeIndex === index ? `Stop ${item.title}` : `Play ${item.title}`}
                onClick={() => togglePlay(index)}
              >
                {/*<Image*/}
                {/*  src="/images/icons/voice.png"*/}
                {/*  alt=""*/}
                {/*  width={67}*/}
                {/*  height={67}*/}
                {/*  loading="lazy"*/}
                {/*/>*/}
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
