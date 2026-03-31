'use client';

import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'framer-motion';

import { imageAlt } from '@/shared/constants/page-image-alt';
import { blurInUp } from '@/shared/lib/helpers';
import { Button } from '@/shared/ui/kit/button';

import st from './Why.module.scss';

const features = [
  {
    title: 'Fully Managed — No IT Team Required',
    bullets: [
      'End-to-end setup and implementation managed by Coldi.ai',
      'Integrations, call flows, and optimization handled for you',
      'No internal IT team or technical expertise required',
      'You focus on patient care — we manage the AI infrastructure and telephony',
    ],
    illustration: '/images/healthcare/why-1.png',
  },
  {
    title: 'Smart Issue Resolution',
    description:
      'AI agents understand patient intent, resolve common requests instantly, and reduce repetitive call handling.',
    illustration: '/images/healthcare/why-2.png',
  },
  {
    title: 'Context-Aware Routing',
    description:
      'Calls are intelligently routed based on context, urgency, and patient needs — ensuring faster resolutions.',
    cta: 'Stop missing Sale calls',
    illustration: '/images/healthcare/why-3.png',
  },
  {
    title: 'Instant Ticket Logging',
    description:
      'Every interaction is automatically documented and logged into your system in real time.',
    illustration: '/images/healthcare/why-4.png',
  },
  {
    title: 'Real-Time Scheduling',
    description: 'Patients can book, modify, or confirm appointments without human intervention.',
    illustration: '/images/healthcare/why-5.png',
  },
  {
    title: 'Multilingual Understanding',
    description: 'Support patients across 30+ languages with natural, human-like conversations.',
    cta: 'Hire AI Voice Agents',
    illustration: '/images/healthcare/why-6.png',
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
        Why Coldi for AI Agents in Healthcare
      </motion.h2>

      <div className={st.features}>
        {features.map((feature, index) => {
          const isReversed = index % 2 !== 0;

          return (
            <motion.div
              key={feature.title}
              className={`${st.featureRow} ${isReversed ? st.reversed : ''}`}
              variants={blurInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className={st.card}>
                <h3>{feature.title}</h3>
                {feature.bullets && (
                  <ul className={st.bullets}>
                    {feature.bullets.map((bullet) => (
                      <li key={bullet}>
                        <span className={st.dot} />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
                {feature.description && <p>{feature.description}</p>}
                {feature.cta && (
                  <Link href="#demo">
                    <Button size="md">{feature.cta}</Button>
                  </Link>
                )}
              </div>
              <div className={st.illustration}>
                <Image
                  src={feature.illustration}
                  alt={imageAlt('healthcare', feature.title)}
                  width={427}
                  height={427}
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
