'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

import { blurInUp } from '@/shared/lib/helpers';

import st from './Results.module.scss';

const rows = [
  {
    title: 'Real-World Output: From Raw Audio to Actionable Data',
    description:
      'Below is a live look at how our system processes a complex interaction. In this example (Result #740), the AI performs a full KYC (Know Your Customer) and qualification analysis for a lead in South Africa.',
    visual: '/images/ai-for-quality-control/result-1.png',
    reverse: true,
  },
  {
    title: 'The Management Dashboard',
    description:
      'Our interface allows managers to track total cases, filter by phone number or CRM ID, and monitor high-level volume at a glance.',
    visual: '/images/ai-for-quality-control/result-2.png',
  },
  {
    title: 'The Analysis Result',
    description:
      'This is the "Data Card" that populates your CRM. Instead of a 15-minute recording, your sales team gets a structured summary in seconds:',
    bullets: [
      'Demographics: Instant capture of citizenship, age, and profession.',
      'Financial Profile: Clear data on savings, monthly income, and investment goals.',
      'Technical Readiness: Knowledge of the platform, device types used, and account manager status.',
      'Sentiment & Intent: A concise summary of the lead’s eagerness and specific concerns (e.g., "concerned about credit card issues").',
    ],
    visual: '/images/ai-for-quality-control/result-3.png',
    reverse: true,
  },
  {
    title: 'Stop Monitoring Samples. Start Auditing Everything.',
    description:
      'Get 24/7 quality oversight at scale. Turn your voice data into structured, searchable, and profitable assets for your sales team.',
    visual: '/images/ai-for-quality-control/result-4.png',
  },
  {
    title: 'AI for Quality Control: The New Standard',
    description: (
      <>
        In a competitive market, <strong>AI for quality control</strong> is the line between
        industry leaders and those buried in waste. It&apos;s no longer a luxury, it&apos;s a{' '}
        <strong>strategic necessity</strong> to scale production with absolute precision.
        <br />
        <br />
        <strong>Coldi AI</strong> removes the technical barriers. Our{' '}
        <strong>no-code platform</strong> integrates into your workflow, putting deep learning in
        the hands of your team to ensure every unit meets the highest standards.
      </>
    ),
    visual: '/images/ai-for-quality-control/result-5.png',
    reverse: true,
  },
];

type Row = {
  title: string;
  description: ReactNode;
  bullets?: string[];
  visual: ReactNode;
  reverse?: boolean;
};

export const Results = () => {
  return (
    <section className={st.layout}>
      <div className={st.rows}>
        {(rows as Row[]).map((row, index) => (
          <motion.div
            key={row.title}
            className={`${st.row} ${row.reverse ? st.reverse : ''}`}
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={index * 0.06}
          >
            <div className={st.content}>
              <h2>{row.title}</h2>
              <div className={st.description}>{row.description}</div>

              {row.bullets && (
                <ul className={st.bullets}>
                  {row.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>

            <div className={st.visual}>
              <Image
                src={row.visual as string}
                alt={row.title}
                width={564}
                height={564}
                unoptimized
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
