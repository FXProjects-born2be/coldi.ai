'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers';

import st from './Why.module.scss';

type WhyVisualVariant =
  | 'managed'
  | 'conversations'
  | 'payments'
  | 'routing'
  | 'logging'
  | 'compliance'
  | 'multilingual';

type Feature = {
  title: string;
  description?: string;
  listTitle?: string;
  bullets?: string[];
  footer?: string;
  visual: WhyVisualVariant;
  illustration?: string;
};

const features: Feature[] = [
  {
    title: 'Fully Managed - No IT Team Required',
    bullets: [
      'End-to-end setup and implementation handled by Coldi.',
      'Secure integrations with your CRM, billing platforms, and collection systems.',
      'AI voice workflows, compliance logic, and automation managed entirely by Coldi.',
      'Launch powerful AI debt collection software without building internal infrastructure.',
    ],
    visual: 'managed',
    illustration: '/images/debt-collection/why-1.png',
  },
  {
    title: 'Intelligent AI Debt Collection Conversations',
    description:
      "Coldi's AI debt collection agents understand borrower intent, handle payment discussions professionally, and guide customers through repayment options. \n\nInstead of aggressive manual calls, AI uses structured, compliant conversations that increase engagement and recovery rates.",
    visual: 'conversations',
    illustration: '/images/debt-collection/why-2.png',
  },
  {
    title: 'Smart Payment Resolution',
    description: 'AI agents can:',
    bullets: [
      'Explain outstanding balances',
      'Offer payment plans',
      'Send secure payment links',
      'Confirm scheduled repayments',
      'Update borrower contact information',
    ],
    footer: 'This dramatically reduces manual work for collection teams.',
    visual: 'payments',
    illustration: '/images/debt-collection/why-3.png',
  },
  {
    title: 'Context-Aware Routing',
    description:
      'High-risk accounts or sensitive situations are automatically routed to human agents, while AI handles routine conversations.',
    listTitle: 'Routing can be based on:',
    bullets: ['Debt size', 'Payment history', 'Delinquency stage', 'Customer sentiment'],
    visual: 'routing',
    illustration: '/images/debt-collection/why-4.png',
  },
  {
    title: 'Instant CRM & Collection System Logging',
    description:
      'Every interaction is automatically documented and synced with platforms such as Salesforce, HubSpot, or custom debt management systems.',
    listTitle: 'This ensures:',
    bullets: ['Complete audit trails', 'Accurate case records', 'Regulatory compliance'],
    visual: 'logging',
    illustration: '/images/debt-collection/why-5.png',
  },
  {
    title: 'Automated Compliance & Verification',
    description:
      'AI agents verify borrower identity before discussing account details and follow predefined compliance rules required in credit and debt collection services.',
    listTitle: 'Secure workflows ensure:',
    bullets: [
      'Identity verification',
      'Call recording',
      'Consistent regulatory language',
      'Audit-ready records',
    ],
    visual: 'compliance',
    illustration: '/images/debt-collection/why-6.png',
  },
  {
    title: 'Multilingual Borrower Communication',
    description:
      'Debt collection often involves diverse populations. Coldi AI supports 30+ languages, enabling agencies and lenders to communicate effectively across regions. \n\nNatural, human-like conversations increase repayment cooperation and reduce disputes.',
    visual: 'multilingual',
    illustration: '/images/debt-collection/why-7.png',
  },
];

export const Why = () => {
  return (
    <section className={st.layout}>
      <motion.h2
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Why Coldi AI Agents for Debt Collection
      </motion.h2>

      <div className={st.features}>
        {features.map((feature, index) => {
          const isReversed = index % 2 !== 0;

          return (
            <motion.div
              key={feature.title}
              className={`${st.featureRow} ${isReversed ? st.reversed : ''}`}
              variants={blurInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className={st.card}>
                <h3>{feature.title}</h3>
                {feature.description && (
                  <p
                    dangerouslySetInnerHTML={{
                      __html: feature.description.replace(/\n/g, '<br />'),
                    }}
                  />
                )}
                {feature.listTitle && <p>{feature.listTitle}</p>}
                {feature.bullets && (
                  <ul className={st.bullets}>
                    {feature.bullets.map((bullet) => (
                      <li key={bullet}>
                        <span className={st.dot} />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
                {feature.footer && <p>{feature.footer}</p>}
              </div>
              <div className={st.illustration}>
                <Image
                  src={feature.illustration || ''}
                  alt={feature.title}
                  width={564}
                  height={564}
                  unoptimized
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
