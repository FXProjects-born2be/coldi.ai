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
    question: 'What is an inbound call?',
    answer:
      'An inbound call is a call initiated by a customer or prospect to a business. These calls are typically for customer support, product inquiries, scheduling, or sales discovery.',
  },
  {
    question: 'How to handle inbound calls?',
    answer:
      "Effective inbound calling requires prompt answering, accurate routing, and quick resolution. AI handles this by answering on the first ring, qualifying the caller's needs, and either resolving the issue or routing the call to the specific person best equipped to help.",
  },
  {
    question: 'How many inbound calls per day can your solution manage?',
    answer:
      'Our solution is built on elastic, cloud-based infrastructure, meaning it can handle an unlimited number of simultaneous calls. Whether you receive 10 calls a day or 10,000, the AI scales instantly to ensure no caller is ever put on hold.',
  },
  {
    question: 'Is an AI inbound answering service better than a human call center?',
    answer:
      'For routine tasks, yes. AI is faster, costs significantly less per interaction, and is available 24/7 without fatigue. This allows your human staff to focus on complex, high-empathy conversations that truly require a person.',
  },
  {
    question: 'What tasks can AI inbound agents automate?',
    answer:
      'They can automate appointment setting, order status updates, lead qualification, basic troubleshooting, and routing to specialized departments. Every interaction is logged directly into your CRM for full visibility.',
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
        <circle cx="16" cy="16" fill="#4268FF" opacity="0.12" r="16" />
        <path
          d="M11 14L16 19L21 14"
          stroke="#4268FF"
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

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={st.layout}>
      <div className={st.header}>
        <motion.h2
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          FAQS
        </motion.h2>
      </div>
      <div className={st.faq}>
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <motion.div
              key={faq.question}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={blurInUp}
              custom={index * 0.1}
              className={st.item}
            >
              <button className={st.question} onClick={() => toggleFaq(index)} type="button">
                <h3>{faq.question}</h3>
                <ChevronIcon open={isOpen} />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    animate={{ height: 'auto', opacity: 1 }}
                    className={st.answerWrap}
                    exit={{ height: 0, opacity: 0 }}
                    initial={{ height: 0, opacity: 0 }}
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
