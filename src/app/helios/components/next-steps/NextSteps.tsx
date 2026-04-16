'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers';

import { nextSteps } from '../data';
import st from './NextSteps.module.scss';

export const NextSteps = () => {
  return (
    <section className={st.layout}>
      <div className={st.inner}>
        <motion.div
          className={st.header}
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className={st.badge}>{nextSteps.label}</span>
          <h2>{nextSteps.title}</h2>
          <p>{nextSteps.description}</p>
        </motion.div>

        <div className={st.grid}>
          {nextSteps.items.map((item, index) => (
            <motion.article
              key={item.title}
              className={st.card}
              variants={blurInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index * 0.08}
            >
              <div className={st.iconWrap}>
                <Image src={item.icon} alt={item.alt} width={48} height={48} unoptimized />
              </div>
              <div className={st.copy}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
