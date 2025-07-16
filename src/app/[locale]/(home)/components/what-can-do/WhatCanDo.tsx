'use client';

import { motion } from 'framer-motion';
import type { JSX } from 'react';

import { blurInUp } from '@/shared/lib/helpers/animations';
import { CalendarIcon } from '@/shared/ui/icons/outline/calendar';
import { CheckListIcon } from '@/shared/ui/icons/outline/check-list';
import { DollarIcon } from '@/shared/ui/icons/outline/dollar';
import { FilterIcon } from '@/shared/ui/icons/outline/filter';
import { HornIcon } from '@/shared/ui/icons/outline/horn';
import { LoginIcon } from '@/shared/ui/icons/outline/login';
import { PhoneIcon } from '@/shared/ui/icons/outline/phone';
import { RobotIcon } from '@/shared/ui/icons/outline/robot';

import st from './WhatCanDo.module.scss';

const card = [
  {
    icon: FilterIcon,
    name: 'Lead Qualification at Scale',
    text: "With Coldi's voice agent, automatically identify high-potential prospects. Engage every lead instantly.s",
  },
  {
    icon: CheckListIcon,
    name: 'Survey & Feedback Collection',
    text: 'Capture valuable feedback and customer insights through natural conversations. Coldi runs post-sale surveys, product reviews, and service follow-ups.',
  },
  {
    icon: CalendarIcon,
    name: 'Appointment Setting & Follow-Up',
    text: 'Coldi schedules real-time meetings with prospects and sends confirmations and reminders.',
  },
  {
    icon: LoginIcon,
    name: 'Abandoned Lead Recovery',
    text: 'Bring cold leads back to life. Coldi follows up with inactive prospects, answers objections, and reactivates interest.s',
  },
  {
    icon: RobotIcon,
    name: 'Customer Service Automation',
    text: 'Reduce support load by letting Coldi handle common requests. From order status to policy explanations, Coldi answers instantly, consistently, and around the clock.',
  },
  {
    icon: PhoneIcon,
    name: 'Inbound Call Reception',
    text: "Let Coldi handle the first contact. Whether it's a service request, callback, or FAQ – Coldi welcomes inbound calls, handles basic queries, and routes calls.",
  },
  {
    icon: DollarIcon,
    name: 'Debt Collection Calls',
    text: 'Coldi delivers sensitive outbound messages precisely and calmly, following compliant scripts to remind customers of overdue payments.',
  },
  {
    icon: HornIcon,
    name: 'Product or Service Introduction',
    text: 'Do you need to introduce a new product? Coldi delivers compelling, consistent, brand-trained messaging that captures interest and drives action at scale.',
  },
];

export const WhatCanDo = () => (
  <section className={st.layout}>
    <motion.h2 variants={blurInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      What Coldi Can <br /> <span className={st.highlighted}>Do for Your Business</span>
    </motion.h2>
    <section className={st.cards}>
      {card.map((item) => (
        <Card key={item.name} {...item} />
      ))}
    </section>
  </section>
);

const Card = ({
  icon: Icon,
  name,
  text,
}: {
  icon: () => JSX.Element;
  name: string;
  text: string;
}) => (
  <article className={st.card}>
    <div className={st.card__content}>
      <h3>
        <Icon /> <span>{name}</span>
      </h3>
      <p>{text}</p>
    </div>
  </article>
);
