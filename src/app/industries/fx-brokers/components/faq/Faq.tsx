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
    question: 'What are AI agents in trading?',
    answer:
      'AI agents are intelligent voice systems that automate client support, handle account inquiries, and provide market alerts for brokerage firms.',
  },
  {
    question: 'Can AI agents handle sensitive account data?',
    answer:
      'Yes. Coldi AI is built with enterprise-grade security to ensure all client data and verifications are handled securely.',
  },
  {
    question: 'How do they handle market volatility?',
    answer:
      'Unlike human teams, AI agents scale instantly. If your call volume triples in 5 minutes due to a market event, the AI handles every call without a queue.',
  },
  {
    question: 'Do they support technical trading terms?',
    answer:
      'Yes. Our models are trained to understand financial jargon, from stop-loss and spread to margin requirements.',
  },
  {
    question: 'How fast can we go live?',
    answer:
      'Most trading platforms can integrate and launch their first automated voice flows in just a few days.',
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
