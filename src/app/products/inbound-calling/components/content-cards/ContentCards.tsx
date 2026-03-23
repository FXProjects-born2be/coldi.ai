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
    title: 'AI Inbound Contact Center: First-Call Resolution',
    description: (
      <>
        <p>
          Achieving first-call resolution is the primary goal of any inbound call answering service.
          Customers call to get answers, not to be put on hold or transferred between departments.
        </p>
        <p>
          Coldi AI agents identify exactly why a customer is calling, retrieve necessary data from
          your systems, and resolve the request during the very first interaction.
        </p>
      </>
    ),
    listTitle: 'This means:',
    bullets: [
      'Zero hold times for customers.',
      'Fewer transfers to human staff.',
      'Elimination of abandoned calls.',
      'Higher customer satisfaction scores.',
    ],
    footer: (
      <p>
        Our conversational AI systems handle high-volume inbound traffic, such as order tracking,
        scheduling, or basic support, dramatically reducing the burden on your internal teams.
      </p>
    ),
    visual: '/images/inbound-calling/content-card-1.svg',
  },
  {
    title: 'Best Inbound Call Solutions for Modern Teams',
    description: (
      <p>
        The best inbound systems combine low-latency voice, smart intent recognition, and reliable
        infrastructure.
      </p>
    ),
    listTitle: 'Coldi delivers:',
    bullets: [
      'AI voice agents tailored for inbound contact center workflows.',
      'Industry-leading first-call resolution rates.',
      'Infrastructure built for massive call spikes (marketing launches, seasonal peaks).',
      'Seamless integration with your existing tech stack.',
    ],
    footer: (
      <p>
        These capabilities make Coldi better than inbound call center agents for handling
        repetitive, high-volume tasks that require 100% consistency and 24/7 availability.
      </p>
    ),
    visual: '/images/inbound-calling/content-card-2.svg',
    reverse: true,
  },
  {
    title: 'A Smarter Inbound Answering Service',
    description: (
      <p>
        Businesses receive thousands of repetitive inquiries every month. Traditional answering
        services are often expensive and lack the deep integration needed to actually solve customer
        problems.
      </p>
    ),
    listTitle: 'By implementing AI inbound calling, organizations can:',
    bullets: [
      'Respond instantly to every prospect, ensuring no lead is lost to a competitor.',
      'Reduce contact center congestion by filtering out routine queries.',
      'Provide 24/7 assistance without expensive night-shift staffing.',
      'Capture and qualify sales leads before they even reach your sales team.',
    ],
    visual: '/images/inbound-calling/content-card-3.svg',
  },
  {
    title: 'Scalable Infrastructure for Unlimited Inbound Traffic',
    description: (
      <p>
        Scaling a traditional inbound call center traditionally requires significant capital and
        time for hiring. Coldi provides a scalable communication layer that grows instantly with
        your call volume.
      </p>
    ),
    listTitle: 'Teams can:',
    bullets: [
      'Handle peak inquiry periods (like Black Friday or PR events) with ease.',
      'Reduce missed calls from potential high-value clients.',
      'Maintain consistent service quality regardless of how many people are calling at once.',
    ],
    footer: (
      <p>
        This makes AI agents the most reliable inbound call solutions for companies that cannot
        afford to let a single call go to voicemail.
      </p>
    ),
    visual: '/images/inbound-calling/content-card-4.svg',
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

            {row.footer && <div className={st.footer}>{row.footer}</div>}
          </div>

          <div className={st.visualWrap}>
            <Image
              src={row.visual as string}
              alt={row.title}
              width={564}
              height={564}
              unoptimized
            />
          </div>
        </motion.div>
      ))}
    </section>
  );
};
