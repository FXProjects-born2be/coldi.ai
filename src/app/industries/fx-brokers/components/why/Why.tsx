'use client';

import { type ReactNode } from 'react';
import Image from 'next/image';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers';

import st from './Why.module.scss';

type WhyRow = {
  title: string;
  description?: ReactNode;
  bullets?: string[];
  visual: ReactNode;
  reverse?: boolean;
};

const rows: WhyRow[] = [
  {
    title: 'Fully Managed - No IT Team Required',
    bullets: [
      'End-to-end setup and implementation managed by Coldi.ai.',
      'API integrations, account verification flows, and performance optimization handled for you.',
      'No internal technical expertise required to launch sophisticated voice AI.',
      'You focus on the markets, while we manage the AI infrastructure and low-latency telephony.',
    ],
    visual: '/images/brokers/why-1.png',
  },
  {
    title: 'Smart Trade & Account Resolution',
    description:
      'AI agents understand trader intent, resolve common account queries (KYC status, deposit issues) instantly, and reduce repetitive ticket handling.',
    visual: '/images/brokers/why-2.png',
    reverse: true,
  },
  {
    title: 'Context-Aware Routing',
    description:
      'Calls are intelligently routed based on account tier, urgency, or specific market instruments, ensuring high-value traders get immediate attention.',
    visual: '/images/brokers/why-3.png',
  },
];

export const Why = () => {
  return (
    <section className={st.layout}>
      <motion.h2
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Why Coldi AI Agents for <br />
        Trading Platforms & Brokerage
      </motion.h2>

      {rows.map((row, index) => (
        <motion.div
          key={row.title}
          className={`${st.row} ${row.reverse ? st.rowReverse : ''}`.trim()}
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={index * 0.08}
        >
          <div className={st.card}>
            <h3>{row.title}</h3>

            {row.description && <div className={st.description}>{row.description}</div>}

            {row.bullets && (
              <ul className={st.bullets}>
                {row.bullets.map((bullet) => (
                  <li key={bullet}>
                    <span className={st.dot} />
                    {bullet}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={st.visualWrap}>
            <Image
              src={row.visual as string}
              alt={row.title}
              width={564}
              height={564}
              unoptimized
            />
          </div>
        </motion.div>
      ))}
    </section>
  );
};
