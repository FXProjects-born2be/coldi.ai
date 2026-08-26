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
  visual: string;
  reverse?: boolean;
};

const rows: ContentRow[] = [
  {
    title: 'AI-Powered VoIP Communication',
    description: (
      <p>
        A standard VoIP phone service allows you to make calls over the internet instead of
        traditional lines. Coldi goes further by combining VoIP with AI automation.
      </p>
    ),
    listTitle: 'This means:',
    bullets: [
      'Calls are not just connected, they are handled.',
      'Conversations lead to outcomes like bookings, resolutions, and sales.',
      'Teams spend less time on repetitive communication.',
    ],
    visual: '/images/voip-phone-service/content-1.png',
  },
  {
    title: 'Reliable VoIP Infrastructure for Business',
    description: (
      <p>Modern VoIP providers offer flexibility and lower costs compared to legacy systems.</p>
    ),
    listTitle: 'Coldi enhances this with:',
    bullets: [
      'Enterprise-grade reliability.',
      'Low-latency voice infrastructure.',
      'Built-in redundancy and uptime optimization.',
      'Secure and compliant communication.',
    ],
    visual: '/images/voip-phone-service/content-2.png',
    reverse: true,
  },
  {
    title: 'VoIP Phone System for Modern Teams',
    description: <p>Coldi is designed for companies that rely on phone communication:</p>,
    bullets: [
      'Sales teams handling inbound leads.',
      'Support teams managing high call volumes.',
      'Operations teams coordinating workflows.',
      'Global businesses needing international coverage.',
    ],
    visual: '/images/voip-phone-service/content-3.png',
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

            {row.listTitle && <p className={st.listTitle}>{row.listTitle}</p>}

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
              src={row.visual}
              alt={imageAlt('voipPhoneService')}
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
