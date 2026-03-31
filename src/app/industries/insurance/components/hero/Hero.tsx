'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { RequestDialog } from '@/features/request-leads-demo/ui/request-dialog/RequestDialog';

import { IMAGE_ALT } from '@/shared/constants/page-image-alt';
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
          <span>AI</span> Insurance Agents
        </motion.h1>
        <motion.p
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          AI-powered calling agents built for insurance operations help companies answer more
          policyholder calls, streamline claims communication, and deliver faster support across
          inbound and outbound interactions. More calls are handled automatically.
        </motion.p>
        <motion.p
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Faster responses to claim. A smoother experience for policyholders.
        </motion.p>
        <motion.p
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          AI-powered calling agents built for insurance operations.
        </motion.p>
        <motion.p
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          More calls are handled automatically. Faster responses to claim. A smoother experience for
          policyholders.
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
          <Image
            src="/full-logo.svg"
            alt={`${IMAGE_ALT.insurance} — Coldi logo`}
            width={93}
            height={32}
            unoptimized
          />
        </div>
        <div className={st.bottom}>
          <RequestDialog />
        </div>
      </motion.div>
    </section>
  );
};
