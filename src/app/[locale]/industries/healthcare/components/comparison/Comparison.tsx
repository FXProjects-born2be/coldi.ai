'use client';

import { motion } from 'framer-motion';

import { imageAlt } from '@/shared/constants/page-image-alt';
import { blurInUp } from '@/shared/lib/helpers';

import st from './Comparison.module.scss';

const rows = [
  {
    without: 'Limited by staff availability',
    withColdi: 'Instant, 24/7',
    category: 'Patient call response time',
  },
  {
    without: 'Multiple transfers',
    withColdi: 'High through AI triage',
    category: 'First-call resolution',
  },
  {
    without: 'Manual and slower',
    withColdi: 'Automated in real time',
    category: 'Appointment scheduling',
  },
  {
    without: 'Manual data entry',
    withColdi: 'Automatic logging',
    category: 'Call documentation',
  },
  {
    without: 'Limited capacity',
    withColdi: '30+ languages',
    category: 'Multilingual support',
  },
  {
    without: 'High pressure on teams',
    withColdi: 'Reduced',
    category: 'Operational workload',
  },
  {
    without: 'Hiring required',
    withColdi: 'Unlimited call volume',
    category: 'Scalability',
  },
];

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="12" fill="#FF4D4F" />
      <path d="M8 8L16 16M16 8L8 16" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="12" fill="#52C41A" />
      <path
        d="M7 12L10.5 15.5L17 9"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const Comparison = () => {
  return (
    <section className={st.layout}>
      <motion.h2
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <span className={st.highlight}>WITH US</span> VS WITHOUT US
      </motion.h2>

      <motion.div
        className={st.content}
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className={st.cardsWrap}>
          <div className={st.cardWithout}>
            <div className={st.cardHeader}>
              <span>Without Coldi.ai</span>
              <CloseIcon />
            </div>
            <div className={st.divider} />
            {rows.map((row) => (
              <p key={row.without} className={st.cellWithout}>
                {row.without}
              </p>
            ))}
          </div>

          <div className={st.cardWith}>
            <div className={st.cardHeaderWith}>
              <span>With Coldi.ai</span>
              <CheckIcon />
            </div>
            <div className={st.divider} />
            {rows.map((row) => (
              <p key={row.withColdi} className={st.cellWith}>
                {row.withColdi}
              </p>
            ))}
          </div>
        </div>

        <div className={st.categories}>
          {rows.map((row, index) => (
            <div key={row.category} className={st.categoryRow}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/images/healthcare/connector${index + 1}.svg`}
                alt={imageAlt('healthcare', `${row.category} — comparison connector`)}
                className={st[`connector-${index + 1}`]}
              />
              <span className={st.categoryLabel}>{row.category}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
