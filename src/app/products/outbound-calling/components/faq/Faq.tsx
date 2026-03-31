'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { AnimatePresence, motion } from 'framer-motion';

import { imageAlt } from '@/shared/constants/page-image-alt';
import { blurInUp } from '@/shared/lib/helpers';
import { Button } from '@/shared/ui/kit/button';

import st from './Faq.module.scss';

type FaqItem = {
  question: string;
  answer: string;
};

const faqs: FaqItem[] = [
  {
    question: 'Who is this for?',
    answer: 'Teams handling large outbound sales or lead generation campaigns.',
  },
  {
    question: 'Is this replacing my sales team?',
    answer: 'No. AI qualifies and routes leads — humans close deals.',
  },
  {
    question: 'Is this just a dialer?',
    answer: 'No. This is conversational AI that speaks, qualifies and books meetings.',
  },
  {
    question: 'Can it integrate with our stack?',
    answer: 'Yes. CRM, calendar and telephony integrations included.',
  },
  {
    question: 'How fast can we launch?',
    answer: 'Usually in days.',
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
                    alt={imageAlt('outboundCalling', 'FAQ')}
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
