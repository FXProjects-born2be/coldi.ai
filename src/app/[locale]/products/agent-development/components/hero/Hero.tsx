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
      <div className={st.content}>
        <div className={st.col1}>
          <motion.h1
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span>AI</span> Agent Development
          </motion.h1>
          <motion.p
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Premium <strong>AI Agent Development services</strong> designed to help businesses
            automate conversations, elevate customer engagement, and launch intelligent voice
            solutions with expert execution, not just code. Coldi AI delivers bespoke conversational
            solutions, fully configured and supported by our team, so you get outcomes, not just
            technology.
          </motion.p>
          <motion.p
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            We create custom agents that understand context, carry natural conversations, and drive
            real business value.
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
              alt={`${IMAGE_ALT.agentDevelopment} - Coldi logo`}
              width={93}
              height={32}
              unoptimized
            />
          </div>
          <RequestDialog />
        </motion.div>
      </div>
    </section>
  );
};
