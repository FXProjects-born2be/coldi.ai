'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { imageAlt } from '@/shared/constants/page-image-alt';
import { blurInUp } from '@/shared/lib/helpers';

import st from './Why.module.scss';

const bullets = [
  'Complete setup and deployment handled entirely by the Coldi team.',
  'Integrations with CRMs and telephony systems configured for your specific workflow.',
  'Call scripts, qualification logic, and lead-nurturing sequences designed by industry specialists.',
  'No in-house tech expertise required; we handle the "how" so you can handle the "who."',
  'Your realtors focus on closing deals while we operate and maintain your AI calling infrastructure.',
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
        Why AI Agents in Real Estate
      </motion.h2>

      <motion.div
        className={st.featureRow}
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className={st.card}>
          <h3>Fully Managed — No Technical Team Needed</h3>
          <ul className={st.bullets}>
            {bullets.map((bullet) => (
              <li key={bullet}>
                <span className={st.dot} />
                {bullet}
              </li>
            ))}
          </ul>
        </div>
        <div className={st.illustration}>
          <Image
            src="/images/real-estate/why-bg.png"
            alt={imageAlt('realEstate', 'Fully managed setup — no technical team needed')}
            width={564}
            height={564}
            unoptimized
            className={st.bgImage}
          />
          <div className={st.badges}>
            <div className={`${st.badge} ${st.badgeTopLeft}`}>
              <span className={st.badgeLabel}>Setup </span>
              <div className={st.badgeStatus}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="12" fill="rgba(61,236,130,0.15)" />
                  <path
                    d="M7 12L10.5 15.5L17 9"
                    stroke="#28bc62"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Completed </span>
              </div>
            </div>
            <div className={`${st.badge} ${st.badgeTopRight}`}>
              <span className={st.badgeLabel}>Integrations </span>
              <div className={st.badgeStatus}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="12" fill="rgba(61,236,130,0.15)" />
                  <path
                    d="M7 12L10.5 15.5L17 9"
                    stroke="#28bc62"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Completed </span>
              </div>
            </div>
            <div className={`${st.badge} ${st.badgeBottomLeft}`}>
              <span className={st.badgeLabel}>Call Logic </span>
              <div className={st.badgeStatus}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="12" fill="rgba(61,236,130,0.15)" />
                  <path
                    d="M7 12L10.5 15.5L17 9"
                    stroke="#28bc62"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Completed </span>
              </div>
            </div>
            <div className={`${st.badge} ${st.badgeBottomRight}`}>
              <span className={st.badgeLabel}>Live</span>
              <div className={st.badgeStatus}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="12" fill="rgba(61,236,130,0.15)" />
                  <path
                    d="M7 12L10.5 15.5L17 9"
                    stroke="#28bc62"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Active</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
