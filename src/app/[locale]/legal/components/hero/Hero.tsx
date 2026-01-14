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
              Legal
            </motion.h2>
          </section>
          <motion.p
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={st.desc}
          >
            Access all official legal documents and policies for our <br />
            company. Download or view the latest versions of our <br />
            agreements.
          </motion.p>
        </div>
      </section>
    </>
  );
};
