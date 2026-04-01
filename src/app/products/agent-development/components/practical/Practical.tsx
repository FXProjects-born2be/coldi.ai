'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers';

import st from './Practical.module.scss';

export const Practical = () => {
  return (
    <section className={st.layout}>
      <div className={st.inner}>
        <motion.div
          className={st.visualWrap}
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Image
            src="/images/agent-development/real-world-automation.png"
            alt="AI Agent Development services"
            width={564}
            height={564}
            className={st.visual}
            unoptimized
          />
        </motion.div>

        <motion.article
          className={st.card}
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2>Practical AI Conversational Systems for Real-World Application</h2>
          <p>
            AI agents are no longer proof-of-concept experiments, they&apos;re production tools that
            automate real work. Leading companies build agents that handle frequent inquiries,
            support escalation, lead qualification, and more with low latency and high reliability.
            At Coldi, we emphasize practical deployment, robust error handling, and real-world
            integration.
          </p>
        </motion.article>
      </div>
    </section>
  );
};
