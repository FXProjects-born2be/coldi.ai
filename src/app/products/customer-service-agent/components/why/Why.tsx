'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { imageAlt } from '@/shared/constants/page-image-alt';
import { blurInUp } from '@/shared/lib/helpers';

import st from './Why.module.scss';

const t = (key: string, fallback: string) => fallback;

type WhySection = {
  title: string;
  intro?: string;
  bullets: string[];
  body: string[];
  visual: React.ReactNode;
  reverse?: boolean;
};

const sections: WhySection[] = [
  {
    title: t(
      'products.customerServiceAgent.why.sections.0.title',
      'Empowering Your Growth through Implementation'
    ),
    bullets: [
      t(
        'products.customerServiceAgent.why.sections.0.bullets.0',
        'End-to-end AI customer service agent implementation delivered by Coldi’s experienced specialists'
      ),
      t(
        'products.customerServiceAgent.why.sections.0.bullets.1',
        'Full architecture design, system integration, and production deployment handled for you'
      ),
      t(
        'products.customerServiceAgent.why.sections.0.bullets.2',
        'Custom conversational flows and business logic aligned with your exact use cases and processes'
      ),
      t(
        'products.customerServiceAgent.why.sections.0.bullets.3',
        'Continuous performance tuning, optimization, and iterative improvement'
      ),
      t(
        'products.customerServiceAgent.why.sections.0.bullets.4',
        'No need to build or maintain an internal AI team or invest heavily in infrastructure'
      ),
    ],
    body: [
      t(
        'products.customerServiceAgent.why.sections.0.body.0',
        'AI in customer service goes far beyond basic automation. It requires sophisticated natural language understanding, alignment with operational workflows, and the ability to respond dynamically in real time.'
      ),
      t(
        'products.customerServiceAgent.why.sections.0.body.1',
        'Coldi focuses on building fully functional systems that deliver measurable results, not experimental prototypes that require further development.'
      ),
      t(
        'products.customerServiceAgent.why.sections.0.body.2',
        'We ensure your AI solution is stable, scalable, and deeply embedded into your support ecosystem, enabling immediate and long-term value.'
      ),
    ],
    visual: '/images/customer-service-agent/why-1.png',
  },
  {
    title: t(
      'products.customerServiceAgent.why.sections.1.title',
      'Intelligent Support That Scales with Your Business'
    ),
    intro: t(
      'products.customerServiceAgent.why.sections.1.intro',
      'Modern customers expect fast, accurate, and personalized support across every channel. Coldi’s customer service AI agent is designed to meet and exceed those expectations by delivering consistent, high-quality interactions at scale.'
    ),
    bullets: [
      t(
        'products.customerServiceAgent.why.sections.1.bullets.0',
        'Natural conversational understanding that feels human and intuitive'
      ),
      t(
        'products.customerServiceAgent.why.sections.1.bullets.1',
        'Instant automated responses for frequently asked questions and common issues'
      ),
      t(
        'products.customerServiceAgent.why.sections.1.bullets.2',
        'Intelligent routing and seamless escalation to human agents when needed'
      ),
      t(
        'products.customerServiceAgent.why.sections.1.bullets.3',
        'Persistent memory and context tracking for multi-step, multi-turn conversations'
      ),
      t(
        'products.customerServiceAgent.why.sections.1.bullets.4',
        'Omnichannel support across voice, live chat, email, and messaging platforms'
      ),
    ],
    body: [
      t(
        'products.customerServiceAgent.why.sections.1.body.0',
        'These AI agents for customer service reduce friction at every stage of the customer journey. They minimize wait times, eliminate repetitive workloads, and ensure customers receive timely and relevant support, all without increasing operational costs or team size.'
      ),
      t(
        'products.customerServiceAgent.why.sections.1.body.1',
        'As your business grows, the system scales effortlessly, maintaining service quality even during peak demand.'
      ),
    ],
    visual: '/images/customer-service-agent/why-2.png',

    reverse: true,
  },
];

export const Why = () => {
  return (
    <section className={st.layout}>
      <div className={st.inner}>
        <div className={st.header}>
          <motion.h2
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {t(
              'products.customerServiceAgent.why.title',
              'The Best Solution for AI Customer Service'
            )}
          </motion.h2>
        </div>

        <div className={st.sections}>
          {sections.map((section, index) => (
            <div key={section.title} className={`${st.split} ${section.reverse ? st.reverse : ''}`}>
              <motion.div
                className={st.card}
                variants={blurInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index * 0.1}
              >
                <h3>{section.title}</h3>
                {section.intro && <p className={st.lead}>{section.intro}</p>}
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </motion.div>

              <motion.div
                className={st.visualWrap}
                variants={blurInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index * 0.1 + 0.1}
              >
                <Image
                  src={section.visual as string}
                  alt={imageAlt('customerServiceAgent')}
                  width={564}
                  height={564}
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
