'use client';

import { useState } from 'react';
import Image from 'next/image';

import { AnimatePresence, motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers';

import st from './Faq.module.scss';

type FaqItem = {
  question: string;
  answer: string;
};

const faqs: FaqItem[] = [
  {
    question: 'What is AI in debt collection?',
    answer:
      'AI in debt collection refers to using artificial intelligence to automate borrower communication, payment reminders, identity verification, and repayment negotiations.',
  },
  {
    question: 'How do AI agents make debt collection easier and more efficient?',
    answer:
      'AI agents automate payment reminders, borrower verification, and repayment conversations, allowing AI debt collection software to handle thousands of interactions simultaneously. This improves contact rates, speeds up recovery, and reduces the manual workload for credit and debt collection services.',
  },
  {
    question: 'Why are AI agents better than chatbots in debt collection?',
    answer:
      'Unlike chatbots that rely on text and inbound messages, AI voice agents proactively call borrowers and hold natural conversations about repayment. This makes AI debt collection more effective by enabling real-time verification, balance explanations, and payment guidance.',
  },
  {
    question: 'How does AI debt collection improve recovery rates?',
    answer:
      'AI agents reach more debtors, respond instantly, and guide borrowers toward repayment options, increasing the likelihood of successful recovery.',
  },
  {
    question: 'Can AI handle sensitive financial conversations?',
    answer:
      'Yes. Coldi AI is built with secure infrastructure and identity verification protocols to safely manage financial data and payment discussions.',
  },
  {
    question: 'Is AI debt collection compliant with regulations?',
    answer:
      'Yes. AI workflows can be configured to follow legal requirements for collection calls, including verification steps and approved communication scripts.',
  },
  {
    question: 'How quickly can AI debt collection be deployed?',
    answer:
      'Most organizations can launch their first AI debt collection software workflows very soon after integration with their CRM and payment systems.',
  },
];

export const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={blurInUp}
              custom={index * 0.1}
              className={st.faq__item}
              onClick={() => toggleFaq(index)}
            >
              <div className={`${st.faq__question} ${isOpen ? st.open : ''}`}>
                <h3>{faq.question}</h3>
                <motion.span
                  className={st.faq__chevron}
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image src="/images/leads/faq.svg" alt="FAQ" width={32} height={32} />
                </motion.span>
              </div>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className={st.faq__answer_wrapper}
                  >
                    <div className={st.faq__answer}>{faq.answer}</div>
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
