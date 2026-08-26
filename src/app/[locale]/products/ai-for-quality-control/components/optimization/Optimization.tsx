'use client';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers';

import st from './Optimization.module.scss';

const items = [
  {
    title: 'Root Cause Identification',
    description: 'Understand why defects happen, not just that they happened.',
  },
  {
    title: 'Corrective Recommendations',
    description: 'Data-driven insights to help adjust machinery settings on the fly.',
  },
  {
    title: 'Eliminating Rework',
    description: 'Maximize your first pass yield and keep the line moving.',
  },
  {
    title: 'Proactive Efficiency',
    description: 'Shift from reactive sorting to a proactive, predictive QA model.',
  },
];

export const Optimization = () => {
  return (
    <section className={st.layout}>
      <motion.div
        className={st.header}
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2>Intelligent Process Optimization</h2>
        <p>
          Coldi does not just flag errors. It transforms your operation into a smart ecosystem{' '}
          <br />
          with recommendations your team can actually act on.
        </p>
      </motion.div>

      <div className={st.grid}>
        {items.map((item, index) => (
          <motion.article
            key={item.title}
            className={st.card}
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={index * 0.08}
          >
            <div className={st.number}>0{index + 1}</div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
};
