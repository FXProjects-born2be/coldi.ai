'use client';

import { type ReactNode, useState } from 'react';
import Image from 'next/image';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers';

import st from './ContentCards.module.scss';

type Card = {
  icon: string;
  title: string;
  description: ReactNode;
  listTitle?: ReactNode;
  bullets?: string[];
  footer?: ReactNode;
};

const cards: Card[] = [
  {
    icon: '/images/debt-collection/card1.svg',
    title: 'AI Agent First-Call Resolution for Debt Recovery',
    description:
      'Traditional collection workflows rely heavily on repeated manual calls that often go unanswered. AI in debt collection transforms this process by identifying intent and offering repayment options immediately.',
    listTitle: 'This means:',
    bullets: [
      'Faster repayment commitments',
      'Fewer missed connections',
      'Lower operational costs',
      'Better borrower experience',
    ],
    footer:
      'AI agents can also follow up automatically, ensuring debtors receive consistent reminders without overwhelming your team.',
  },
  {
    icon: '/images/debt-collection/card2.svg',
    title: 'Best AI Debt Collection Software for Modern Agencies',
    description:
      'The best AI debt collection software combines intelligent communication, compliance automation, and seamless system integrations.',
    listTitle: 'Coldi delivers:',
    bullets: [
      'Financially trained AI voice agents',
      'Automated repayment conversations',
      'Secure borrower verification workflows',
      'Real-time CRM and collection system integration',
      'Scalable outbound debt recovery campaigns',
    ],
  },
  {
    icon: '/images/debt-collection/card3.svg',
    title: 'AI Voice Agents for Collection Teams',
    description: (
      <>
        <p>
          Collection agencies and financial institutions handle massive call volumes daily: overdue
          payment reminders, settlement negotiations, and balance explanations.
        </p>
        <p>
          AI voice agents automate these interactions while maintaining a professional and
          respectful tone.
        </p>
      </>
    ),
    listTitle: 'By introducing AI debt collection, organizations can:',
    bullets: [
      'Reduce agent workload',
      'Increase successful contact rates',
      'Improve repayment outcomes',
      'Maintain consistent messaging',
    ],
    footer:
      'This makes AI agents especially valuable for collection groups and organizations that rely heavily on phone-based communication.',
  },
  {
    icon: '/images/debt-collection/card4.svg',
    title: 'Better Than Traditional Debt Collection Automation',
    description: (
      <>
        <p>
          Legacy dialers simply place calls. Coldi AI goes further by holding intelligent
          conversations.
        </p>
        <p>
          Our AI can manage thousands of simultaneous interactions while adapting to borrower
          responses.
        </p>
      </>
    ),
    listTitle: 'This allows collection teams to:',
    bullets: [
      'Scale recovery operations instantly',
      'Automate follow-up campaigns',
      'Reduce delinquency resolution time',
      'Focus human agents on complex cases',
    ],
  },
  {
    icon: '/images/debt-collection/card5.svg',
    title: 'Multilingual Debt Recovery for Global Finance',
    description: (
      <>
        <p>
          Financial institutions operate across borders, but language barriers often slow debt
          recovery.
        </p>
        <p>
          With Coldi AI agents, organizations can communicate with borrowers in{' '}
          <strong>30+ languages</strong>, helping expand{' '}
          <strong>credit and debt collection services</strong> globally without building regional
          call centers.
        </p>
      </>
    ),
  },
  {
    icon: '/images/debt-collection/card6.svg',
    title: 'Operational Efficiency Without Increasing Headcount',
    description: (
      <>
        <p>Hiring and training collection agents is expensive and slow.</p>
        <p>AI agents provide a scalable solution that grows with your portfolio.</p>
      </>
    ),
    listTitle: 'Instead of expanding call centers, lenders can:',
    bullets: [
      'Automate payment reminders',
      'Reduce manual follow-ups',
      'Improve debtor contact rates',
      'Lower operational costs',
    ],
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
                  <div className={st.description}>{card.description}</div>
                  {card.listTitle && (
                    <div className={st.listBlock}>
                      <div className={st.listTitle}>{card.listTitle}</div>
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
                  {card.footer && <div className={st.footer}>{card.footer}</div>}
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
