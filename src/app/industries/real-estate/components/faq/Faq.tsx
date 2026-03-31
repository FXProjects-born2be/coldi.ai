'use client';

import { useState } from 'react';
import Image from 'next/image';

import { AnimatePresence, motion } from 'framer-motion';

import { imageAlt } from '@/shared/constants/page-image-alt';
import { blurInUp } from '@/shared/lib/helpers';

import st from './Faq.module.scss';

type FaqItem = {
  question: string;
  answer: string;
};

const faqs: FaqItem[] = [
  {
    question: 'What are AI Real Estate Agents?',
    answer:
      'AI in real estate refers to conversational voice agents and machine learning tools used to manage property inquiries, qualify leads, schedule showings, and support agents in their day-to-day prospecting.',
  },
  {
    question: 'How can AI help real estate agents?',
    answer:
      'AI helps agents by taking over the "front line" of communication. It screens leads, answers basic property questions, and logs data into CRMs. This allows the human agent to focus on negotiations and building relationships.',
  },
  {
    question: 'Will AI replace real estate agents?',
    answer:
      'No. Real estate is a relationship-driven business. AI is designed to replace the repetitive tasks (like cold calling and basic FAQ answering), not the agent’s expertise, empathy, and negotiation skills.',
  },
  {
    question: 'What is the best AI for real estate agents?',
    answer:
      'The best solutions are those that offer AI voice agents specifically tuned for real estate logic and CRM integration. Coldi AI is a leader in providing fully managed, voice-first AI that integrates directly into your existing sales stack.',
  },
  {
    question: 'Is AI for real estate leads secure?',
    answer:
      'Absolutely. Modern AI platforms use enterprise-grade encryption and provide full transcripts of every call, ensuring compliance with fair housing guidelines and maintaining a transparent record of all client interactions.',
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
                  <Image
                    src="/images/leads/faq.svg"
                    alt={imageAlt('realEstate', 'FAQ')}
                    width={32}
                    height={32}
                  />
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
