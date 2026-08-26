'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { imageAlt } from '@/shared/constants/page-image-alt';
import { blurInUp } from '@/shared/lib/helpers';

import st from './Cards.module.scss';

const cards = [
  {
    icon: '/images/insurance-agents/card1.svg',
    title: 'Smart Policy and Claim Resolution',
    description:
      'AI agents understand customer intent, answer policy questions, and handle routine insurance inquiries instantly.',
  },
  {
    icon: '/images/insurance-agents/card2.svg',
    title: 'Context-Aware Routing',
    description:
      'Calls are routed based on policy type, claim urgency, or customer profile, ensuring faster resolution and less friction.',
  },
  {
    icon: '/images/insurance-agents/card3.svg',
    title: 'Instant CRM Logging',
    description:
      'Every conversation is automatically documented and synced to your CRM or policy management system in real time.',
  },
  {
    icon: '/images/insurance-agents/card4.svg',
    title: 'Automated Quote and Renewal Support',
    description:
      'AI agents guide prospects through insurance quotes and assist with policy renewals or coverage updates.',
  },
  {
    icon: '/images/insurance-agents/card5.svg',
    title: 'Multilingual Customer Support',
    description:
      'Support policyholders across 30+ languages with natural, human-like conversations.',
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
                alt={imageAlt('insurance', card.title)}
                width={96}
                height={96}
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
