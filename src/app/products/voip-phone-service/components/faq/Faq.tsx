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
    question: 'What is a VoIP number?',
    answer:
      'A VoIP number is a phone number that is not tied to a physical phone line. It works over the internet and can be used from any device, anywhere.',
  },
  {
    question: 'What is a VoIP caller?',
    answer:
      'A VoIP caller is any user or system making calls through a VoIP network instead of a traditional phone line. In advanced systems like Coldi, the caller can also be an AI agent handling conversations automatically.',
  },
  {
    question: 'How to get a VoIP phone number?',
    answer:
      'You can get a VoIP phone number by signing up with a VoIP provider. With Coldi, the process is fully managed, we set up your numbers, routing, and system configuration for you.',
  },
  {
    question: 'How much does a VoIP phone system cost?',
    answer:
      'Rather than a fixed price, VoIP should be viewed as an efficiency investment. Basic licenses are affordable, but the real value comes from automated routing, seamless integrations, and AI-powered communication that reduces operational overhead and improves ROI.',
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
      <FaqStructuredData id="voip-phone-service-faq-jsonld" faqs={faqs} />
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
