'use client';
import { useEffect, useMemo, useRef, useState } from 'react';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers/animations';
import { ChevronDownIcon } from '@/shared/ui/icons/outline/chevron-down';

import st from './Faq.module.scss';

export const Faq = () => {
  const [activeTab, setActiveTab] = useState(0);

  const [heights, setHeights] = useState<number[]>([]);

  const refs = useRef<(HTMLDivElement | null)[]>([]);

  const faq = useMemo(
    () => [
      {
        question: "What businesses benefit most from Coldi.ai's AI voice agents?",
        answer:
          'Real estate, healthcare, finance, and retail love it for handling high call volumes. Search "industry-specific AI voice solutions" and you\'ll see why.',
      },
      {
        question: 'How does Coldi.ai make its voice agents sound human?',
        answer:
          'Thanks to top-notch NLP and real-time learning, they mimic human speech like pros-perfect for "human-like AI voice technology."',
      },
      {
        question: 'What makes Coldi.ai stand out from other AI voice platforms?',
        answer:
          'Custom personas, instant adaptability, and easy setup. It\'s a gem for "unique AI voice agents."',
      },
      {
        question: 'Can Coldi.ai support multiple languages and accents?',
        answer:
          'Absolutely! From Warm Arabic to Confident British, it\'s built for "multilingual AI voice support."',
      },
      {
        question: 'Is Coldi.ai suitable for sensitive tasks like debt collection?',
        answer:
          'Yes, with compliant scripts and a professional vibe, it\'s great for "AI for outbound calls."',
      },
      {
        question: 'What customer service tasks can Coldi.ai handle?',
        answer: 'From FAQs to order updates, it\'s your go-to for "AI-powered customer support."',
      },
      {
        question: 'How does Coldi.ai integrate with existing software?',
        answer:
          'It likely syncs with CRMs via APIs, making it a hit for "CRM-compatible AI tools."',
      },
      {
        question: 'How does Coldi.ai save businesses money?',
        answer: 'Automating calls cuts labor costs-a big win for "cost-effective AI solutions."',
      },
      {
        question: 'Is customer data safe with Coldi.ai?',
        answer:
          'They claim industry-standard compliance, but more details would help for "secure AI voice agents."',
      },
      {
        question: 'Can Coldi.ai power marketing campaigns?',
        answer:
          'You bet-outbound calls for promos or re-engagement are ideal for "AI marketing tools."',
      },
      {
        question: 'How easy is it to set up Coldi.ai?',
        answer:
          'Super simple-they handle it all. Look up "easy AI voice setup" and you\'re covered.',
      },
      {
        question: 'How does Coldi.ai measure performance?',
        answer:
          'Think call resolution rates and customer satisfaction-key for "AI performance analytics."',
      },
      {
        question: "What are Coldi.ai's limitations?",
        answer:
          'Complex emotional queries might still need a human-important for "AI voice limitations."',
      },
      {
        question: 'How does Coldi.ai transfer calls to human agents?',
        answer:
          'It detects tough calls and hands them off smoothly-great for "AI-to-human call handoff."',
      },
      {
        question: 'Which industries are embracing AI voice agents?',
        answer: 'Telecom, finance, and retail lead the pack in "AI voice adoption trends."',
      },
      {
        question: 'Can Coldi.ai scale for small and large businesses?',
        answer: 'Yup, it adjusts to any size-search "scalable AI voice solutions" for proof.',
      },
      {
        question: 'What ethical concerns come with AI voice agents?',
        answer: 'Transparency and fairness are key-vital for "ethical AI customer service."',
      },
      {
        question: 'Can Coldi.ai handle diverse customer accents?',
        answer: 'With robust speech recognition, it\'s ready for "accent-friendly AI voice tech."',
      },
      {
        question: 'What insights does Coldi.ai offer businesses?',
        answer: 'Call volume and sentiment data-handy for "AI customer analytics."',
      },
      {
        question: 'How does Coldi.ai stay current with customer needs?',
        answer: 'Continuous updates keep it sharp-perfect for "adaptive AI voice agents."',
      },
    ],
    []
  );

  useEffect(() => {
    const newHeights = faq.map((_, index) => refs.current[index]?.scrollHeight || 0);
    setHeights(newHeights);
  }, [activeTab, faq]);

  const handleClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <section className={st.faq}>
      <section className={st.faq__content}>
        <div className={st.faq__title}>
          <motion.h1
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Frequently <br /> <span className={st.highlighted}>Asked Questions</span>
          </motion.h1>
          <motion.p
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Clear Answers on Features, Benefits, and Use Cases of Our AI Voice Agents
          </motion.p>
        </div>
      </section>
      <section className={st.faq__tabs}>
        {faq.map((item, index) => (
          <div
            key={index}
            className={`${st.faq__tab} ${activeTab === index ? st.active : ''}`}
            onClick={() => handleClick(index)}
          >
            <div className={st.question}>
              <h5>{item.question}</h5>
              <span>
                <ChevronDownIcon />
              </span>
            </div>
            <div
              className={st.answer}
              ref={(el) => {
                refs.current[index] = el;
              }}
              style={{
                height: activeTab === index ? heights[index] : 0,
                marginTop: activeTab === index ? '16px' : 0,
              }}
            >
              {item.answer}
            </div>
          </div>
        ))}
      </section>
    </section>
  );
};
