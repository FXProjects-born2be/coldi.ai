'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { RequestDialog } from '@/features/request-leads-demo/ui/request-dialog/RequestDialog';

import { blurInUp } from '@/shared/lib/helpers';

import st from './Hero.module.scss';

export const Hero = () => {
  return (
    <section className={st.layout} id="demo">
      <div className={st.col1}>
        <motion.h1
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span>AI Agents</span> for <br />
          Debt Collection
        </motion.h1>
        <motion.p
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          AI agents for financial institutions, lenders, and collection agencies:
        </motion.p>
        <motion.ul
          className={st.bullets}
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <li>Repayment recovery</li>
          <li>Automate debtor communication</li>
          <li>Scale credit and debt collection services</li>
        </motion.ul>
        <motion.p
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Without increasing operational costs.
        </motion.p>
      </div>
      <motion.div
        className={st.col2}
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className={st.top}>
          <h3>Book a Demo</h3>
          <Image src="/full-logo.svg" alt="Book a Demo" width={93} height={32} unoptimized />
        </div>
        <div className={st.bottom}>
          <RequestDialog />
        </div>
      </motion.div>
    </section>
  );
};
