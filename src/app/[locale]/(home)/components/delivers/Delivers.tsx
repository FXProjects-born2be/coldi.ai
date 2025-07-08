'use client';

import Image from 'next/image';

import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/helpers/styles';

import st from './Delivers.module.scss';

const cards = [
  {
    imgUrl: '/images/home/delivers/chart.png',
    title: '72%',
    text: (
      <p>
        more qualified leads
        <br /> from automated outreach
      </p>
    ),
  },
  {
    imgUrl: '/images/home/delivers/phone.png',
    title: '0',
    text: (
      <p>
        missed follow-ups
        <br />
        with Coldi’s built-in call logic
      </p>
    ),
  },
  {
    imgUrl: '/images/home/delivers/counter.png',
    title: '300X',
    text: (
      <p>
        faster lead coverage
        <br />
        compared to human agents
      </p>
    ),
  },
  {
    imgUrl: '/images/home/delivers/chart-2.png',
    title: '80%',
    text: (
      <p>
        cost reduction
        <br />
        in outbound call operations
      </p>
    ),
  },
];

export const Delivers = () => {
  return (
    <section className={st.layout}>
      <h2>
        What Coldi <br />
        <span className={st.highlight}>Delivers at Scale</span>
      </h2>
      <section className={st.cards}>
        <div className={st.cardsRow}>
          <Card {...cards[0]} />
          <Card {...cards[1]} reverse />
        </div>
        <div className={st.cardsRow}>
          <Card {...cards[2]} reverse />
          <Card {...cards[3]} />
        </div>
      </section>
    </section>
  );
};

const Card = ({
  imgUrl,
  title,
  text,
  reverse,
}: {
  imgUrl: string;
  title: string;
  text: ReactNode;
  reverse?: boolean;
}) => (
  <article className={cn(st.card, reverse && st.card__reverse)}>
    <Image src={imgUrl} alt={title} width={296} height={296} unoptimized />
    <div className={st.card__content}>
      <h3>{title}</h3>
      {text}
    </div>
  </article>
);
