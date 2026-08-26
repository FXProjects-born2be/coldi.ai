'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { imageAlt } from '@/shared/constants/page-image-alt';
import { blurInUp } from '@/shared/lib/helpers';

import st from './Why.module.scss';

const bullets = [
  'Compliance & Script Adherence: Ensure every legal disclaimer and brand guideline is followed.',
  'Lead Qualification: Automatically identify high-intent prospects based on custom criteria.',
  'Soft Skills & Tone: Analyze sentiment, empathy, and objection-handling effectiveness.',
  'Custom KPIs: From "competitor mentions" to "technical proficiency," the system adapts to your needs.',
];

export const Why = () => {
  return (
    <section className={st.layout}>
      <div className={st.inner}>
        <motion.div
          className={st.card}
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2>Tailored Intelligence for Your Business</h2>
          <p className={st.lead}>
            Stop guessing and start measuring. Our system is built around your specific priorities.
            You define the criteria that matter most to your bottom line:
          </p>
          <ul>
            {bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className={st.visualWrap}
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Image
            src="/images/ai-for-quality-control/hero-visual.png"
            alt={imageAlt('aiForQualityControl')}
            width={564}
            height={564}
            unoptimized
          />
        </motion.div>
      </div>
    </section>
  );
};
