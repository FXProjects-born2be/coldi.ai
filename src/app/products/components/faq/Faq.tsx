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
        question: 'What businesses benefit most from Coldis AI voice agents?',
        answer:
          "Real estate, healthcare, finance, and retail use Coldi to handle high call volumes. Coldi offers these <b>industry-specific AI voice solutions</b> to fit each sector's needs.",
      },
      {
        question: 'How does Coldi make its voice agents sound human?',
        answer:
          'Coldi offers <b>human-like AI voice technology</b>. Thanks to top-notch NLP and real-time learning, the agents mimic human speech <b>like pros</b>.',
      },
      {
        question: 'What makes Coldi stand out from other AI voice platforms?',
        answer:
          'Coldi offers unique AI voice agents with <b>custom personas, instant adaptability, and easy setup</b>. This means your business gets a voice that fits your brand – and can start handling calls right away without long setup times.',
      },
      {
        question: 'Can Coldi support multiple languages and accents?',
        answer:
          'Absolutely! From Warm Arabic to Confident British, Coldi offers <b>multilingual AI voice support</b> because we know how important it is to speak to customers in their own language.',
      },
      {
        question: 'Is Coldi suitable for sensitive tasks like debt collection?',
        answer:
          'Yes. Coldi AI for outbound calls handles sensitive tasks like debt collection using <b>compliant scripts</b> and a professional tone to increase the effectiveness of every connection.',
      },
      {
        question: 'What customer service tasks can Coldi handle?',
        answer:
          'Coldi <b>AI-powered customer support</b> manages the full cycle – from answering FAQs and giving product info to handling order updates and follow-ups – making it your go-to solution for daily customer requests.',
      },
      {
        question: 'How does Coldi integrate with existing software?',
        answer:
          'Coldi offers <b>CRM-compatible AI tools</b>. It connects to CRMs and other systems through APIs, making it easy for businesses to link calls with calendars, ticketing tools, and customer records.',
      },
      {
        question: 'How does Coldi save businesses money?',
        answer:
          'Coldi offers <b>cost-effective AI solutions</b>. Automating calls cuts labor costs – a big win for businesses that need to handle high call volumes without hiring more staff.',
      },
      {
        question: 'Is customer data safe with Coldi?',
        answer:
          'Yes. Coldi is one of the most <b>secure AI voice agents</b> available. It meets <b>ISO 27001</b> standards, complies with <b>GDPR</b> and <b>HIPAA</b>, and encrypts all data in transit and at rest – keeping customer information protected at every stage.',
      },
      {
        question: 'Can Coldi power marketing campaigns?',
        answer:
          'Yes. Coldi is one of the <b>AI marketing tools</b> that can boost outreach. It can run outbound calls for promotions, re-engage inactive customers, remind clients about expiring offers, announce new products, or follow up after events – all with consistent delivery and no wait times.',
      },
      {
        question: 'How easy is it to set up Coldi?',
        answer:
          "Coldi features <b>easy AI voice setup</b> – we handle everything. From implementation to integration, our team manages the full cycle, so you don't just get another tool, you get a fully tuned, optimized process that works for your business from day one.",
      },
      {
        question: 'How does Coldi measure performance?',
        answer:
          'Coldi provides <b>advanced AI performance analytics</b>. Businesses can track key metrics like resolution rates, call completion, and customer satisfaction to see exactly how well the AI voice agents are performing.',
      },
      {
        question: "What are Coldi's limitations?",
        answer:
          'You can check plan limits on our Pricing page. In terms of <b>AI voice limitations</b>, Coldi handles most calls well – but complex emotional queries may still need a human touch.',
      },
      {
        question: 'How does Coldi transfer calls to human agents?',
        answer:
          'Coldi applies an <b>advanced AI-to-human call handoff technique</b>. It detects complex or sensitive calls using hundreds of factors and instantly passes them to the right human representative in your business.',
      },
      {
        question: 'Which industries are embracing AI voice agents?',
        answer:
          'At Coldi, we track <b>AI voice adoption trends</b> and tailor solutions for each sector. Right now, Coldi is an ideal fit for <b>telecom, finance, and retail</b>, where demand for fast, scalable call handling is highest.',
      },
      {
        question: 'Can Coldi scale for small and large businesses?',
        answer:
          'Yes. Coldi is one of those <b>scalable AI voice solutions</b> that adjusts to any business size – from a few daily calls to full enterprise-level operations.',
      },
      {
        question: 'What ethical concerns come with AI voice agents?',
        answer:
          "Coldi is built as an <b>ethical AI customer service tool</b>, but some concerns exist across the industry. Transparency, fairness, and responsible data use are key. Other issues include avoiding bias in scripts, ensuring customers know when they're speaking to AI, and handling sensitive information with care.",
      },
      {
        question: 'Can Coldi handle diverse customer accents?',
        answer:
          'Absolutely. Coldi uses <b>accent-friendly AI voice tech</b> with robust speech recognition, so calls from clients with different accents are understood clearly and handled without confusion.',
      },
      {
        question: 'What insights does Coldi offer businesses?',
        answer:
          'Coldi delivers detailed <b>AI customer analytics</b>. It provides data on call volume, sentiment, resolution rates, and customer trends – handy for improving service and shaping business decisions.',
      },
      {
        question: 'How does Coldi stay current with customer needs?',
        answer:
          'Coldi provides <b>adaptive AI voice agents</b>. It analyzes every inbound and outbound call, then updates scripts and voices continuously – keeping each interaction relevant to current customer needs.',
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
              dangerouslySetInnerHTML={{ __html: item.answer }}
            />
          </div>
        ))}
      </section>
    </section>
  );
};
