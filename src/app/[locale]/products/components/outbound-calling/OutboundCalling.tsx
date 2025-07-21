'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers/animations';
import { ChevronDownIcon } from '@/shared/ui/icons/outline/chevron-down';
import { Button } from '@/shared/ui/kit/button';

import st from './OutboundCalling.module.scss';

export const OutboundCalling = () => {
  const [activeTab, setActiveTab] = useState(0);

  const data = [
    {
      title: 'Unlimited Global Dialing',
      desc: 'Reach thousands across time zones. Coldi works non-stop without losing tone or quality.',
    },
    {
      title: 'Calendar Integration',
      desc: 'Books appointments instantly while syncing with your team’s schedule in real time.',
    },
    {
      title: 'Intent Recognition',
      desc: 'Understands tone and intent to adjust pitch, pace, and script in the moment.',
    },
    {
      title: 'Sales-Focused Delivery',
      desc: 'Uses persuasive, brand-matched language to turn cold leads into active interest.',
    },
    {
      title: 'Consistency at Scale',
      desc: 'Never gets tired: every call is delivered with the same professionalism and energy.',
    },
  ];

  return (
    <section className={st.layout}>
      <motion.h2
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Outbound Calling, <br />
        <span className={st.highlighted}>Done Right - 24/7, Worldwide</span>
      </motion.h2>
      <motion.p
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={st.desc}
      >
        Coldi handles your outreach at scale - any time zone, any volume, no burnout. From lead gen
        to follow-ups, Coldi makes every call sound human, relevant, and timely - day or night,
        wherever your market is.
      </motion.p>
      <div className={st.row}>
        <div className={st.col}>
          {data.map((item, index) => (
            <motion.div
              variants={blurInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={st.tab}
              key={index}
              onClick={() => setActiveTab(index)}
            >
              <div className={`${st.tabContent} ${activeTab === index ? st.active : ''}`}>
                <div className={st.tabHeader}>
                  <h3>{item.title}</h3>
                  <ChevronDownIcon />
                </div>
                <p
                  className={st.tabDesc}
                  style={{ display: activeTab === index ? 'block' : 'none' }}
                >
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
          <motion.div
            className={st.btn}
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Link href="/pricing">
              <motion.div
                variants={blurInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Button size="md">Check Pricing</Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
        <motion.div
          className={st.img}
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Image
            src={'/images/products/calling.png'}
            alt="Outbound Calling"
            width={509}
            height={490}
          />
        </motion.div>
      </div>
    </section>
  );
};
