'use client';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers';

import st from './Workflow.module.scss';

const steps = [
  {
    number: '01',
    title: 'Automated Data Capture',
    description:
      'The system integrates directly with your existing telephony or CRM software to ingest recordings automatically. Need to check a specific file? Manual uploads are supported too.',
  },
  {
    number: '02',
    title: 'Multi-Call Case Analysis',
    description:
      "We don't just analyze isolated audio files; we analyze customer journeys. If a lead is contacted multiple times, our IA groups these interactions into a single Case ID. This provides full context across the entire conversation history, identifying patterns that single-call analysis misses.",
  },
  {
    number: '03',
    title: 'Zero-Touch CRM Sync',
    description:
      'The heavy lifting is done by the IA. Structured data and scores are pushed directly to your CRM. No manual data entry, no human error, just actionable insights waiting for your team.',
  },
];

export const Workflow = () => {
  return (
    <section className={st.layout}>
      <motion.div
        className={st.header}
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <span>How It Works</span>
        <h2>Seamless Workflow Integration</h2>
      </motion.div>

      <div className={st.grid}>
        {steps.map((step, index) => (
          <motion.article
            key={step.title}
            className={st.card}
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={index * 0.08}
          >
            <div className={st.number}>{step.number}</div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
};
