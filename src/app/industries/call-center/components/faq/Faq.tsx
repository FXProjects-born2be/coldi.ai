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
    question: 'Will AI replace call center agents?',
    answer:
      'AI is not expected to fully replace human call center agents. Instead, modern contact center AI solutions are designed to augment human teams by automating repetitive tasks such as FAQs, basic support, and first\u2011level routing as AI handles high\u2011volume routine interactions more efficiently.',
  },
  {
    question: 'How does contact center AI determine caller intent?',
    answer:
      'AI determines caller intent using technologies like speech recognition, natural language understanding (NLU), machine learning, and predictive analytics. These systems analyze what the caller says (and how they say it), identify keyword patterns and conversational context, and classify requests into intents such as billing questions, technical issues, or account lookup.',
  },
  {
    question: 'Where can businesses find AI for call center automation?',
    answer:
      'Businesses can find AI call center software and solutions from established enterprise tech vendors and SaaS providers that specialize in contact center automation, conversational AI, and voice bots. These tools range from AI voice bots and call center bots to fully integrated AI contact center platforms that plug into existing telephony and CRM systems.',
  },
  {
    question: 'How does AI improve call center efficiency?',
    answer:
      'AI improves call center efficiency by: automating routine inquiries, providing 24/7 availability without extra staffing costs; intelligently routing calls to the right agents or systems based on predicted need; reducing repetitive work so human agents can focus on higher\u2011value tasks; improving first\u2011call resolution through instant data access and contextual understanding.',
  },
  {
    question: 'What tasks can AI call center agents automate?',
    answer:
      'AI agents can automate tasks such as call answering, lead qualification, follow\u2011ups, appointment scheduling, account inquiries, and outbound notifications.',
  },
  {
    question: 'Is conversational AI secure for customer calls?',
    answer:
      'Yes. Modern AI platforms include robust security, compliance logging, and data governance features to protect interactions and satisfy regulatory requirements.',
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
