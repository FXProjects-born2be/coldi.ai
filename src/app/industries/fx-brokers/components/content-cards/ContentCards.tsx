'use client';

import { type ReactNode } from 'react';
import Image from 'next/image';

import { motion } from 'framer-motion';

import { imageAlt } from '@/shared/constants/page-image-alt';
import { blurInUp } from '@/shared/lib/helpers';

import st from './ContentCards.module.scss';

type ContentRow = {
  title: string;
  description: ReactNode;
  listTitle?: string;
  bullets?: string[];
  footer?: ReactNode;
  visual: ReactNode;
  reverse?: boolean;
};

const rows: ContentRow[] = [
  {
    title: 'AI Agent First-Call Resolution',
    description:
      'In the fast-paced world of trading, timing is everything. Coldi.ai AI agents identify intent, verify identity, and resolve trader needs during the first interaction.',
    listTitle: 'This means:',
    bullets: [
      'Faster trader support: No waiting in queues during market crashes or rallies.',
      'Fewer escalations: Routine questions never reach your senior brokers.',
      'Less pressure on compliance: Consistent, recorded, and audited interactions every time.',
      'Improved retention: Traders stay where they get the fastest service.',
    ],
    visual: '/images/brokers/content-card-1.svg',
  },
  {
    title: 'Best AI Agents for Trading Platforms',
    description:
      'The best AI agents for brokerage firms combine financial literacy, secure workflows, and ultra-reliable telephony.',
    listTitle: 'Coldi.ai delivers:',
    bullets: [
      'Fintech-focused AI voice agents',
      'High resolution for deposit and withdrawal queries',
      'Secure and encrypted infrastructure',
      'Global multilingual capabilities',
      'Seamless integration with MT4/MT5 and custom APIs',
    ],
    visual: '/images/brokers/content-card-2.svg',
    reverse: true,
  },
  {
    title: 'Best AI Agents for Trading Platforms',
    description:
      'The best AI agents for brokerage firms combine financial literacy, secure workflows, and ultra-reliable telephony.',
    listTitle: 'Coldi.ai delivers:',
    bullets: [
      'Fintech-focused AI voice agents',
      'High resolution for deposit and withdrawal queries',
      'Secure and encrypted infrastructure',
      'Global multilingual capabilities',
      'Seamless integration with MT4/MT5 and custom APIs',
    ],
    visual: '/images/brokers/content-card-3.svg',
  },
  {
    title: 'AI Voice Agents for Brokerage Teams',
    description:
      'Trading platforms handle thousands of repetitive inquiries daily: password resets, deposit confirmations, and platform navigation. AI voice agents help reduce this burden by automating routine conversations while maintaining a professional, high-stakes experience. By introducing AI agents, brokerage teams can respond faster, eliminate "dead air" during high volatility, and ensure traders always have a bridge to their funds.',
    visual: '/images/brokers/content-card-4.svg',
    reverse: true,
  },
  {
    title: 'Better than Agentic AI for High-Volume Finance',
    description:
      'Brokers struggle with unpredictable call spikes during economic news releases. Coldi AI is designed to handle massive scale without increasing operational complexity. Our AI can manage thousands of inbound and outbound conversations simultaneously, helping firms:',
    bullets: [
      'Reduce "Lost Trade" complaints',
      'Improve KYC and onboarding speed',
      'Handle peak "Black Swan" hours efficiently',
      'Maintain regulatory communication standards',
    ],
    visual: '/images/brokers/content-card-5.svg',
  },
  {
    title: 'Multilingual AI Communication for Global Markets',
    description:
      'Trading knows no borders. Language barriers can prevent traders from managing their positions effectively. Coldi.ai supports communication in 30+ languages, allowing platforms to scale into new regions (LATAM, APAC, EMEA) without building local call centers.',
    visual: '/images/brokers/content-card-6.svg',
    reverse: true,
  },
  {
    title: 'Operational Efficiency Without Additional Headcount',
    description:
      'Scaling a brokerage support team traditionally means massive overhead in training and licensing. AI agents act as a scalable layer that grows with your AUM (Assets Under Management).',
    listTitle: 'Instead of increasing staffing costs, trading teams use AI to:',
    bullets: [
      'Automate Margin Call notifications',
      'Reduce manual onboarding work',
      'Lower operational pressure during market hours',
    ],
    visual: '/images/brokers/content-card-7.svg',
  },
];

export const ContentCards = () => {
  return (
    <section className={st.layout}>
      {rows.map((row, index) => (
        <motion.div
          key={row.title + index}
          className={`${st.row} ${row.reverse ? st.rowReverse : ''}`.trim()}
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={index * 0.08}
        >
          <div className={st.card}>
            <h3>{row.title}</h3>
            <div className={st.description}>{row.description}</div>

            {row.listTitle && row.bullets && (
              <div className={st.listBlock}>
                <p className={st.listTitle}>{row.listTitle}</p>
                <ul className={st.bullets}>
                  {row.bullets.map((bullet) => (
                    <li key={bullet}>
                      <span className={st.dot} />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {!row.listTitle && row.bullets && (
              <ul className={st.bullets}>
                {row.bullets.map((bullet) => (
                  <li key={bullet}>
                    <span className={st.dot} />
                    {bullet}
                  </li>
                ))}
              </ul>
            )}

            {row.footer && <div className={st.footer}>{row.footer}</div>}
          </div>

          <div className={st.visualWrap}>
            <div className={st.visualFrame}>
              <Image
                src={row.visual as string}
                alt={imageAlt('fxBrokers', row.title)}
                width={564}
                height={564}
                unoptimized
              />
            </div>
          </div>
        </motion.div>
      ))}
    </section>
  );
};
