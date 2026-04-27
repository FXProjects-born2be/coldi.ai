'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers';

import { overview } from '../data';
import st from './Overview.module.scss';

export const Overview = () => {
  return (
    <section className={st.layout}>
      <div className={st.inner}>
        <motion.article
          className={st.copy}
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2>Project Overview</h2>
          <p dangerouslySetInnerHTML={{ __html: overview.description }} />
        </motion.article>

        <motion.div
          className={st.visualWrap}
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Image src="/images/use-cases/overview.svg" alt="Overview" width={564} height={564} />
        </motion.div>
      </div>
    </section>
  );
};
