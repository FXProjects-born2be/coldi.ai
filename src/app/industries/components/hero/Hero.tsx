'use client';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers';

import st from './Hero.module.scss';

export const Hero = () => {
  return (
    <section className={st.layout}>
      <motion.h1
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        AI Voice Solution for{'\n'}more than 10 industries
      </motion.h1>
      <motion.p
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Explore AI voice solutions for more than 10 industries. Purpose-built agents to scale
        operations and handle 5,000+ minutes monthly
      </motion.p>
    </section>
  );
};
