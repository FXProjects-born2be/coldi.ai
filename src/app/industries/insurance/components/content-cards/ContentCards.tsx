'use client';

import { type ReactNode } from 'react';
import Image from 'next/image';

import { motion } from 'framer-motion';

import { imageAlt } from '@/shared/constants/page-image-alt';
import { blurInUp } from '@/shared/lib/helpers';

import st from './ContentCards.module.scss';

type ContentRow = {
  title: string;
  description: ReactNode;
  listTitle?: string;
  bullets?: string[];
  footer?: ReactNode;
  visual: string;
  reverse?: boolean;
};

const rows: ContentRow[] = [
  {
    title: 'AI Agent First-Call Resolution',
    description:
      'First-call resolution is one of the biggest challenges in the insurance industry. Policyholders frequently call to check claim status, update coverage, or understand their policy. AI agents identify customer intent, retrieve policy information, and resolve many requests during the first interaction.',
    listTitle: 'This means:',
    bullets: [
      'Faster customer support',
      'Fewer transfers between departments',
      'Reduced call center load',
      'Higher policyholder satisfaction',
    ],
    footer:
      'These capabilities align with the growing use of AI in insurance markets, where insurers deploy AI to automate policy inquiries, quotes, and claims interactions.',
    visual: '/images/insurance-agents/content-card1.svg',
  },
  {
    title: 'AI Voice Agents for Insurance Teams',
    description:
      'Insurance providers receive thousands of repetitive customer calls daily: policy inquiries, billing questions, claims updates, and coverage explanations. AI voice agents help reduce this communication burden by automating routine conversations while maintaining natural customer interactions.',
    listTitle: 'By implementing AI for insurance, organizations can:',
    bullets: [
      'Respond instantly to policyholder requests',
      'Reduce call center congestion',
      'Provide 24/7 assistance',
      'Capture and qualify sales leads',
    ],
    footer:
      'Conversational AI systems can resolve up to 70–80% of routine policy inquiries without human intervention, significantly reducing support costs and improving response times.',
    visual: '/images/insurance-agents/content-card2.svg',
    reverse: true,
  },
  {
    title: 'Better than Agentic AI for High-Volume Insurance Communication',
    description:
      'Insurance organizations often struggle with high call volumes during renewals, disaster events, or peak claim periods. Coldi AI agents are built to handle large-scale insurance communication without increasing operational complexity.',
    listTitle: 'Teams can:',
    bullets: [
      'Reduce missed calls from potential policyholders',
      'Improve claim response times',
      'Handle peak inquiry periods efficiently',
      'Maintain consistent service quality',
    ],
    footer:
      'This makes AI agents particularly valuable for insurance carriers that rely heavily on phone-based communication.',
    visual: '/images/insurance-agents/content-card3.svg',
  },
  {
    title: 'Multilingual AI Communication for the Insurance Industry',
    description:
      'Modern insurance providers serve customers across multiple regions and languages. Language barriers can delay claims processing, policy understanding, and customer support. Coldi supports 30+ languages, enabling insurers to provide inclusive, accessible customer service worldwide. Conversational AI in insurance helps organizations expand their reach while maintaining consistent communication standards across markets.',
    visual: '/images/insurance-agents/content-card4.svg',
    reverse: true,
  },
  {
    title: 'Operational Efficiency Without Additional Headcount',
    description:
      'Scaling customer communication in the insurance sector traditionally requires hiring and training additional call center staff. AI agents provide a scalable communication layer that grows with demand.',
    listTitle: 'Insurance teams can:',
    bullets: [
      'Automate repetitive policy inquiries',
      'Reduce manual quote processing',
      'Improve claim intake efficiency',
      'Lower operational costs',
    ],
    footer:
      'Automating routine interactions significantly reduces support costs while allowing human agents to focus on complex cases requiring expertise and empathy.',
    visual: '/images/insurance-agents/content-card5.svg',
  },
  {
    title: 'Reliable Infrastructure for Insurance Communication',
    description:
      'Insurance communication requires reliability, compliance, and accurate data handling. Coldi operates on enterprise-grade telephony infrastructure designed for insurance operations. From call routing to claim documentation and policy updates, every interaction is structured to support artificial intelligence in the insurance sector at scale.',
    listTitle: 'Organizations implementing AI in the insurance industry benefit from:',
    bullets: [
      'Faster claim handling',
      'Lower cost per interaction',
      'Improved customer satisfaction',
      'Scalable customer support systems',
    ],
    visual: '/images/insurance-agents/content-card6.svg',
    reverse: true,
  },
];

export const ContentCards = () => {
  return (
    <section className={st.layout}>
      {rows.map((row, index) => (
        <motion.div
          key={row.title}
          className={`${st.row} ${row.reverse ? st.rowReverse : ''}`.trim()}
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={index * 0.08}
        >
          <div className={st.card}>
            <h3>{row.title}</h3>
            <div className={st.description}>{row.description}</div>

            {row.listTitle && row.bullets && (
              <div className={st.listBlock}>
                <p className={st.listTitle}>{row.listTitle}</p>
                <ul className={st.bullets}>
                  {row.bullets.map((bullet) => (
                    <li key={bullet}>
                      <span className={st.dot} />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {!row.listTitle && row.bullets && (
              <ul className={st.bullets}>
                {row.bullets.map((bullet) => (
                  <li key={bullet}>
                    <span className={st.dot} />
                    {bullet}
                  </li>
                ))}
              </ul>
            )}

            {row.footer && <div className={st.footer}>{row.footer}</div>}
          </div>

          <div className={st.visualWrap}>
            <Image
              src={row.visual}
              alt={imageAlt('insurance', row.title)}
              width={427}
              height={427}
              unoptimized
            />
          </div>
        </motion.div>
      ))}
    </section>
  );
};
