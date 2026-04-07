'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers';

import st from './ValuesSection.module.scss';

type ValueCard = {
  title: string;
  body: string;
  icon: string;
  tall?: boolean;
};

const topRow: ValueCard[] = [
  {
    title: 'Radical Ownership',
    body: "We don't just sell tools; we deliver solutions. We take full responsibility for the success of every implementation from day one.",
    icon: '/images/meet-the-team/value-radical-ownership.svg',
  },
  {
    title: 'Quality at Scale',
    body: 'Volume should never compromise brand essence. We design intelligent interactions that align perfectly with your tone and business goals.',
    icon: '/images/meet-the-team/value-quality-at-scale.svg',
  },
  {
    title: 'Seamless Integration',
    body: 'Technology should enhance, not disrupt. Our focus is on building AI agents that fit directly into your existing workflows and CRMs.',
    icon: '/images/meet-the-team/value-seamless-integration.svg',
  },
];

const bottomRow: ValueCard[] = [
  {
    title: 'Continuous Optimization',
    body: 'AI is not static. We stay involved at every stage to tune, adapt, and ensure the system improves as your business evolves.',
    icon: '/images/meet-the-team/value-continuous-optimization.svg',
    tall: true,
  },
  {
    title: 'Reliability over Experimentation',
    body: 'Built for companies that need results, not tests. We provide robust, 24/7 managed systems for businesses that cannot afford to miss a single call.',
    icon: '/images/meet-the-team/value-reliability.svg',
    tall: true,
  },
];

export const ValuesSection = () => {
  return (
    <section className={st.layout}>
      <motion.div
        className={st.header}
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2>The Values That Drive Our Team</h2>
        <p>
          Calls are intelligently routed based on the caller&apos;s needs, urgency, or account
          profile, ensuring faster resolution and eliminating frustrating Interactive Voice Response
          menus.
        </p>
      </motion.div>

      <div className={st.rows}>
        <div className={st.topRow}>
          {topRow.map((card, index) => (
            <ValueItem key={card.title} card={card} index={index} />
          ))}
        </div>

        <div className={st.bottomRow}>
          {bottomRow.map((card, index) => (
            <ValueItem key={card.title} card={card} index={index + topRow.length} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ValueItem = ({ card, index }: { card: ValueCard; index: number }) => {
  return (
    <motion.article
      className={`${st.card} ${card.tall ? st.tall : ''}`}
      variants={blurInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      custom={index * 0.05}
    >
      <div className={st.iconWrap}>
        <Image src={card.icon} alt="" width={48} height={48} aria-hidden="true" />
      </div>

      <div className={st.text}>
        <h3>{card.title}</h3>
        <p>{card.body}</p>
      </div>
    </motion.article>
  );
};
