'use client';

import { motion } from 'framer-motion';
import type { JSX } from 'react';

import { blurInUp } from '@/shared/lib/helpers/animations';
import { Calendar2Icon } from '@/shared/ui/icons/outline/calendar2';
import { ListIcon } from '@/shared/ui/icons/outline/list';
import { ProcessorIcon } from '@/shared/ui/icons/outline/processor';
import { TranslatorIcon } from '@/shared/ui/icons/outline/translator';
import { UploadIcon } from '@/shared/ui/icons/outline/upload';

import st from './NeverMiss.module.scss';

const card = [
  {
    icon: ProcessorIcon,
    name: 'Smart Issue Resolution',
    text: 'Understands the problem fast and provides accurate, human-like answers without delays.',
  },
  {
    icon: UploadIcon,
    name: 'Context-Aware Routing',
    text: 'Connects complex or urgent cases directly to the right human agent - with full call context.',
  },
  {
    icon: ListIcon,
    name: 'Instant Ticket Logging',
    text: 'Captures issue details and creates or updates support tickets in real time.',
  },
  {
    icon: Calendar2Icon,
    name: 'Real-Time Scheduling',
    text: 'Books meetings, callbacks, or service slots straight into your team’s calendar.',
  },
  {
    icon: TranslatorIcon,
    name: 'Multilingual Understanding',
    text: 'Understands and speaks your customer’s language - with warmth and clarity.',
  },
];

export const NeverMiss = () => (
  <section className={st.layout}>
    <motion.h2 variants={blurInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      <span className={st.highlighted}>Never Miss</span> a Call Again
    </motion.h2>
    <motion.p
      variants={blurInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={st.desc}
    >
      You never know how important the next one might be - Coldi answers, <br />
      understands, and gets things done.
    </motion.p>
    <section className={st.cards}>
      {card.map((item, index) => (
        <Card key={item.name} {...item} index={index} />
      ))}
    </section>
  </section>
);

const Card = ({
  icon: Icon,
  name,
  text,
  index,
}: {
  icon: () => JSX.Element;
  name: string;
  text: string;
  index: number;
}) => {
  const totalDuration = card.length * 0.5; // 1.6s для 8 елементів

  const shakeAnimation = {
    rotate: [0, -5, 0, 5, 0],
    transition: {
      duration: 0.2,
      repeat: Infinity,
      repeatDelay: totalDuration - 0.5, // Затримка до наступного циклу
      delay: index * 0.5,
      ease: 'easeInOut' as const,
    },
  };

  return (
    <article className={st.card}>
      <div className={st.card__content}>
        <div className={st.card__front}>
          <h3>
            <motion.div animate={shakeAnimation} style={{ display: 'inline-block' }}>
              <Icon />
            </motion.div>
            <span>{name}</span>
          </h3>
        </div>
        <div className={st.card__back}>
          <p>{text}</p>
        </div>
      </div>
    </article>
  );
};
