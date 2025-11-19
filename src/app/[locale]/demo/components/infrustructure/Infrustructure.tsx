'use client';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers/animations';

import st from './Infrustructure.module.scss';

export const Infrustructure = () => {
  return (
    <section className={st.layout}>
      <div className={st.row}>
        <div className={st.col}>
          <motion.h3
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Global Telephony Infrastructure
          </motion.h3>
          <motion.p
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Coldi operates a fully managed, high-quality telephony network across dozens of
            countries. You can choose to use your own telephony provider (such as Twilio,
            RingCentral, Aircall), or use Coldi’s infrastructure with localized landline access.
            Telephony rates vary by region and traffic volume, and our team will assist in choosing
            the most efficient and cost-effective setup for your needs.
          </motion.p>
        </div>
        <motion.div
          className={st.video}
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <video
            src="/videos/pricing/infrustructure.mp4"
            autoPlay
            playsInline
            muted
            loop
            preload="auto"
            controls={false}
          />
        </motion.div>
      </div>
    </section>
  );
};
