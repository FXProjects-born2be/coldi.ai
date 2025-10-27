'use client';
import Image from 'next/image';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers/animations';

import st from './Tools.module.scss';

const card = [
  '/images/home/tools/twilio.svg',
  '/images/home/tools/hubspot.svg',
  '/images/home/tools/housecall.svg',
  '/images/home/tools/n8n.svg',
  '/images/home/tools/calendly.svg',
  '/images/home/tools/slack.svg',
  '/images/home/tools/zapier.svg',
  '/images/home/tools/google-sheets.svg',
  '/images/home/tools/bluefield.png',
];

export const Tools = () => (
  <section className={st.layout}>
    <motion.h2 variants={blurInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      Coldi is already integrated <br />{' '}
      <span className={st.highlighted}>with leading business tools</span>
    </motion.h2>
    <section className={st.cards}>
      {card.map((item) => (
        <div key={item} className={st.card}>
          <Image src={item} alt={item} width={100} height={100} unoptimized />
        </div>
      ))}
    </section>
  </section>
);
