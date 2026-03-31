'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { imageAlt } from '@/shared/constants/page-image-alt';
import { blurInUp } from '@/shared/lib/helpers';

import st from './Cards.module.scss';

const cards = [
  {
    icon: '/images/real-estate/card1.svg',
    title: 'Smart Lead and Listing Resolution',
    description:
      'AI agents understand buyer intent, answer specific property questions, and handle routine listing inquiries instantly.',
  },
  {
    icon: '/images/real-estate/card2.svg',
    title: 'Context-Aware Routing',
    description:
      'Calls are routed based on price point, neighborhood expertise, or urgency, ensuring hot leads get to the right human agent faster.',
  },
  {
    icon: '/images/real-estate/card3.svg',
    title: 'Instant CRM Logging',
    description:
      'Every buyer and seller interaction is automatically transcribed and synced to your CRM in real time, ensuring no lead falls through the cracks.',
  },
  {
    icon: '/images/real-estate/card4.svg',
    title: 'Automated Valuation and Showing Support',
    description:
      'AI agents guide prospects through initial property valuations and assist with scheduling tours or open house registrations.',
  },
  {
    icon: '/images/real-estate/card5.svg',
    title: 'Multilingual Prospecting',
    description:
      'Support diverse markets across 30+ languages with natural, high-converting conversations.',
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
                alt={imageAlt('realEstate', card.title)}
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
