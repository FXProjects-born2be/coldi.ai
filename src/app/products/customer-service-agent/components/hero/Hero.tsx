'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { RequestDialog } from '@/features/request-leads-demo/ui/request-dialog/RequestDialog';

import { IMAGE_ALT } from '@/shared/constants/page-image-alt';
import { blurInUp } from '@/shared/lib/helpers';

import st from './Hero.module.scss';

const t = (key: string, fallback: string) => fallback;

const bullets = [
  {
    label: t('products.customerServiceAgent.hero.bullets.0.label', 'Action, Not Just Chat:'),
    text: t(
      'products.customerServiceAgent.hero.bullets.0.text',
      'AI agents that understand intent and resolve complex tasks through deep system integration.'
    ),
  },
  {
    label: t('products.customerServiceAgent.hero.bullets.1.label', 'End-to-End Execution:'),
    text: t(
      'products.customerServiceAgent.hero.bullets.1.text',
      'We handle the full deployment and optimization, no DIY required.'
    ),
  },
  {
    label: t('products.customerServiceAgent.hero.bullets.2.label', '24/7 Precision:'),
    text: t(
      'products.customerServiceAgent.hero.bullets.2.text',
      'Reliable, 100% automated resolution that learns and improves with every interaction.'
    ),
  },
  {
    label: t('products.customerServiceAgent.hero.bullets.3.label', 'Strategic Growth:'),
    text: t(
      'products.customerServiceAgent.hero.bullets.3.text',
      'More than a tool, a long-term partner to scale your customer experience.'
    ),
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
            <span>{t('products.customerServiceAgent.hero.titleAccent', 'AI')}</span>{' '}
            {t('products.customerServiceAgent.hero.title', 'Customer Service Agent')}
          </motion.h1>
          <motion.p
            className={st.description}
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {t(
              'products.customerServiceAgent.hero.description',
              'Transform your customer service with AI agents that do more than just talk, they execute.'
            )}
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
              alt={`${IMAGE_ALT.customerServiceAgent} - Coldi logo`}
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
