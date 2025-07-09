'use client';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers/animations';

import st from './Reviews.module.scss';
import { ReviewsSlider } from './ReviewsSlider';

export const Reviews = () => {
  return (
    <section className={st.layout}>
      <motion.h2
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Clients Say
      </motion.h2>
      <motion.div
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <ReviewsSlider />
      </motion.div>
    </section>
  );
};
