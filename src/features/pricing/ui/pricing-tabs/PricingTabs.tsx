'use client';

import { useState } from 'react';

import cn from 'classnames';
import { motion } from 'framer-motion';

import { useRequestPricingStore } from '@/features/request-pricing/store/store';
import { RequestDialog } from '@/features/request-pricing/ui/request-dialog/RequestDialog';

import { blurInUp } from '@/shared/lib/helpers/animations';
import { ListCheck } from '@/shared/ui/icons/fill/list-check';
import { Button } from '@/shared/ui/kit/button';

import { getInbound } from '../../model/inbound';
import { getOutbound } from '../../model/outbound';
import type { Package } from '../../model/types';
import st from './PricingTabs.module.scss';

const PricingCard = ({
  item,
  onClick,
  initialFeaturesCount,
}: {
  item: Package;
  onClick: (plan: string) => void;
  initialFeaturesCount: number;
}) => {
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const hasMoreFeatures = item.features.length > initialFeaturesCount;
  const visibleFeatures = showAllFeatures
    ? item.features
    : item.features.slice(0, initialFeaturesCount);

  return (
    <motion.div
      variants={blurInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={st.item}
    >
      <div>
        <div className={st.inner}>
          <div className={st.label}>{item.label}</div>
          <div className={st.details}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
          <h4 className={st.price} dangerouslySetInnerHTML={{ __html: item.price }} />
          <ul className={st.features}>
            {visibleFeatures.map((feature: string, index: number) => (
              <li key={index}>
                <ListCheck />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          {hasMoreFeatures && (
            <button className={st.moreOptions} onClick={() => setShowAllFeatures(!showAllFeatures)}>
              {showAllFeatures ? 'Show Less' : 'More Options'}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="8"
                viewBox="0 0 16 8"
                fill="none"
              >
                <g clipPath="url(#clip0_1003_1022)">
                  <path
                    d="M11.6119 1.63466L12.3185 2.34199L8.46721 6.19466C8.4055 6.25676 8.33211 6.30605 8.25128 6.33968C8.17045 6.37331 8.08376 6.39063 7.99621 6.39063C7.90866 6.39063 7.82197 6.37331 7.74114 6.33968C7.6603 6.30605 7.58692 6.25676 7.52521 6.19466L3.67188 2.34199L4.37854 1.63532L7.99521 5.25132L11.6119 1.63466Z"
                    fill="#4268FF"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1003_1022">
                    <rect width="8" height="16" fill="white" transform="translate(16) rotate(90)" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          )}
        </div>
        <div className={st.button} onClick={() => onClick(item.title)}>
          <Button size="md">Request Now</Button>
        </div>
      </div>
    </motion.div>
  );
};

export const PricingTabs = () => {
  const [activeTab, setActiveTab] = useState('inbound');
  const inbound = getInbound();
  const outbound = getOutbound();
  const [open, setOpen] = useState(false);
  const setPlan = useRequestPricingStore((state) => state.setPlan);

  const onClick = (plan: string) => {
    setOpen(true);
    setPlan(plan);
  };

  return (
    <>
      <section className={st.layout}>
        <div className={`${st.tabs} ${st[activeTab]}`}>
          <button
            onClick={() => setActiveTab('inbound')}
            className={cn(st.tab, { [st.active]: activeTab === 'inbound' })}
          >
            Inbond calls
          </button>
          <button
            onClick={() => setActiveTab('outbound')}
            className={cn(st.tab, { [st.active]: activeTab === 'outbound' })}
          >
            Outbond calls
          </button>
        </div>
        <div className={st.content}>
          {activeTab === 'inbound' && (
            <div className={st.row}>
              {inbound.map((item, index) => (
                <PricingCard
                  key={index}
                  item={item}
                  onClick={onClick}
                  initialFeaturesCount={index === 0 ? 8 : 6}
                />
              ))}
            </div>
          )}
          {activeTab === 'outbound' && (
            <div className={st.row}>
              {outbound.map((item, index) => (
                <PricingCard
                  key={index}
                  item={item}
                  onClick={onClick}
                  initialFeaturesCount={index === 0 ? 6 : 7}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      <RequestDialog open={open} setOpen={setOpen} />
    </>
  );
};
