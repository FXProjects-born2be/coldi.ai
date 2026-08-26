'use client';

import { useState } from 'react';
import Image from 'next/image';

import { AnimatePresence, motion } from 'framer-motion';

import { imageAlt } from '@/shared/constants/page-image-alt';
import { blurInUp } from '@/shared/lib/helpers';
import { FaqStructuredData } from '@/shared/ui/components/structured-data/FaqStructuredData';

import st from './Faq.module.scss';

type FaqItem = {
  question: string;
  answer: string;
};

const faqs: FaqItem[] = [
  {
    question: 'What is AI in the insurance industry?',
    answer:
      'AI in insurance refers to technologies such as conversational AI, machine learning, and voice automation used to handle customer inquiries, process claims, generate quotes, and support insurance agents in daily operations.',
  },
  {
    question: 'How does AI help insurance agents?',
    answer:
      'AI helps insurance agents automate repetitive tasks such as answering policy questions, checking claim status, qualifying leads, and scheduling follow-ups. This allows agents to focus on complex cases and customer relationships. In many cases, conversational AI systems can handle a large portion of routine customer interactions while agents manage higher-value advisory tasks.',
  },
  {
    question: 'Will AI replace insurance agents?',
    answer:
      'No. AI is designed to assist insurance agents, not replace them. It automates repetitive tasks like policy inquiries or claim updates, allowing agents to focus on complex cases, advisory roles, and customer relationships.',
  },
  {
    question: 'What tasks can AI agents automate in insurance?',
    answer:
      'AI agents can automate a wide range of operational tasks in the insurance industry, including: policy inquiries and coverage explanations, first notice of loss (claim intake), quote generation and policy comparisons, billing and payment reminders, claim status updates. These AI-driven systems integrate with CRM and policy management platforms to provide real-time information and streamline insurance workflows.',
  },
  {
    question: 'Which is the best AI for insurance agents?',
    answer:
      'The best AI solutions for insurance agents combine conversational AI, voice automation, CRM integration, and industry-specific workflows. Platforms designed for conversational AI in insurance help agents automate calls, qualify leads, and manage policyholder communication more efficiently.',
  },
  {
    question: 'Is conversational AI secure for insurance customer communication?',
    answer:
      'Yes. Modern conversational AI platforms are designed with security, compliance, and auditability in mind. Every interaction can be logged, timestamped, and tracked, helping insurers maintain regulatory compliance and maintain transparent communication records.',
  },
  {
    question: 'How widely is AI used in the insurance industry?',
    answer:
      'AI adoption in the insurance sector is accelerating rapidly. The global market for AI in insurance surpassed $10 billion in 2025, and most insurers are actively implementing AI across claims processing, underwriting, and customer service operations. AI technologies can also deliver 50–75% faster processing speeds and significant operational cost savings.',
  },
  {
    question: 'Who offers multilingual support for policyholder interactions?',
    answer:
      'We offer a leading solution that supports more than 30 different languages and regional dialects globally. <br/><br/>This allows your <b>voice agents for insurance</b> to handle claims and renewals with native-level fluency, ensuring clear communication and higher satisfaction across your entire international customer base.',
  },
];

export const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={st.layout}>
      <FaqStructuredData id="insurance-faq-jsonld" faqs={faqs} />
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
                    alt={imageAlt('insurance', 'FAQ')}
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
                    <div
                      className={st.faq__answer}
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
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
