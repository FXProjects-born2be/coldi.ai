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
              <span className={st.highlighted}>Ready to Hear </span>
              <br />
              What Coldi Can Do?
            </motion.h2>
          </section>
          <motion.p
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={st.desc}
          >
            The best way to understand Coldi is to try it. <br />
            See how seamlessly it can fit into your operations - and how quickly it starts making a
            difference.
          </motion.p>
        </div>
        <Link href="/call-request" className={st.button}>
          <motion.div
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Button size="md">Try Now</Button>
          </motion.div>
        </Link>
        <video src="/videos/about/hero.mp4" autoPlay muted loop />
      </section>
    </>
  );
};
