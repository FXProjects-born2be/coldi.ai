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
          <span>AI</span> Real Estate Agents
        </motion.h1>
        <motion.p
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          AI-powered voice agents built for real estate operations help agencies and independent
          realtors manage more property inquiries, streamline lead qualification, and deliver
          instant support across every listing. More showings scheduled. Faster response to buyer
          inquiries. A seamless experience for sellers.
        </motion.p>
        <motion.p
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          AI voice agents automate essential real estate conversations, such as lead screening,
          appointment setting, and property detail requests while maintaining a natural,
          professional, and human-like dialogue.
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
