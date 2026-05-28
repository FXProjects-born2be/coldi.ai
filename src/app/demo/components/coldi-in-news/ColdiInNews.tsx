'use client';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers';

import st from './ColdiInNews.module.scss';

export const ColdiInNews = () => {
  return (
    <section className={st.layout}>
      <motion.h2
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={st.title}
      >
        Coldi Featured in News
      </motion.h2>
      <motion.div
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={st.brands}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={'/images/home/logos/bloomberg.svg'} />
        <img src={'/images/home/logos/entrepreneur.svg'} />
        <img src={'/images/home/logos/forbes.svg'} />
        <img src={'/images/home/logos/yahoo.svg'} />
      </motion.div>
    </section>
  );
};
