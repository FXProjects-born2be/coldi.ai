'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

import { blurInUp } from '@/shared/lib/helpers/animations';
import { cn } from '@/shared/lib/helpers/styles';
import { Counter } from '@/shared/ui/components/counter';

import st from './VoiceAgentKPIs.module.scss';

const cards = [
  {
    imgUrl: '/images/products/kpi1.svg',
    title: { start: 0, end: 8, prefix: '0.', suffix: ' seconds' },
    text: <p>Average Response Time</p>,
  },
  {
    imgUrl: '/images/products/kpi2.svg',
    title: { start: 0, end: 500, suffix: ' calls/hour per agent' },
    text: <p>Call Handling Capacity: Up to</p>,
  },
  {
    imgUrl: '/images/products/kpi3.svg',
    title: { start: 10, end: 87, suffix: '%' },
    text: <p>First-Call Resolution Rate</p>,
  },
  {
    imgUrl: '/images/products/kpi4.svg',
    title: { start: 10, end: 98.6, suffix: '%' },
    text: <p>Call Completion Rate</p>,
  },
  {
    imgUrl: '/images/products/kpi5.svg',
    title: { start: 0, end: 13, prefix: 'Only ', suffix: '%' },
    text: <p>Escalation Rate: of calls require human follow-up</p>,
  },
  {
    imgUrl: '/images/products/kpi6.svg',
    title: { start: 24, end: 24, suffix: '/7' },
    text: <p>Agent Availability: no breaks, no downtime</p>,
  },
];

export const VoiceAgentKPIs = () => {
  return (
    <section className={st.layout}>
      <motion.h2
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Voice Agent KPIs <br />
        at a Glance
      </motion.h2>
      <section className={st.cards}>
        {cards.map((card, index) => (
          <motion.div
            key={index}
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Card {...card} reverse={index % 2 === 1} />
          </motion.div>
        ))}
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
  title: { start: number; end: number; suffix?: string; prefix?: string };
  text: ReactNode;
  reverse?: boolean;
}) => (
  <article className={cn(st.card, reverse && st.card__reverse)}>
    <Image src={imgUrl} alt={`${title.end}${title.suffix}`} width={508} height={318} unoptimized />
    <div className={st.card__content}>
      <h3>
        <Counter
          start={title.start}
          end={title.end}
          suffix={title.suffix}
          prefix={title.prefix}
          duration={2}
          delay={0.5}
        />
      </h3>
      {text}
    </div>
  </article>
);
