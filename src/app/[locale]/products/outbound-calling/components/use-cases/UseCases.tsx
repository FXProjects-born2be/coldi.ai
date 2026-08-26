'use client';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers';

import st from './UseCases.module.scss';

const helpsItems = [
  'Automate outbound sales calls',
  'Qualify leads before human reps intervene',
  'Increase outbound contact rates',
  'Reduce operational costs',
  'Run AI outbound calling campaigns at scale',
];

const searchItems = [
  'AI outbound calling',
  'AI outbound calling agents',
  'AI outbound sales calls',
  'Best voice AI for outbound sales calls',
  'Conversational AI for outbound calls',
];

export const UseCases = () => {
  return (
    <section className={st.layout}>
      <div className={st.header}>
        <motion.h2
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Can AI agents make outbound calls?
        </motion.h2>
        <motion.p
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Yes — and they scale better than manual teams. AI outbound calling is changing how sales
          teams generate pipeline.
        </motion.p>
      </div>

      <motion.div
        className={st.wrapper}
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className={st.columns}>
          <div className={st.column}>
            <h3>COLDI helps businesses</h3>
            <div className={st.tags}>
              {helpsItems.map((item) => (
                <span key={item} className={st.tag}>
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className={st.column}>
            <h3>Whether you are searching for</h3>
            <div className={st.tags}>
              {searchItems.map((item) => (
                <span key={item} className={st.tag}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
        <p className={st.footer}>This platform is built exactly for those use cases</p>
      </motion.div>
    </section>
  );
};
