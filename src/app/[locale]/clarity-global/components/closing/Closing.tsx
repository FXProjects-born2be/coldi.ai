'use client';

import Link from 'next/link';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers';

import { closingSection } from '../data';
import st from './Closing.module.scss';

export const Closing = () => {
  return (
    <section className={st.layout}>
      <motion.div
        className={st.inner}
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2>{closingSection.title}</h2>
        <p>{closingSection.description}</p>
        <Link href={closingSection.ctaHref} className={st.cta}>
          {closingSection.ctaLabel}
        </Link>
      </motion.div>
    </section>
  );
};
