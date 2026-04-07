'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { imageAlt } from '@/shared/constants/page-image-alt';
import { blurInUp } from '@/shared/lib/helpers';

import st from './Impact.module.scss';

const t = (key: string, fallback: string) => fallback;

type ImpactSection = {
  title: string;
  intro?: string;
  bullets?: string[];
  body: string[];
  visual: React.ReactNode;
  reverse?: boolean;
};

const sections: ImpactSection[] = [
  {
    title: t(
      'products.customerServiceAgent.impact.sections.0.title',
      'How AI Enhances Customer Service'
    ),
    body: [
      t(
        'products.customerServiceAgent.impact.sections.0.body.0',
        'AI in customer service refers to the deployment of intelligent systems capable of delivering fast, accurate, and personalized support at scale. These systems automate repetitive tasks, reduce manual workloads, and allow human agents to focus on more complex and high-value interactions.'
      ),
      t(
        'products.customerServiceAgent.impact.sections.0.body.1',
        'Unlike traditional rule-based chatbots that follow rigid scripts, Coldi’s conversational AI agents dynamically interpret user intent, retrieve relevant data, and execute appropriate actions in real time. This results in smoother conversations, faster resolutions, and a significantly improved customer experience.'
      ),
      t(
        'products.customerServiceAgent.impact.sections.0.body.2',
        'By embedding AI into your support infrastructure, you create a more agile, efficient, and customer-centric operation.'
      ),
    ],
    visual: '/images/customer-service-agent/impact-1.png',
  },
  {
    title: t(
      'products.customerServiceAgent.impact.sections.1.title',
      'Future-Ready AI Customer Service'
    ),
    intro: t(
      'products.customerServiceAgent.impact.sections.1.intro',
      'Coldi’s AI customer service agents enable your business to:'
    ),
    bullets: [
      t(
        'products.customerServiceAgent.impact.sections.1.bullets.0',
        'Deliver instant, intelligent support to customers anywhere in the world'
      ),
      t(
        'products.customerServiceAgent.impact.sections.1.bullets.1',
        'Reduce operational overhead while maintaining or improving service quality'
      ),
      t(
        'products.customerServiceAgent.impact.sections.1.bullets.2',
        'Scale support capabilities without increasing headcount'
      ),
      t(
        'products.customerServiceAgent.impact.sections.1.bullets.3',
        'Improve key performance metrics such as first response time and resolution rates'
      ),
    ],
    body: [
      t(
        'products.customerServiceAgent.impact.sections.1.body.0',
        'From initial strategy and system design to deployment and continuous optimization, Coldi AI serves as your long-term partner in building the best AI customer service agent for your organization.'
      ),
      t(
        'products.customerServiceAgent.impact.sections.1.body.1',
        'With Coldi, you don’t just adopt AI — you implement a robust, scalable support system that drives measurable business outcomes and long-term competitive advantage.'
      ),
    ],
    visual: '/images/customer-service-agent/impact-2.png',
    reverse: true,
  },
];

export const Impact = () => {
  return (
    <section className={st.layout}>
      <div className={st.rows}>
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            className={`${st.row} ${section.reverse ? st.reverse : ''}`}
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={index * 0.1}
          >
            <div className={st.content}>
              <h2>{section.title}</h2>
              {section.intro && <p>{section.intro}</p>}
              {section.bullets && (
                <ul className={st.bullets}>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>
                      <span className={st.dot} />
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className={st.visual}>
              <Image
                src={section.visual as string}
                alt={imageAlt('customerServiceAgent')}
                width={564}
                height={564}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
