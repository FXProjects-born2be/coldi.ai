'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { imageAlt } from '@/shared/constants/page-image-alt';
import { blurInUp } from '@/shared/lib/helpers';

import st from './Cards.module.scss';

const cards = [
  {
    icon: '/images/brokers/card-dashboard.svg',
    title: 'Instant CRM & Back-Office Logging',
    description:
      'Every interaction is automatically documented and synced with your CRM and back-office systems in real time.',
  },
  {
    icon: '/images/brokers/card-shield.svg',
    title: 'Real-Time Verification',
    description:
      'Clients can complete MFA or verify account details through secure, automated voice workflows without human intervention.',
  },
  {
    icon: '/images/brokers/card-translate.svg',
    title: 'Multilingual Global Support',
    description:
      'Support global traders across 30+ languages with natural, human-like conversations that understand financial terminology.',
  },
];

export const Cards = () => {
  return (
    <section className={st.layout}>
      <div className={st.grid}>
        {cards.map((card) => (
          <motion.div
            key={card.title}
            className={st.card}
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className={st.iconWrap}>
              <Image
                src={card.icon}
                alt={imageAlt('fxBrokers', card.title)}
                width={32}
                height={32}
                unoptimized
              />
            </div>
            <div className={st.content}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
