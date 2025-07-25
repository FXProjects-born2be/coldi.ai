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
import st from './PricingTabs.module.scss';

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
                <motion.div
                  variants={blurInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className={st.item}
                  key={index}
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
                        {item.features.map((feature, index) => (
                          <li key={index}>
                            <ListCheck />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className={st.button} onClick={() => onClick(item.title)}>
                      <Button size="md">Request Now</Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          {activeTab === 'outbound' && (
            <div className={st.row}>
              {outbound.map((item, index) => (
                <motion.div
                  variants={blurInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className={st.item}
                  key={index}
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
                        {item.features.map((feature, index) => (
                          <li key={index}>
                            <ListCheck />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className={st.button} onClick={() => onClick(item.title)}>
                      <Button size="md">Request Now</Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
      <RequestDialog open={open} setOpen={setOpen} />
    </>
  );
};
