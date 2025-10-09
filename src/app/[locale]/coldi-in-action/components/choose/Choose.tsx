'use client';
import Link from 'next/link';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers/animations';
import { Button } from '@/shared/ui/kit/button';

import st from './Choose.module.scss';

export const Choose = () => {
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
              <span className={st.highlighted}>Choose Your Plan</span>
            </motion.h2>
          </section>
        </div>
        <div className={st.buttons}>
          <Link href="/pricing" className={st.button}>
            <motion.div
              variants={blurInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Button size="md">Check Pricing</Button>
            </motion.div>
          </Link>
          <Link href="/call-request" className={st.button}>
            <motion.div
              variants={blurInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Button size="md">Talk to Coldi</Button>
            </motion.div>
          </Link>
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
