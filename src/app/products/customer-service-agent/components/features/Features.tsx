'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { imageAlt } from '@/shared/constants/page-image-alt';
import { blurInUp } from '@/shared/lib/helpers';

import st from './Features.module.scss';

const cards = [
  {
    icon: '/images/customer-service-agent/feature-always-on.svg',
    title: 'Always-On Engagement',
    description:
      'Provide instant, accurate responses 24/7 across all customer touchpoints. Your business remains responsive and accessible at all times, regardless of time zones or support volume.',
  },
  {
    icon: '/images/customer-service-agent/feature-context.svg',
    title: 'Context-Aware Conversations',
    description:
      'Coldi’s AI agents go beyond keyword matching. They interpret intent, retain conversation history, and apply contextual understanding to resolve issues more effectively and naturally.',
  },
  {
    icon: '/images/customer-service-agent/feature-integrated.svg',
    title: 'Integrated Workflows',
    description:
      'Seamlessly connect AI agents with your CRM, helpdesk, ticketing systems, and internal tools. This ensures every response is informed, actionable, and aligned with your business processes.',
  },
  {
    icon: '/images/customer-service-agent/feature-analytics.svg',
    title: 'Analytics & Insight',
    description:
      'Every interaction is captured and analyzed to generate actionable insights. Track performance, identify trends, and continuously refine your support strategy based on real data.',
  },
  {
    icon: '/images/customer-service-agent/feature-scalability.svg',
    title: 'Seamless Scalability',
    description:
      'Handle thousands of simultaneous interactions without compromising response quality. AI enables you to scale support operations instantly without the limitations of human capacity.',
  },
];

export const Features = () => {
  const topRow = cards.slice(0, 3);
  const bottomRow = cards.slice(3);

  return (
    <section className={st.layout}>
      <motion.h2
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Core Features of Coldi’s AI Customer Service Solution
      </motion.h2>

      <div className={st.rowThree}>
        {topRow.map((card, index) => (
          <motion.article
            key={card.title}
            className={st.card}
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={index * 0.1}
          >
            <div className={st.iconWrap}>
              <Image src={card.icon} alt="" width={96} height={96} unoptimized />
            </div>
            <div className={st.copy}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          </motion.article>
        ))}
      </div>

      <div className={st.rowTwo}>
        {bottomRow.map((card, index) => (
          <motion.article
            key={card.title}
            className={st.card}
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={index * 0.1 + 0.3}
          >
            <div className={st.iconWrap}>
              <Image
                src={card.icon}
                alt={imageAlt('customerServiceAgent')}
                width={96}
                height={96}
                unoptimized
              />
            </div>
            <div className={st.copy}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};
