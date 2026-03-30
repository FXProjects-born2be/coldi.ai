'use client';

import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers';
import { Button } from '@/shared/ui/kit/button';

import st from './InboundOutbound.module.scss';

const cards = [
  {
    image: '/images/products/inbound-card.png',
    title: 'Inbound',
    description: (
      <>
        Handle incoming customer calls with AI-powered agents that resolve requests instantly and
        reduce wait times, including our{' '}
        <Link href="/products/inbound-calling" className={st.link}>
          Inbound solution
        </Link>{' '}
        designed for high-volume support.
      </>
    ),
    buttonLabel: 'Explore Inbound',
    href: '/products/inbound-calling',
  },
  {
    image: '/images/products/outbound-card.png',
    title: 'Outbound',
    description: (
      <>
        Automate outbound calls, lead qualification, and follow-ups with scalable voice AI
        campaigns, powered by our{' '}
        <Link href="/products/outbound-calling" className={st.link}>
          AI outbound calling
        </Link>{' '}
        for growth-focused teams.
      </>
    ),
    buttonLabel: 'Explore Outbound',
    href: '/products/outbound-calling',
  },
];

export const InboundOutbound = () => (
  <section className={st.layout}>
    <div className={st.row}>
      {cards.map((card, index) => (
        <motion.article
          key={card.title}
          className={st.card}
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <div className={st.card__image}>
            <Image
              src={card.image}
              alt={card.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className={st.card__content}>
            <div className={st.card__text}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
            <Link href={card.href} className={st.card__btn}>
              <Button size="sm" fullWidth>
                {card.buttonLabel}
              </Button>
            </Link>
          </div>
        </motion.article>
      ))}
    </div>
  </section>
);
