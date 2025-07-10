'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

import { blurInUp } from '@/shared/lib/helpers/animations';
import { cn } from '@/shared/lib/helpers/styles';
import { Counter } from '@/shared/ui/components/counter';

import st from './Delivers.module.scss';

const cards = [
  {
    imgUrl: '/images/home/delivers/chart.svg',
    title: { start: 10, end: 72, suffix: '%' },
    text: (
      <p>
        more qualified leads
        <br /> from automated outreach
      </p>
    ),
  },
  {
    imgUrl: '/images/home/delivers/phone.svg',
    title: { start: 0, end: 0, suffix: '' },
    text: (
      <p>
        missed follow-ups
        <br />
        with Coldi&apos;s built-in call logic
      </p>
    ),
  },
  {
    imgUrl: '/images/home/delivers/counter.svg',
    title: { start: 100, end: 300, suffix: 'X' },
    text: (
      <p>
        faster lead coverage
        <br />
        compared to human agents
      </p>
    ),
  },
  {
    imgUrl: '/images/home/delivers/chart-2.svg',
    title: { start: 10, end: 80, suffix: '%' },
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
      <motion.h2
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        What Coldi <br />
        <span className={st.highlight}>Delivers at Scale</span>
      </motion.h2>
      <section className={st.cards}>
        <motion.div
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Card {...cards[0]} />
        </motion.div>
        <motion.div
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Card {...cards[1]} reverse />
        </motion.div>
        <motion.div
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Card {...cards[2]} reverse />
        </motion.div>
        <motion.div
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Card {...cards[3]} />
        </motion.div>
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
  title: { start: number; end: number; suffix: string };
  text: ReactNode;
  reverse?: boolean;
}) => (
  <article className={cn(st.card, reverse && st.card__reverse)}>
    <Image src={imgUrl} alt={`${title.end}${title.suffix}`} width={296} height={296} unoptimized />
    <div className={st.card__content}>
      <h3>
        <Counter
          start={title.start}
          end={title.end}
          suffix={title.suffix}
          duration={2}
          delay={0.5}
        />
      </h3>
      {text}
    </div>
  </article>
);
