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
        <h1>{heroContent.title}</h1>
      </motion.div>
    </section>
  );
};
