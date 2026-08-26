'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers';

import st from './Future.module.scss';

const bullets = [
  'Automate customer support and repetitive tasks',
  'Elevate engagement through natural speech and dialogue',
  'Reduce operational workload with intelligent automation',
  'Scale voice-enabled experiences without increasing headcount',
];

export const Future = () => {
  return (
    <section className={st.layout}>
      <div className={st.inner}>
        <motion.article
          className={st.card}
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2>Future-Ready AI Agents for Modern Businesses</h2>
          <p className={st.lead}>Coldi&apos;s development services empower organizations to:</p>
          <ul>
            {bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          <p className={st.summary}>
            From concept to deployment and beyond, Coldi AI is your AI agent development company
            that turns ambition into reality.
          </p>
        </motion.article>

        <motion.div
          className={st.visualWrap}
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Image
            src="/images/agent-development/built-for-growth.png"
            alt="AI Agent Development services"
            width={564}
            height={564}
            className={st.visual}
            unoptimized
          />
        </motion.div>
      </div>
    </section>
  );
};
