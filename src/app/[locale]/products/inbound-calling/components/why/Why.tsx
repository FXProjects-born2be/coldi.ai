'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { imageAlt } from '@/shared/constants/page-image-alt';
import { blurInUp } from '@/shared/lib/helpers';

import st from './Why.module.scss';

const bullets = [
  'Complete setup and deployment handled entirely by the Coldi team.',
  'Integrations with CRM platforms, help desks, and existing telephony systems configured for your workflow.',
  'Call routing logic, intent recognition, and performance optimization designed by our voice AI specialists.',
  'No in-house IT resources or technical expertise required to launch your automated contact center.',
  'Your team focuses on high-value tasks while we operate and maintain the AI voice infrastructure.',
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
        Why AI Inbound Call Solutions
      </motion.h2>

      <motion.div
        className={st.row}
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className={st.card}>
          <h3>Fully Managed - No Technical Team Needed</h3>
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
            src="/images/inbound-calling/why.png"
            alt={imageAlt('inboundCalling', 'Fully managed setup — no technical team needed')}
            width={564}
            height={564}
            unoptimized
          />
        </div>
      </motion.div>
    </section>
  );
};
