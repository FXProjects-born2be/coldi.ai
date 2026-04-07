'use client';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers';

import st from './Hero.module.scss';

export const Hero = () => {
  return (
    <section className={st.layout}>
      <motion.div
        className={st.content}
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h1>
          <span>Meet the Minds</span>
          <span>Behind the Engine</span>
        </h1>
        <p>
          In the heart of every intelligent interaction is a team committed to operational
          excellence. We don&apos;t just build technology; we design the bridge between your
          business strategy and automated execution.
        </p>
      </motion.div>
    </section>
  );
};
