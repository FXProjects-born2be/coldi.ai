'use client';

import Link from 'next/link';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers';
import { Button } from '@/shared/ui/kit/button/Button';

import st from './Hero.module.scss';

export const Hero = () => {
  return (
    <>
      <section className={st.layout} id="demo">
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
            More booked calls. Less manual work. <br />
            Zero missed opportunities.
          </motion.p>
          <motion.div
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={st.button}
          >
            <Link href="/calendar">
              <Button size="md">Book a Demo</Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};
