'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

import { blurInUp } from '@/shared/lib/helpers';

import st from './Cost.module.scss';

const cards: {
  icon: string;
  title: string;
  description: ReactNode;
  alt: string;
}[] = [
  {
    icon: '/images/agent-development/icon-code-circle.svg',
    title: 'How to develop AI agents?',
    description: (
      <>
        Developing effective AI agents includes strategy, design, integration, training, and
        testing. While some teams attempt internal development,{' '}
        <strong>
          it&apos;s more efficient and effective to have Coldi implement the solution for you
        </strong>
        , ensuring quality and delivering working systems faster.
      </>
    ),
    alt: 'Code circle icon',
  },
  {
    icon: '/images/agent-development/icon-chat-money.svg',
    title: 'How much does it cost to develop an AI agent?',
    description:
      'Costs vary based on complexity, scope, integrations, and requirements. Coldi provides tailored estimates based on your project goals, ensuring you get a solution that fits budget and delivers ROI.',
    alt: 'Chat and money icon',
  },
] as const;

export const Cost = () => {
  return (
    <section className={st.layout}>
      <div className={st.inner}>
        <motion.h2
          className={st.heading}
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Cost &amp; Implementation
        </motion.h2>

        <div className={st.grid}>
          {cards.map((card) => (
            <motion.article
              key={card.title}
              className={st.card}
              variants={blurInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className={st.iconWrap}>
                <Image src={card.icon} alt={card.alt} width={48} height={48} unoptimized />
              </div>
              <div className={st.content}>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
