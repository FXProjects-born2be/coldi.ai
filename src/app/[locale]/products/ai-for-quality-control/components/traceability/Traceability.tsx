'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers';

import st from './Traceability.module.scss';

const points = [
  'Automatically logged for effortless auditing.',
  'Synced with your existing CRM systems.',
  'Visualized in real-time dashboards for instant decision-making.',
];

export const Traceability = () => {
  return (
    <section className={st.layout}>
      <motion.div
        className={st.content}
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className={st.copy}>
          <h2>Seamless Data Integration & Traceability</h2>
          <p>With Coldi AI, every inspection becomes a data asset. Every anomaly is:</p>
          <ul>
            {points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <p className={st.note}>
            This creates full traceability, supporting rigorous compliance standards across the most
            demanding industries.
          </p>
        </div>

        <div className={st.visual}>
          <Image
            src="/images/ai-for-quality-control/traceability.png"
            alt="Traceability"
            width={564}
            height={564}
            unoptimized
          />
        </div>
      </motion.div>
    </section>
  );
};
