'use client';

import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers';
import { Button } from '@/shared/ui/kit/button';

import st from './InboundOutbound.module.scss';

const cards = [
  {
    image: '/images/products/card-inbound-v2.png',
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
    image: '/images/products/card-outbound-v2.png',
    title: 'Outbound',
    description: (
      <>
        Automate outbound calls, lead qualification, and follow-ups with scalable voice AI
        campaigns, powered by our{' '}
        <Link href="/products/outbound-calling" className={st.link}>
          Outbound platform
        </Link>{' '}
        for growth-focused teams.
      </>
    ),
    buttonLabel: 'Explore Outbound',
    href: '/products/outbound-calling',
  },
  {
    image: '/images/products/card-agent-development-v2.png',
    title: 'AI Agent Development',
    description:
      'Design and deploy custom AI voice agents tailored to your workflows, integrations, and business logic.',
    buttonLabel: 'Explore Development',
    href: '/products/agent-development',
  },
  {
    image: '/images/products/card-customer-service-v2.png',
    title: 'AI Customer Service',
    description:
      'Deliver fast, consistent, and scalable customer support with AI-powered conversations across multiple channels.',
    buttonLabel: 'Explore Customer Service',
    href: '/products/customer-service-agent',
  },
  {
    image: '/images/products/card-voip-v2.png',
    title: 'VoIP Phone Service',
    description:
      'A fully managed VoIP system with built-in AI capabilities for smarter, global business communication.',
    buttonLabel: 'Explore VoIP',
    href: '/products/voip-phone-service',
  },
  {
    image: '/images/products/ai-for-quality-control.png',
    title: 'AI-Powered Call Monitoring',
    description:
      'Transform your operational oversight with our fully configurable, AI-driven QC system.',
    buttonLabel: 'Explore Call Monitoring',
    href: '/products/ai-for-quality-control',
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
              unoptimized
            />
          </div>
          <div className={st.card__content}>
            <div className={st.card__text}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
            <Link href={card.href} className={st.card__btn}>
              <Button size="sm">{card.buttonLabel}</Button>
            </Link>
          </div>
        </motion.article>
      ))}
    </div>
  </section>
);
