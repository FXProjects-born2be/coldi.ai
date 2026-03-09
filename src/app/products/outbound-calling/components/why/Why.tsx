'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers';

import st from './Why.module.scss';

const features = [
  {
    title: 'AI Workforce: Human-like Calls That Convert',
    bullets: [
      'AI agents trained to engage, qualify and schedule',
      'Natural conversation flow that follows your script',
      'Multiple voices and languages available',
      'Instant live transfer to human reps when needed',
      'Runs 24/7 without downtime',
    ],
    image: '/images/outbound/why-1.svg',
  },
  {
    title: 'Smart Playbooks for Outbound Sales',
    bullets: [
      'AI-driven objection handling',
      'Consistent outbound messaging',
      'Follow-ups and voicemail automation',
      'Built for scalable outbound sales processes',
    ],
    image: '/images/outbound/why-2.svg',
  },
  {
    title: 'Continuous Optimization',
    bullets: [
      'Script testing and experimentation',
      'Real-time analytics on conversations',
      'Reporting and transcripts for improvement',
      'Performance tracking across campaigns',
    ],
    image: '/images/outbound/why-3.svg',
  },
  {
    title: 'Integrations',
    subtitle: 'Connect instantly with:',
    bullets: ['CRMs', 'Calendars', 'Lead sources', 'Telephony providers', 'Internal workflows'],
    image: '/images/outbound/why-4-full.svg',
  },
];

export const Why = () => {
  return (
    <section className={st.layout}>
      <motion.h2
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Why Switch to AI Outbound Calling Agents
      </motion.h2>

      <div className={st.rows}>
        {features.map((feature, i) => {
          const isReversed = i % 2 !== 0;
          return (
            <motion.div
              key={feature.title}
              className={`${st.row} ${isReversed ? st.reversed : ''}`}
              variants={blurInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className={st.card}>
                <h3>{feature.title}</h3>
                <div className={st.bullets}>
                  {feature.subtitle && <p className={st.subtitle}>{feature.subtitle}</p>}
                  {feature.bullets.map((bullet) => (
                    <div key={bullet} className={st.bullet}>
                      <span className={st.dot} />
                      <p>{bullet}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className={st.illustration}>
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={564}
                  height={564}
                  unoptimized
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
