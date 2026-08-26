'use client';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers';

import st from './Hero.module.scss';

export const Hero = () => {
  return (
    <section className={st.layout}>
      <div className={st.header}>
        <section className={st.title}>
          <motion.h1
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Simple Pricing. Scalable Power.
          </motion.h1>
        </section>
        <motion.p
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={st.desc}
        >
          Choose the plan that fits your stage - whether you&apos;re just testing or scaling full
          operations.
        </motion.p>
      </div>
    </section>
  );
};
