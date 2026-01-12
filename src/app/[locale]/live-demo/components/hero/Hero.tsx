'use client';
import Image from 'next/image';

import { motion } from 'framer-motion';

import { RequestDialog } from '@/features/request-live-demo/ui/request-dialog/RequestDialog';

import { blurInUp } from '@/shared/lib/helpers/animations';

import st from './Hero.module.scss';

export const Hero = () => {
  return (
    <>
      <section className={st.layout}>
        <div className={st.top}>
          <Image src="/landing-logo.svg" alt="Coldi Live" width={330} height={50} unoptimized />
        </div>
        <div className={st.header}>
          <section className={st.title}>
            <motion.h2
              variants={blurInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              Experience Coldi Live
            </motion.h2>
          </section>
          <motion.p
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={st.desc}
          >
            Enter your phone number and receive a live call from a Coldi AI voice agent.
          </motion.p>
          <RequestDialog />
        </div>

        <div className={st.footer}>
          <p>This call is powered by Coldi AI voice technology.</p>
        </div>
      </section>
    </>
  );
};
