'use client';

import { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers';

import st from './Faq.module.scss';

type FaqItem = {
  question: string;
  answer: string;
};

const faqs: FaqItem[] = [
  {
    question: 'What are AI agent development services?',
    answer:
      'AI agent development services involve designing, building, and deploying intelligent agents that can conduct conversations and complete tasks autonomously across voice or chat systems.',
  },
  {
    question: 'What is an AI agent?',
    answer:
      'An AI agent is a software system that can communicate, understand natural language, and perform actions on behalf of users, from answering questions to executing workflows.',
  },
  {
    question: 'How do you develop AI agents?',
    answer:
      'Working with Coldi ensures a fast, professionally engineered deployment that includes strategy, design, integration, and optimization from start to finish.',
  },
  {
    question: 'How much does AI agent development cost?',
    answer:
      'Costs are project-specific and depend on use cases, features, languages, integrations, and volume. Coldi provides personalized quotes based on your needs.',
  },
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <motion.span
      className={st.chevron}
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <svg
        fill="none"
        height="32"
        viewBox="0 0 32 32"
        width="32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="16" cy="16" fill="#4268FF" r="16" />
        <path
          d="M11 14L16 19L21 14"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.2"
        />
      </svg>
    </motion.span>
  );
}

export const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className={st.layout}>
      <motion.h2
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        FAQS
      </motion.h2>

      <div className={st.faq}>
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <motion.div
              key={faq.question}
              className={st.item}
              variants={blurInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <button
                className={st.question}
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <h3>{faq.question}</h3>
                <ChevronIcon open={isOpen} />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    className={st.answerWrap}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className={st.answer}>{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
