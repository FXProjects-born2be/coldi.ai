'use client';

import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers';

import st from './IndustryCards.module.scss';

const industries = [
  {
    image: '/images/industries/card-call-centers.png',
    title: 'Call Centers',
    description: (
      <>
        <p>
          <Link href="#">AI voice agents empower call centers</Link> to reach peak efficiency by
          managing thousands of concurrent calls, effectively eliminating wait times.
        </p>
        <p>
          Unlike traditional systems, these agents provide instant, 24/7 support without delays.
        </p>
        <p>
          By automating high-volume interactions, organizations can slash operational costs,
          accelerate response speeds, and deliver a consistently superior customer experience while
          scaling effortlessly.
        </p>
      </>
    ),
    cta: 'Explore Call Center Solution',
    href: '#',
  },
  {
    image: '/images/industries/card-forex.png',
    title: 'Forex & Trading Platforms',
    description: (
      <>
        <p>
          Our AI voice agents serve as a 24/7 support layer, assisting traders with platform
          navigation, account inquiries, and complex verification processes (KYC).
        </p>
        <p>
          This allows account managers and advisory teams to pivot their focus toward high-value
          risk management and personalized client consulting.
        </p>
        <p>
          Traders gain real-time access to account balances and market updates through natural
          dialogue, ensuring premium support even during periods of extreme market volatility.
        </p>
      </>
    ),
    cta: 'Explore Trading Solution',
    href: '#',
  },
  {
    image: '/images/industries/card-debt.png',
    title: 'Credit & Debt Collection',
    description: (
      <>
        <p>
          AI transforms <Link href="/debt-collection">debt recovery</Link> by automating routine
          outreach, including payment reminders, installment discussions, and balance inquiries.
        </p>
        <p>
          This shift enables collection teams to focus on sensitive, high-stakes negotiations that
          require a human touch. Operating with strict compliance, these agents manage thousands of
          simultaneous borrower interactions, significantly increasing recovery rates and ensuring
          no repayment opportunity is overlooked.
        </p>
      </>
    ),
    cta: 'Explore Debt Collection Solution',
    href: '/industries/debt-collection',
  },
  {
    image: '/images/industries/card-insurance.png',
    title: 'Insurance',
    description: (
      <>
        <p>
          From instant quote generation to complex policy inquiries, AI voice agents are built for
          the fast-paced <Link href="/industries/insurance">insurance industry</Link>.
        </p>
        <p>
          They streamline the claims process by guiding policyholders through documentation with
          precision, reducing emotional friction and accelerating settlements.
        </p>
        <p>
          Engineered with enterprise-grade security, these agents securely verify identities and
          process sensitive data, maintaining a high-efficiency workflow for high-volume
          administrative tasks.
        </p>
      </>
    ),
    cta: 'Explore Insurance Solution',
    href: '/industries/insurance',
  },
  {
    image: '/images/industries/card-healthcare.png',
    title: 'Healthcare',
    description: (
      <>
        <p>
          AI voice agents optimize patient coordination by managing appointment scheduling,
          prescription refills, and post-discharge follow-ups.
        </p>
        <p>
          By handling these high-volume administrative workflows with HIPAA-compliant security, they
          reduce &quot;no-show&quot; rates and free up medical staff to focus on clinical care.
        </p>
        <p>
          Patients receive immediate, compassionate responses, ensuring a seamless journey from the
          first call to the final recovery stage.
        </p>
      </>
    ),
    cta: 'Explore Healthcare Solution',
    href: '/industries/healthcare',
  },
  {
    image: '/images/industries/card-real-estate.png',
    title: 'Real Estate',
    description: (
      <>
        <p>
          The <Link href="/industries/real-estate">real estate market</Link> never sleeps, and
          neither should your lead engagement. Our AI agents qualify prospects through fluid,
          natural dialogue, answering property specifications and booking viewings directly into
          your calendar.
        </p>
        <p>
          By pulling real-time market data and cross-referencing caller preferences with current
          listings, these agents act as a scalable extension of your team. They turn cold inquiries
          into &quot;ready-to-sign&quot; leads while maintaining a consistent professional brand
          voice within your CRM.
        </p>
      </>
    ),
    cta: 'Explore Real Estate Solution',
    href: '/industries/real-estate',
  },
];

export const IndustryCards = () => {
  return (
    <section className={st.layout}>
      <div className={st.grid}>
        {industries.map((industry, index) => (
          <motion.div
            key={industry.title}
            className={st.card}
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={index * 0.05}
          >
            <div className={st.cardImage}>
              <Image
                src={industry.image}
                alt={industry.title}
                width={540}
                height={245}
                unoptimized
              />
            </div>
            <div className={st.cardContent}>
              <div className={st.cardText}>
                <h3>{industry.title}</h3>
                <div className={st.cardDescription}>{industry.description}</div>
              </div>
              <Link href={industry.href} className={st.cardButton}>
                {industry.cta}
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
