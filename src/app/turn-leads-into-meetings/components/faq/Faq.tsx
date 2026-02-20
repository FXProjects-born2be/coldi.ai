'use client';
import { useState } from 'react';
import Image from 'next/image';

import { AnimatePresence, motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers/animations';

import st from './Faq.module.scss';

type FaqItem = {
  question: string;
  answer: string;
};

export const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FaqItem[] = [
    {
      question: 'Who is this for?',
      answer: 'Companies handling a high volume of leads or outbound calls.',
    },
    {
      question: 'Is this a replacement for my sales team?',
      answer: 'No. AI Voice Agents qualify and book calls. Your sales team closes.',
    },
    {
      question: 'Can it integrate with my current tools?',
      answer: 'Yes. It connects instantly with CRMs, calendars, and lead sources.',
    },
    {
      question: 'What languages are supported?',
      answer:
        'More than 30 languages, including  English, Spanish, French, German, Chinese, Japanese, Korean or Portuguese.',
    },
    {
      question: 'How fast can we get started?',
      answer: 'In days.',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <section className={st.layout}>
        <div className={st.header}>
          <motion.h2
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Frequently
            <span>Asked Questions</span>
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
    </>
  );
};
