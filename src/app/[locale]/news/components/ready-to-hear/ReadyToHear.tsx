'use client';
import Link from 'next/link';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers/animations';
import { Button } from '@/shared/ui/kit/button';

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
              Ready to go?
            </motion.h2>
          </section>
          <motion.p
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={st.desc}
          >
            Explore Coldi voices and find your perfect call agent!
          </motion.p>
        </div>
        <Link href="/call-request" className={st.button}>
          <motion.div
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Button size="md">Get Started</Button>
          </motion.div>
        </Link>
        <video src="/videos/about/hero.mp4" autoPlay muted loop />
      </section>
    </>
  );
};
