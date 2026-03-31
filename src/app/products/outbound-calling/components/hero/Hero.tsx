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
          <span>AI</span> Outbound Calling
        </motion.h1>
        <motion.p
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          AI Voice Agents trained to qualify leads and handoff opportunities to your sales team.
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
            alt={`${IMAGE_ALT.outboundCalling} — Coldi logo`}
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
