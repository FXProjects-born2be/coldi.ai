'use client';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers';

import { heroContent } from '../data';
import st from './Hero.module.scss';

export const Hero = () => {
  return (
    <section className={st.layout}>
      <motion.div
        className={st.inner}
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <span className={st.badge}>{heroContent.label}</span>
        <h1>
          Strategic Partnership Case Study:
          <br />
          <span>Silverbell Group &amp; Coldi.ai</span>
        </h1>
        <div className={st.copy}>
          {heroContent.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
