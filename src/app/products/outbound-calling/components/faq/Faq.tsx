'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { AnimatePresence, motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers';
import { Button } from '@/shared/ui/kit/button';

import st from './Faq.module.scss';

type FaqItem = {
  question: string;
  answer: string;
};

const faqs: FaqItem[] = [
  {
    question: 'What are AI agents in healthcare?',
    answer:
      'AI agents in healthcare are intelligent voice assistants that automate patient communication, handle calls, and support administrative workflows.',
  },
  {
    question: 'Can AI voice agents replace healthcare staff?',
    answer:
      'No. AI agents handle repetitive communication tasks so healthcare professionals can focus on care.',
  },
  {
    question: 'Do AI agents support multiple languages?',
    answer: 'Yes. Coldi.ai supports more than 30 languages for multilingual patient communication.',
  },
  {
    question: 'How fast can Coldi.ai be deployed?',
    answer: 'Most healthcare teams can launch in days, not months.',
  },
  {
    question: 'Is this suitable for high-volume healthcare providers?',
    answer:
      'Yes. Coldi.ai is built for organizations handling large numbers of patient calls daily.',
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
                  <Image src="/images/leads/faq.svg" alt="" width={32} height={32} />
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
      <motion.div
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Link href="#demo">
          <Button size="md">Hire AI Voice Agents</Button>
        </Link>
      </motion.div>
    </section>
  );
};
