'use client';

import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'framer-motion';

import { imageAlt } from '@/shared/constants/page-image-alt';
import { blurInUp } from '@/shared/lib/helpers';
import { Button } from '@/shared/ui/kit/button';

import st from './Cards.module.scss';

const cards = [
  {
    icon: '/images/call-center/card1.svg',
    title: 'Smart, Voice\u2011First AI Support',
    description:
      'AI call center agents understand caller intent, handle tier\u20111 requests instantly, and provide accurate responses without delays.',
  },
  {
    icon: '/images/call-center/card2.svg',
    title: 'Context\u2011Aware Call Routing',
    description:
      'Calls aren\u2019t just answered, they\u2019re routed intelligently based on issue type, customer profile, language preference, or sentiment, delivering faster resolutions and lower escalations.',
  },
  {
    icon: '/images/call-center/card3.svg',
    title: 'Instant CRM Logging',
    description:
      'Every interaction gets logged and synced with your CRM in real time, so customer histories, notes, and follow\u2011ups stay current without manual entry.',
  },
  {
    icon: '/images/call-center/card4.svg',
    title: 'Automated Support Workflows',
    description:
      'AI agents can assist with outbound follow\u2011ups, lead qualification, appointment scheduling, and telemarketing outreach \u2014 expanding support beyond inbound calls into proactive engagement.',
  },
  {
    icon: '/images/call-center/card5.svg',
    title: 'Multilingual Voice Support',
    description:
      'Provide inclusive customer experiences in multiple languages with natural, conversational AI that adapts to diverse audiences \u2014 no need to maintain large multilingual staff rosters.',
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
                alt={imageAlt('callCenter', card.title)}
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
      <div className={st.button}>
        <Link href="#demo">
          <Button size="md">Build Your AI Voice Team</Button>
        </Link>
      </div>
    </section>
  );
};
