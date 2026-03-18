'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers';

import st from './Why.module.scss';

const bullets = [
  'Complete setup and deployment handled by the Coldi team',
  'Integrations with CRM platforms, policy management systems, and telephony configured for you',
  'Call workflows, underwriting logic, and performance optimization designed by specialists',
  'No in-house IT resources or technical expertise required',
  'Your insurance agents focus on customers while we operate and maintain the AI calling infrastructure',
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
        Why Coldi for AI Agents in Insurance
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
            src="/images/insurance-agents/why.svg"
            alt="Fully managed setup"
            width={564}
            height={564}
            unoptimized
          />
        </div>
      </motion.div>
    </section>
  );
};
