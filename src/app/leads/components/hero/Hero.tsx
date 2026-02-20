'use client';
import Image from 'next/image';

import { motion } from 'framer-motion';

import { RequestDialog } from '@/features/request-leads-demo/ui/request-dialog/RequestDialog';

import { blurInUp } from '@/shared/lib/helpers/animations';

import st from './Hero.module.scss';

export const Hero = () => {
  return (
    <>
      <section className={st.layout}>
        <div className={st.col1}>
          <motion.h1
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span>Stop Missing Sales Calls.</span> Hire AI Voice Agents for Your Business
          </motion.h1>
          <motion.p
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            More booked calls. Less manual work.
            <br />
            Zero missed opportunities.
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
        <video
          src="/videos/about/hero.mp4"
          autoPlay
          playsInline
          muted
          loop
          preload="auto"
          controls={false}
        />
      </section>
    </>
  );
};
