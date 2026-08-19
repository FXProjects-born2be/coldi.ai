'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { cn } from '@/shared/lib/helpers';

import st from './HomeManaged.module.scss';

type ManagedTab = {
  id: string;
  title: string;
  description: string;
  image: string;
};

const tabs: ManagedTab[] = [
  {
    id: 'calls',
    title: 'Calls',
    description: 'View call activity, duration, outcomes, and call details.',
    image: '/images/home/managed-one.png',
  },
  {
    id: 'analytics',
    title: 'Analytics',
    description: 'Track call results, response rates, and key performance metrics.',
    image: '/images/home/managed-two.png',
  },
  {
    id: 'agents',
    title: 'Agents',
    description: 'Configure agents, calling settings, scripts, and workflows.',
    image: '/images/home/managed-three.png',
  },
  {
    id: 'leads',
    title: 'Leads',
    description: 'Track leads generated and captured from your calling campaigns.',
    image: '/images/home/managed-four.png',
  },
  {
    id: 'campaign-performance',
    title: 'Campaign Performance',
    description: 'Monitor overall campaign results, efficiency, and outcomes.',
    image: '/images/home/managed-five.png',
  },
];

export const HomeManaged = () => {
  const [activeId, setActiveId] = useState(tabs[0].id);

  const activeTab = tabs.find((tab) => tab.id === activeId) ?? tabs[0];

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1025px)');
    let timer: number | undefined;

    const stop = () => {
      if (timer === undefined) return;
      window.clearInterval(timer);
      timer = undefined;
    };

    const start = () => {
      stop();
      if (!media.matches) return;

      timer = window.setInterval(() => {
        setActiveId((current) => {
          const index = tabs.findIndex((tab) => tab.id === current);
          return tabs[(index + 1) % tabs.length].id;
        });
      }, 2000);
    };

    start();
    media.addEventListener('change', start);

    return () => {
      stop();
      media.removeEventListener('change', start);
    };
  }, []);

  return (
    <section className={st.home_managed}>
      <div className="container">
        <div className={st.home_managed__top}>
          <h2 className={st.home_managed__title}>Managed Beyond Launch</h2>
          <p className={st.home_managed__description}>
            Coldi continuously monitors conversations, analyzes performance, and optimizes every
            workflow to maximize business outcomes.
          </p>
        </div>

        <div className={st.home_managed__panel}>
          <div className={st.home_managed__tabs} role="tablist" aria-label="Managed features">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={tab.id === activeTab.id}
                className={cn(st.home_managed__tab, tab.id === activeTab.id && st.active)}
                onClick={() => setActiveId(tab.id)}
              >
                <span className={st.home_managed__tab_title}>{tab.title}</span>
                <span
                  className={cn(st.home_managed__tab_text, st['home_managed__tab_text--desktop'])}
                >
                  {tab.description}
                </span>
              </button>
            ))}
          </div>

          <div className={st.home_managed__visual}>
            <Image
              src={activeTab.image}
              alt={activeTab.title}
              width={'800'}
              height={'600'}
              loading={'lazy'}
            />

            <div className={st.home_managed__tabs_mobile}>
              <span className={st.home_managed__tab_title}>{activeTab.title}</span>
              <span className={st.home_managed__tab_text}>{activeTab.description}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
