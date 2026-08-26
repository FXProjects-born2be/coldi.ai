'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { imageAlt } from '@/shared/constants/page-image-alt';
import { blurInUp } from '@/shared/lib/helpers';

import st from './Why.module.scss';

type WhySection = {
  title: string;
  intro?: string;
  bullets: string[];
  footer?: string;
  visual: string;
  reverse?: boolean;
};

const sections: WhySection[] = [
  {
    title: 'Fully Managed - Not Just a VoIP Provider',
    bullets: [
      'Complete setup of your VoIP phone system handled by Coldi.',
      'Phone numbers, routing, and integrations configured for you.',
      'AI-powered call handling built into the system.',
      'Ongoing optimization and support from our team.',
      'No need to manage multiple VoIP providers or tools.',
    ],
    visual: '/images/voip-phone-service/why-1.png',
  },
  {
    title: 'Business VoIP Phone Service Built for Scale',
    intro:
      'Traditional systems limit growth. Coldi provides a business VoIP phone service that scales instantly with your operations.',
    bullets: [
      'Unlimited concurrent calls.',
      'Cloud-based infrastructure.',
      'No physical hardware required.',
      'Works across devices desktop, mobile, and CRM.',
    ],
    visual: '/images/voip-phone-service/why-2.png',
    reverse: true,
  },
  {
    title: 'Smart VoIP Caller with AI Capabilities',
    intro: 'Every VoIP caller interaction becomes intelligent.',
    bullets: [
      'AI answers and routes calls instantly.',
      'Understands intent and responds naturally.',
      'Qualifies leads and handles support requests.',
      'Transfers complex cases to human agents.',
    ],
    visual: '/images/voip-phone-service/why-3.png',
  },
  {
    title: 'VoIP International Calls Without Complexity',
    intro: 'Expand globally with VoIP international calls built into your system.',
    bullets: [
      'Call and receive calls worldwide.',
      'Local and international numbers available.',
      'Consistent quality across regions.',
      'No need for multiple regional providers.',
    ],
    visual: '/images/voip-phone-service/why-4.png',
    reverse: true,
  },
  {
    title: 'Seamless Integrations',
    intro: 'Your VoIP phone system connects directly to your tools:',
    bullets: [
      'CRM systems.',
      'Helpdesk platforms.',
      'Calendars and scheduling tools.',
      'Internal databases.',
    ],
    footer: 'Every call becomes structured data and actionable insight.',
    visual: '/images/voip-phone-service/why-5.png',
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
            Why VoIP Phone Service
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
                {section.intro && <p className={st.lead}>{section.intro}</p>}
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                {section.footer && <p>{section.footer}</p>}
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
                  alt={imageAlt('voipPhoneService')}
                  width={564}
                  height={564}
                  unoptimized
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
