'use client';

import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers';
import { Button } from '@/shared/ui/kit/button';

import st from './Why.module.scss';

type WhySection = {
  title: string;
  intro?: string;
  lead?: string;
  summary?: string;
  bullets: string[];
  visual: string;
  alt: string;
  reverse?: boolean;
};

const sections: WhySection[] = [
  {
    title: 'We Build. You Benefit. End-to-End Delivery.',
    intro:
      'Developing AI agents involves more than building models, it means aligning technology with workflows, user journeys, and business logic. With Coldi, you get a partner who delivers the full stack, not just pieces of it.',
    bullets: [
      "Full custom AI agent development services managed by Coldi's specialists",
      'From scoping and design to production deployment and maintenance',
      'Conversation flows, integration, and performance enhancements handled for you',
      'Ongoing support and iterative tuning',
      'No need for internal AI or engineering teams',
    ],
    visual: '/images/agent-development/all-in-one-service.png',
    alt: 'AI Agent Development services',
  },
  {
    title: 'Develop Conversation AI Voice Agents That Deliver',
    lead: 'Every AI voice agent we create is purpose-built to interact with users meaningfully, with capabilities such as:',
    summary:
      'With Coldi, AI agents become a strategic extension of your operations, always available, always improving.',
    bullets: [
      'Natural, human-like speech and conversational tone',
      'Persistent context awareness across interactions',
      'Task execution based on intent detection',
      'Appropriate escalation to human teams',
      'Support across channels and devices',
    ],
    visual: '/images/agent-development/natural-conversations.png',
    alt: 'AI Agent Development services',
    reverse: true,
  },
  {
    title: 'Seamless Integration Across Your Ecosystem',
    lead: 'AI agents must work with your existing systems to generate value:',
    summary:
      'This unified architecture turns conversations into actionable insights and automated actions.',
    bullets: [
      'Connect to CRM platforms and data sources',
      'Sync with support, scheduling, and ticketing tools',
      'Integrate voice channels and telephony infrastructure',
      'Link workflows and backend APIs',
    ],
    visual: '/images/agent-development/seamless-integration.png',
    alt: 'AI Agent Development services',
  },
];

export const Why = () => {
  return (
    <section className={st.layout}>
      <div className={st.inner}>
        <div className={st.header}>
          <motion.h2
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Why Choose Coldi for AI Agent Development Services
          </motion.h2>
        </div>

        <div className={st.sections}>
          {sections.map((section, index) => (
            <div key={section.title} className={`${st.split} ${section.reverse ? st.reverse : ''}`}>
              <motion.div
                className={st.card}
                variants={blurInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index * 0.1}
              >
                <h3>{section.title}</h3>
                {section.lead && <p className={st.lead}>{section.lead}</p>}
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                {(section.summary || section.intro) && (
                  <p className={st.summary}>{section.summary ?? section.intro}</p>
                )}
              </motion.div>

              <motion.div
                className={st.visualWrap}
                variants={blurInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index * 0.1 + 0.1}
              >
                <Image
                  src={section.visual}
                  alt={section.alt}
                  width={564}
                  height={564}
                  className={st.visual}
                  unoptimized
                />
              </motion.div>
            </div>
          ))}
        </div>

        <motion.div
          className={st.cta}
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Link href="#demo">
            <Button size="md">Book a Demo</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
