'use client';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers/animations';

import st from './Hero.module.scss';

export const Hero = () => {
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
              Coldi Community & News
            </motion.h2>
          </section>
          <motion.p
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={st.desc}
          >
            Media buzz, product updates, and real-world impact - follow <br />
            the rise of human-sounding AI callers built to convert.
          </motion.p>
        </div>
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
