'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { imageAlt } from '@/shared/constants/page-image-alt';
import { blurInUp } from '@/shared/lib/helpers';

import st from './Why.module.scss';

const bullets = [
  'Complete setup, deployment, and optimization handled by the Coldi team',
  'Integrations with your CRM platforms, telephony systems, and workflow engines configured for you',
  'Call flows, escalation logic, and performance tuning designed by specialists',
  'No in\u2011house IT resources or technical expertise required',
  'Your call center agents focus on strategic tasks while Coldi maintains the AI infrastructure',
];

export const Why = () => {
  return (
    <section className={st.layout}>
      <motion.h2
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Why AI Agents in Call Centers
      </motion.h2>

      <motion.div
        className={st.row}
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className={st.card}>
          <h3>Fully Managed — No IT Team Required</h3>
          <ul className={st.bullets}>
            {bullets.map((bullet) => (
              <li key={bullet}>
                <span className={st.dot} />
                {bullet}
              </li>
            ))}
          </ul>
        </div>

        <div className={st.visualWrap}>
          <Image
            src="/images/call-center/why.png"
            alt={imageAlt('callCenter', 'Fully managed setup — no IT team required')}
            width={564}
            height={564}
            unoptimized
          />
        </div>
      </motion.div>
    </section>
  );
};
