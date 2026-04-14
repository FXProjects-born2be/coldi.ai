'use client';

import { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers';
import { FaqStructuredData } from '@/shared/ui/components/structured-data/FaqStructuredData';

import st from './Faq.module.scss';

type FaqItem = {
  question: string;
  answer: string;
};

const faqs: FaqItem[] = [
  {
    question: 'What makes Coldi AI one of the best no-code AI platforms for quality control?',
    answer:
      'Accessibility is our core strength. We empower subject matter experts—like quality managers and engineers—to build and refine AI models through a visual interface. This removes the "data scientist bottleneck" and accelerates your ROI and time-to-market.',
  },
  {
    question: 'Can AI replace human quality inspectors?',
    answer:
      'AI is designed to augment, not replace. By handling the repetitive, exhausting tasks of AI in quality control, it frees up your human specialists to focus on high-level strategy, complex problem-solving, and process engineering.',
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
      <FaqStructuredData id="ai-for-quality-control-faq-jsonld" faqs={faqs} />
      <motion.h2
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Frequently Asked Questions
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
