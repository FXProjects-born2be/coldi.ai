'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { RequestDialog } from '@/features/request-leads-demo/ui/request-dialog/RequestDialog';

import { imageAlt } from '@/shared/constants/page-image-alt';
import { blurInUp } from '@/shared/lib/helpers';

import st from './Hero.module.scss';

const pageAlt = imageAlt('aiForQualityControl');

export const Hero = () => {
  return (
    <section className={st.layout} id="demo">
      <div className={st.content}>
        <div className={st.copy}>
          <motion.h1
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span>AI-Powered Call Monitoring</span>: The Future of Automated Quality Control
          </motion.h1>

          <motion.p
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Transform your operational oversight with our fully configurable, AI-driven QC system.
            Designed for modern sales and support teams, our solution automatically reviews, scores,
            and analyzes every conversation, whether handled by AI agents or human representatives.
          </motion.p>
        </div>

        <motion.div
          className={st.formCard}
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className={st.formTop}>
            <h2>Book a Demo</h2>
            <Image src="/full-logo.svg" alt={`${pageAlt} Coldi logo`} width={93} height={32} />
          </div>
          <RequestDialog />
        </motion.div>
      </div>
    </section>
  );
};
