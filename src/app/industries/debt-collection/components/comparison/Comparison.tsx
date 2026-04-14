'use client';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers';

import st from './Comparison.module.scss';

type Row = {
  feature: string;
  without: string;
  withColdi: string;
};

const rows: Row[] = [
  {
    feature: 'Outreach Capacity',
    without: 'Limited by staff availability',
    withColdi: 'Thousands of automated calls daily',
  },
  {
    feature: 'Payment Reminders',
    without: 'Manual calling required',
    withColdi: 'Automated and scheduled',
  },
  {
    feature: 'First-Call Resolution',
    without: 'Multiple follow-ups needed',
    withColdi: 'High with AI-driven negotiation',
  },
  {
    feature: 'CRM Updates',
    without: 'Manual data entry',
    withColdi: 'Automatic logging',
  },
  {
    feature: 'Compliance Consistency',
    without: 'Risk of inconsistent communication',
    withColdi: 'Pre-programmed scripts and verification',
  },
  {
    feature: 'Language Coverage',
    without: 'Limited by staff language skills',
    withColdi: '30+ languages',
  },
  {
    feature: 'Scalability',
    without: 'Requires hiring more agents',
    withColdi: 'Unlimited concurrent calls',
  },
];

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="12" fill="#FF295D" />
      <path
        d="M8.5 8.5L15.5 15.5M15.5 8.5L8.5 15.5"
        stroke="white"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="12" fill="#3DDA7A" />
      <path
        d="M7.5 12L10.5 15L16.5 9"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 3L14.461 8.32L20.286 9.055L16 13.086L17.124 18.945L12 16.08L6.876 18.945L8 13.086L3.714 9.055L9.539 8.32L12 3Z"
        fill="#4268FF"
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
        className={st.stage}
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <article className={st.cardWithout}>
          <div className={st.cardInner}>
            <div className={st.cardHeader}>
              <span>Without Coldi.ai</span>
              <CloseIcon />
            </div>
            <div className={st.divider} />
            {rows.map((row) => (
              <p key={row.feature} className={st.cellWithout}>
                {row.without}
              </p>
            ))}
          </div>
        </article>

        <article className={st.cardWith}>
          <div className={st.cardInner}>
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
        </article>

        <article className={st.cardFeature}>
          <div className={st.cardInner}>
            <div className={st.cardHeader}>
              <span>Feature</span>
              <StarIcon />
            </div>
            <div className={st.divider} />
            {rows.map((row) => (
              <p key={row.feature + '-feature'} className={st.cellFeature}>
                {row.feature}
              </p>
            ))}
          </div>
        </article>
      </motion.div>
    </section>
  );
};
