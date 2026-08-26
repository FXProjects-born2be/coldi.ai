'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { RequestDialog } from '@/features/request-leads-demo/ui/request-dialog/RequestDialog';

import { imageAlt } from '@/shared/constants/page-image-alt';
import { blurInUp } from '@/shared/lib/helpers';

import st from './Hero.module.scss';

const bullets = [
  {
    label: 'Action, Not Just Chat:',
    text: 'AI agents that understand intent and resolve complex tasks through deep system integration.',
  },
  {
    label: 'End-to-End Execution:',
    text: 'We handle the full deployment and optimization, no DIY required.',
  },
  {
    label: '24/7 Precision:',
    text: 'Reliable, 100% automated resolution that learns and improves with every interaction.',
  },
  {
    label: 'Strategic Growth:',
    text: 'More than a tool, a long-term partner to scale your customer experience.',
  },
];

export const Hero = () => {
  return (
    <section className={st.layout} id="demo">
      <div className={st.content}>
        <div className={st.col1}>
          <motion.h1
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span>AI</span> Customer Service Agent
          </motion.h1>
          <motion.p
            className={st.description}
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Transform your customer service with AI agents that do more than just talk, they
            execute.
          </motion.p>
          <motion.ul
            className={st.bullets}
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {bullets.map((bullet) => (
              <li key={bullet.label}>
                <span className={st.dot} />
                <p>
                  <strong>{bullet.label}</strong> {bullet.text}
                </p>
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          className={st.col2}
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className={st.top}>
            <h3>Book a Demo</h3>
            <Image
              src="/full-logo.svg"
              alt={imageAlt('customerServiceAgent')}
              width={93}
              height={32}
              unoptimized
            />
          </div>
          <RequestDialog />
        </motion.div>
      </div>
    </section>
  );
};
