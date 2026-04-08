'use client';

import { useState } from 'react';
import Image from 'next/image';

import { AnimatePresence, motion } from 'framer-motion';

import { imageAlt } from '@/shared/constants/page-image-alt';
import { blurInUp } from '@/shared/lib/helpers';

import st from './Faq.module.scss';

const faqItems = [
  {
    question: 'Will AI replace customer service?',
    answer:
      'AI is not designed to fully replace human customer service. Instead, it complements human teams by handling repetitive and high-volume inquiries. This allows human agents to focus on complex, emotionally nuanced, and strategic interactions where human judgment is essential.',
  },
  {
    question: 'How to use AI in customer service?',
    answer:
      'AI can be deployed to automate responses, resolve common issues instantly, triage and route incoming requests, and provide continuous 24/7 support. The most effective implementations integrate AI directly into existing systems and workflows to ensure seamless operation.',
  },
  {
    question: 'How can AI help customer service?',
    answer:
      'AI significantly improves response times, reduces operational costs, and increases customer satisfaction. It enables businesses to handle large volumes of inquiries simultaneously while maintaining consistent quality and personalization.',
  },
  {
    question: 'Will AI replace customer service jobs?',
    answer:
      'AI shifts the role of customer service teams rather than eliminating them. By automating routine tasks, it empowers employees to focus on higher-value activities such as relationship building, problem-solving, and customer retention strategies.',
  },
];

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
          FAQs
        </motion.h2>
      </div>

      <div className={st.faq}>
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <motion.div
              key={item.question}
              className={st.item}
              variants={blurInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index * 0.1}
              onClick={() => toggleFaq(index)}
            >
              <div className={st.question}>
                <h3>{item.question}</h3>
                <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <Image
                    src="/images/leads/faq.svg"
                    alt={imageAlt('customerServiceAgent')}
                    width={32}
                    height={32}
                  />
                </motion.span>
              </div>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    className={st.answerWrap}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className={st.answer}>{item.answer}</div>
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
