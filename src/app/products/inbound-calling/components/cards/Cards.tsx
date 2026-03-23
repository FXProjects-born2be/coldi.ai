'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers';

import st from './Cards.module.scss';

const cards = [
  {
    icon: '/images/inbound-calling/card-inquiry.svg',
    title: 'Smart Inquiry and Issue Resolution',
    description:
      'AI agents understand caller intent, answer common business questions, and handle routine inbound inquiries with zero wait time.',
  },
  {
    icon: '/images/inbound-calling/card-routing.svg',
    title: 'Leading Voice AI for Inbound Call Routing',
    description:
      "Calls are intelligently routed based on the caller's needs, urgency, or account profile, ensuring faster resolution and eliminating frustrating Interactive Voice Response menus.",
  },
  {
    icon: '/images/inbound-calling/card-crm.svg',
    title: 'Instant CRM Data Sync',
    description:
      'Every inbound interaction is automatically documented, transcribed, and synced to your CRM in real time, keeping your records 100% accurate.',
  },
  {
    icon: '/images/inbound-calling/card-appointments.svg',
    title: 'Automated Appointment and Lead Support',
    description:
      'AI agents guide prospects through discovery questions, qualify inbound interest, and book meetings directly into your calendar.',
  },
  {
    icon: '/images/inbound-calling/card-multilingual.svg',
    title: 'Multilingual Inbound Answering Service',
    description:
      'Support your global customer base across 30+ languages with natural, localized conversations 24/7.',
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
              <Image src={card.icon} alt={card.title} width={96} height={96} unoptimized />
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
