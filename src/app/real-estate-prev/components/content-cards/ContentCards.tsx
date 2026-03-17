'use client';

import { type ReactNode } from 'react';
import Image from 'next/image';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers';

import st from './ContentCards.module.scss';

type ContentRow = {
  title: string;
  description: ReactNode;
  listTitle?: string;
  bullets?: string[];
  footer?: ReactNode;
  visual: ReactNode;
  reverse?: boolean;
};

const rows: ContentRow[] = [
  {
    title: 'AI Agent First-Call Resolution',
    description:
      'In the fast-paced property market, speed is everything. Potential buyers often call to check availability, confirm square footage, or ask about school districts. AI agents for realtors identify caller intent, retrieve property data, and resolve most inquiries during the very first interaction.',
    listTitle: 'This means:',
    bullets: [
      'Faster lead conversion',
      'Fewer missed opportunities on hot listings',
      'Reduced administrative load for busy brokers',
      'Higher client satisfaction for sellers seeing active engagement',
    ],
    visual: '/images/real-estate/content-card1.svg',
  },
  {
    title: 'Best AI for Real Estate Agents',
    description:
      'The best AI tools for real estate agents combine deep conversational intelligence with real-world real estate workflows and reliable voice tech.',
    listTitle: 'Coldi AI delivers:',
    bullets: [
      'AI voice agents tailored for property management and sales.',
      'High qualification rates for incoming buyer leads.',
      'Scalable infrastructure that handles "listing spikes" effortlessly.',
      'Seamless integration with major real estate CRM and MLS tools.',
    ],
    footer:
      'These capabilities align with the rapid shift toward AI for real estate leads, where top-performing teams use automation to dominate their local market.',
    visual: '/images/real-estate/content-card2.svg',
    reverse: true,
  },
  {
    title: 'AI Voice Agents for Real Estate Teams',
    description: (
      <>
        <p>
          {
            'Agencies receive hundreds of repetitive calls: "Is this still available?", "What\'s the Homeowners Association (HOA) fee?", and "Can I see it Saturday?"'
          }
        </p>
        <p>
          AI voice agents for real estate eliminate this communication bottleneck by automating
          routine discovery calls while keeping the interaction warm and professional. By
          implementing AI for realtors, you can:
        </p>
      </>
    ),
    bullets: [
      'Respond instantly to potential buyers',
      'Provide 24/7 assistance even on holidays and weekends',
      'Capture and qualify every outbound and inbound lead',
    ],
    footer:
      'Conversational systems can handle up to 80% of routine inquiries without a human agent, allowing your team to spend their time at the closing table.',
    visual: '/images/real-estate/content-card3.svg',
  },
  {
    title: 'Multilingual Communication for Global Markets',
    description: (
      <>
        <p>{"Modern real estate is international. Language barriers shouldn't stop a sale."}</p>
        <p>
          Coldi supports 30+ languages, enabling agents to provide inclusive, high-tier service to
          international investors and local non-native speakers alike. Replacing real estate
          friction with AI helps your brand stand out as a global-ready agency.
        </p>
      </>
    ),
    visual: '/images/real-estate/content-card4.svg',
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
              src={row.visual as string}
              alt={row.title}
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
