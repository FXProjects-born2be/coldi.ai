'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { RequestDialog } from '@/features/request-leads-demo/ui/request-dialog/RequestDialog';

import { blurInUp } from '@/shared/lib/helpers';

import st from './Hero.module.scss';

const bullets = ['Instant Response.', 'Real-Time Automation.', 'Smart Routing.'];

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
          <span>AI</span> Inbound Calling
        </motion.h1>
        <motion.p
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          AI inbound calling systems allow businesses to handle every customer inquiry instantly
          without the overhead of a traditional call center.
        </motion.p>
        <motion.ul
          className={st.bullets}
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {bullets.map((bullet) => (
            <li key={bullet}>
              <span className={st.dot} />
              {bullet}
            </li>
          ))}
        </motion.ul>
        <motion.p
          className={st.summary}
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          The result is a superior caller experience with faster resolutions and zero missed leads.
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
