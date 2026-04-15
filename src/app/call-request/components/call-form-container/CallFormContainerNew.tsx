'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { RequestDialog } from '@/features/request-leads-demo/ui/request-dialog';

import { blurInUp } from '@/shared/lib/helpers/animations';

import st from './CallFormContainer.module.scss';

export const CallFormContainerNew = () => {
  return (
    <section className={st.layout}>
      <motion.div
        className={st.col}
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className={st.top}>
          <h1>Book a Demo</h1>
          <Image src="/full-logo.svg" alt="Book a Demo" width={93} height={32} unoptimized />
        </div>
        <div className={st.bottom}>
          <RequestDialog />
        </div>
      </motion.div>
    </section>
  );
};
