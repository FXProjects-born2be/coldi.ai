'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { imageAlt } from '@/shared/constants/page-image-alt';
import { blurInUp } from '@/shared/lib/helpers';

import st from './Multilingual.module.scss';

export const Multilingual = () => {
  return (
    <section className={st.layout}>
      <motion.div
        className={st.card}
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className={st.content}>
          <h2>
            Multilingual <span className={st.highlight}>Outbound Calling</span>
          </h2>
          <div className={st.body}>
            <p>
              Run multilingual outbound calls with AI Voice Agents and collect insights at scale —
              without manual calling.
            </p>
            <p>
              Our platform lets you launch campaigns across 30+ languages, automatically calling
              leads or customers, asking structured questions, and capturing responses in real time.
            </p>
            <p>
              From customer feedback to market research and large-scale data collection, AI-powered
              calling helps you gather better insights faster, with higher response rates and lower
              operational effort.
            </p>
          </div>
        </div>
        <div className={st.illustration}>
          <Image
            src="/images/outbound/multilingual.svg"
            alt={imageAlt('outboundCalling', 'Multilingual outbound calling illustration')}
            width={357}
            height={352}
            unoptimized
          />
        </div>
      </motion.div>
    </section>
  );
};
