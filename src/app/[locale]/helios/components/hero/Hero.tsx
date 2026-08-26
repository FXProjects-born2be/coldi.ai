'use client';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers';

import { overview } from '../data';
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
        <span className={st.badge}>{overview.label}</span>
        <h1>
          <span>Helios</span> - Scaling Performance & Slashing Operational Costs with Conversational
          AI
        </h1>
      </motion.div>
    </section>
  );
};
