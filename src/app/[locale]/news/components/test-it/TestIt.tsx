'use client';
import Link from 'next/link';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers/animations';
import { Button } from '@/shared/ui/kit/button';

import st from './TestIt.module.scss';

export const TestIt = ({}) => {
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
              Think AI Can’t Handle Your Calls? Test It.
            </motion.h2>
          </section>
          <motion.p
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={st.desc}
          >
            Enter your number. Coldi will call in seconds.
          </motion.p>
        </div>
        <Link href="/call-request" className={st.button}>
          <motion.div
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Button size="md">Get a Call</Button>
          </motion.div>
        </Link>
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
