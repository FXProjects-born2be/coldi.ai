'use client';

import Image from 'next/image';

import { ArrowLeft } from '@/shared/ui/icons/gradient/arrow-left';
import { ArrowRight } from '@/shared/ui/icons/gradient/arrow-right';
import { Chip } from '@/shared/ui/kit/chip';

import st from './Advantages.module.scss';

const cards = [
  {
    imgUrl: '/images/home/advtg/voice-agents.jpg',
    name: 'Tailored Voice Agents',
    text: 'Trained on your tone, tasks, and real business scenarios – not generic templates.',
  },
  {
    imgUrl: '/images/home/advtg/integration.jpg',
    name: 'Hands-On Integration',
    text: 'We connect Coldi across your stack and channels. You don’t lift a finger.',
  },
  {
    imgUrl: '/images/home/advtg/setup.jpg',
    name: 'End-to-End Campaign Setup',
    text: 'We build, test, and adjust each scenario – until it performs.',
  },
  {
    imgUrl: '/images/home/advtg/optimization.jpg',
    name: 'Ongoing Optimization',
    text: 'We monitor, measure, and refine – so Coldi keeps delivering.',
  },
];

export const Advantages = () => {
  return (
    <section className={st.layout}>
      <header className={st.header}>
        <section className={st.title}>
          <div className={st.chipContainer}>
            <ArrowRight />
            <Chip variant="secondary">Most AI tools fail on implementation.</Chip>
            <ArrowLeft />
          </div>
          <h2>The Advantages of Implementation</h2>
        </section>
        <p className={st.desc}>
          Coldi doesn’t. We handle everything — from voice selection to full setup and performance
          tuning. You get a fully integrated AI voice agent that works for your business.s
        </p>
      </header>
      <section className={st.cards}>
        {cards.map((card) => (
          <Card key={card.name} {...card} />
        ))}
      </section>
    </section>
  );
};

const Card = ({ imgUrl, name, text }: { imgUrl: string; name: string; text: string }) => (
  <article className={st.cardLayout}>
    <Image src={imgUrl} alt={name} width={318} height={318} unoptimized />
    <section className={st.card}>
      <h3>{name}</h3>
      <p>{text}</p>
    </section>
  </article>
);
