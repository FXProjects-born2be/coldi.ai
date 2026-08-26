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
          {heroContent.title[0]} <span>{heroContent.title[1]}</span>
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
