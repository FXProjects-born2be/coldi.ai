'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { RequestDialog } from '@/features/request-leads-demo/ui/request-dialog/RequestDialog';

import { imageAlt } from '@/shared/constants/page-image-alt';
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
          VoIP Phone Service
        </motion.h1>

        <motion.div
          className={st.copy}
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p>
            A modern <strong>VoIP phone service</strong> built for businesses that need reliable
            communication, global reach, and intelligent automation. Coldi AI combines voice
            infrastructure with AI-powered call handling to deliver a complete, fully managed
            solution, not just another VoIP tool.
          </p>
          <p>
            Make and receive calls anywhere. Automate conversations. Scale communication without
            increasing headcount.
          </p>
        </motion.div>
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
            alt={imageAlt('voipPhoneService')}
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
