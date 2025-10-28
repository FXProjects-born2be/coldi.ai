'use client';
import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers/animations';

import st from './Tools.module.scss';

const card = [
  {
    image: '/images/home/tools/twilio.svg',
    alt: 'Twilio',
    href: 'https://twilio.com/',
  },
  {
    image: '/images/home/tools/hubspot.svg',
    alt: 'HubSpot',
    href: 'https://hubspot.com/',
  },
  {
    image: '/images/home/tools/housecall.svg',
    alt: 'HouseCall',
    href: 'https://housecallpro.com/',
  },
  {
    image: '/images/home/tools/n8n.svg',
    alt: 'N8N',
    href: 'https://n8n.io/',
  },
  {
    image: '/images/home/tools/calendly.svg',
    alt: 'Calendly',
    href: 'https://calendly.com/',
  },
  {
    image: '/images/home/tools/slack.svg',
    alt: 'Slack',
    href: 'https://slack.com/',
  },
  {
    image: '/images/home/tools/zapier.svg',
    alt: 'Zapier',
    href: 'https://zapier.com/',
  },
  {
    image: '/images/home/tools/google-sheets.svg',
    alt: 'Google Sheets',
    href: 'https://google.com/sheets/about/',
  },
  {
    image: '/images/home/tools/sendgrid.svg',
    alt: 'SendGrid',
    href: 'https://sendgrid.com/',
  },
];

export const Tools = () => (
  <section className={st.layout}>
    <motion.h2 variants={blurInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      Coldi is Already Integrated <br />
      <span className={st.highlighted}>with Leading Business Tools</span>
    </motion.h2>
    <section className={st.cards}>
      {card.map((item) => (
        <Link
          href={item.href}
          key={item.alt}
          className={st.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={item.image} alt={item.alt} width={100} height={100} unoptimized />
        </Link>
      ))}
    </section>
  </section>
);
