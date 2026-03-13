'use client';

import { useState } from 'react';
import Image from 'next/image';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers';

import st from './ContentCards.module.scss';

const cards = [
  {
    icon: '/images/healthcare/card1.svg',
    title: 'AI Agent First-Call Resolution',
    description:
      'First-call resolution is one of the biggest challenges in healthcare communication. Coldi.ai AI agents identify intent, collect key information, and resolve patient needs during the first interaction whenever possible.',
    listTitle: 'This means:',
    bullets: [
      'Faster patient support',
      'Fewer call transfers',
      'Less pressure on staff',
      'Improved patient satisfaction',
    ],
  },
  {
    icon: '/images/healthcare/card2.svg',
    title: 'Best AI Agents for Healthcare',
    description:
      'The best AI agents for healthcare combine conversational intelligence, healthcare-ready workflows, and reliable telephony infrastructure.',
    listTitle: 'Coldi.ai delivers:',
    bullets: [
      'Healthcare-focused AI voice agents',
      'High first-call resolution rates',
      'Secure and scalable infrastructure',
      'Multilingual AI communication',
      'Seamless integration with existing workflows',
    ],
  },
  {
    icon: '/images/healthcare/card3.svg',
    title: 'Better than Agentic AI for High-Volume Communication',
    description:
      'Healthcare providers often struggle with high call volumes, limited staff availability, and fragmented communication processes. Coldi.ai is designed to handle large-scale patient communication without increasing operational complexity.',
    listTitle:
      'Our AI agents can manage inbound and outbound conversations simultaneously, helping teams:',
    bullets: [
      'Reduce missed calls',
      'Improve patient response times',
      'Handle peak call hours efficiently',
      'Maintain consistent communication quality',
    ],
    footer:
      'This makes AI agents especially valuable for clinics, healthcare groups, and organizations that rely heavily on phone-based communication.',
  },
  {
    icon: '/images/healthcare/card4.svg',
    title: 'AI Voice Agents for Healthcare Teams',
    description:
      'Healthcare organizations handle thousands of repetitive calls every day — appointment confirmations, patient inquiries, follow-ups, and administrative requests. AI voice agents help reduce this communication burden by automating routine conversations while maintaining a natural and professional patient experience. By introducing AI agents into healthcare workflows, teams can respond faster, reduce waiting times, and ensure patients always reach a reliable point of contact. This creates a more consistent experience while allowing healthcare professionals to spend less time on repetitive calls and more time focusing on care delivery.',
  },
  {
    icon: '/images/healthcare/card5.svg',
    title: 'Multilingual AI Communication for Healthcare',
    description:
      'Modern healthcare environments serve diverse patient populations. Language barriers can create delays, misunderstandings, and operational friction. Coldi.ai supports patient communication across 30+ languages, allowing healthcare providers to offer more inclusive and accessible experiences. AI agents adapt conversations naturally, helping patients feel understood while maintaining consistent service standards across regions and demographics. Multilingual AI communication also helps organizations expand services without needing to build large multilingual support teams.',
  },
  {
    icon: '/images/healthcare/card6.svg',
    title: 'Operational Efficiency Without Additional Headcount',
    description:
      'Scaling patient communication traditionally requires hiring, training, and managing larger teams. AI agents remove that limitation by acting as a scalable communication layer that grows with demand.',
    listTitle: 'Instead of increasing staffing costs, healthcare teams can use AI agents to:',
    bullets: [
      'Automate repetitive administrative calls',
      'Reduce manual scheduling work',
      'Improve call handling efficiency',
      'Lower operational pressure on staff',
    ],
    footer:
      'This creates a more sustainable model for handling growing patient communication volumes.',
  },
];

export const ContentCards = () => {
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  const toggleCard = (index: number) => {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <section className={st.layout}>
      <div className={st.grid}>
        {cards.map((card, index) => {
          const isExpanded = expandedCards.has(index);

          return (
            <motion.div
              key={card.title}
              className={st.card}
              variants={blurInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className={st.iconWrap}>
                <Image src={card.icon} alt={card.title} width={80} height={80} unoptimized />
              </div>
              <h3>{card.title}</h3>

              {isExpanded && (
                <div className={st.expandedContent}>
                  <p className={st.description}>{card.description}</p>
                  {card.listTitle && (
                    <div className={st.listBlock}>
                      <span className={st.listTitle}>{card.listTitle}</span>
                      {card.bullets && (
                        <ul className={st.bullets}>
                          {card.bullets.map((bullet) => (
                            <li key={bullet}>
                              <span className={st.dot} />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                  {card.footer && <p className={st.footer}>{card.footer}</p>}
                </div>
              )}

              <button className={st.toggleBtn} onClick={() => toggleCard(index)} type="button">
                <span>{isExpanded ? 'Show less' : 'Show more'}</span>
                <svg
                  className={`${st.arrow} ${isExpanded ? st.arrowUp : ''}`}
                  width="20"
                  height="10"
                  viewBox="0 0 20 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 1L10 6L15 1"
                    stroke="#535662"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
