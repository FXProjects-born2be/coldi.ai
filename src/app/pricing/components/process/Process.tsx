'use client';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers';

import st from './Process.module.scss';

import { processSteps } from '@/app/pricing/model/content';

export const Process = () => {
  return (
    <section className={st.layout}>
      <motion.h2
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        The Coldi Process: How It Works
      </motion.h2>
      <div className={st.grid}>
        {processSteps.map((step) => (
          <motion.article
            key={step.number}
            className={st.card}
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className={st.badge}>{step.number}</div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
};
