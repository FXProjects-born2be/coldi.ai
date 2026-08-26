'use client';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers';

import { BotCard } from '../bot-card/BotCard';
import st from './Hear.module.scss';

export const Hear = () => {
  return (
    <section className={st.layout}>
      <motion.div
        className={st.heading}
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2>See HVAC Voice in Action</h2>
      </motion.div>

      <motion.div
        className={st.cardWrap}
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <BotCard />
      </motion.div>
    </section>
  );
};
