'use client';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers/animations';

import st from './ReadyToHear.module.scss';

export const ReadyToHear = () => {
  return (
    <>
      <section className={st.layout}>
        <div className={st.header}>
          <section className={st.title}>
            <motion.h2
              variants={blurInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              Why Coldi?
            </motion.h2>
          </section>
          <motion.p
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={st.desc}
          >
            Most AI agents fail in the implementation phase - they’re handed off without support,
            missing context, and never reach real-world performance. <br />
            <br />
            Coldi is different. We handle every step - script development, technical setup,
            telephony integration, testing, optimization, and support. You don’t need to hire,
            build, or manage anything. We deliver fully functioning, results-driven AI voice agents
            that simply work.
          </motion.p>
        </div>
        <video src="/videos/about/hero.mp4" autoPlay muted loop />
      </section>
    </>
  );
};
