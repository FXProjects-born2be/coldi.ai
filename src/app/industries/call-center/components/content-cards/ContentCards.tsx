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
  visual: string;
  reverse?: boolean;
};

const rows: ContentRow[] = [
  {
    title: 'AI Agent First\u2011Call Resolution',
    description:
      'When callers get answers on the first interaction, satisfaction increases and follow\u2011ups decrease. AI call center agents identify customer intent, retrieve relevant data, and resolve many queries without human intervention.',
    listTitle: 'This means:',
    bullets: [
      'Faster support turnaround',
      'Fewer transfers between agents',
      'Reduced backlog in queue systems',
      'Higher customer satisfaction and retention',
    ],
    footer:
      'AI\u2011powered conversational systems can manage high\u2011volume, repetitive queries, from balance checks to status updates, significantly lowering workloads for human teams while maintaining quality and responsiveness.',
    visual: '/images/call-center/content-card1.svg',
  },
  {
    title: 'Best AI Agents for Call Centers',
    description:
      'The best call center AI for voice\u2011based support combines advanced conversational intelligence, scalable architecture, and seamless integrations.',
    listTitle: 'Coldi delivers:',
    bullets: [
      'Voice AI agents tailored for call center workflows',
      'High first\u2011call resolution performance',
      'Scalable infrastructure for peak volumes',
      'Intelligent call analytics and reporting',
      'Integration with CRMs, telephony systems, and analytics tools',
    ],
    footer:
      'These capabilities align with growing industry adoption of AI call center software, where automation is used to reduce costs, improve CX metrics, and handle support demands beyond human capacities alone.',
    visual: '/images/call-center/content-card2.svg',
    reverse: true,
  },
  {
    title: 'AI Voice Agents for Support and Telemarketing',
    description:
      'Coldi\u2019s AI call center agents bridge the gap between inbound support and outbound growth through a unified, automated platform:',
    bullets: [
      'Automated Campaigns: Effortlessly handle lead qualification, follow-ups, and reminders while managing inbound support simultaneously.',
      '24/7 Scalability: Provide instant, round-the-clock responses and coverage without increasing headcount or operational costs.',
      'Operational Efficiency: Reduce congestion and automate routine inquiries, allowing human teams to focus on high-value tasks.',
    ],
    footer:
      'The result is faster resolution times and more efficient business generation across the board.',
    visual: '/images/call-center/content-card3.svg',
  },
];

export const ContentCards = () => {
  return (
    <section className={st.layout}>
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
            <Image
              src={row.visual}
              alt={imageAlt('callCenter', row.title)}
              width={427}
              height={427}
              unoptimized
            />
          </div>
        </motion.div>
      ))}
    </section>
  );
};
