'use client';

import { type CSSProperties, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { cn } from '@/shared/lib/helpers';
import { BookDemo } from '@/shared/ui/components/book-demo';
import { IconCheck } from '@/shared/ui/icons/IconCheck';
import { IconConnectorArrowFour } from '@/shared/ui/icons/IconConnectorArrowFour';
import { IconConnectorArrowOne } from '@/shared/ui/icons/IconConnectorArrowOne';
import { IconConnectorArrowThree } from '@/shared/ui/icons/IconConnectorArrowThree';
import { IconConnectorArrowTwo } from '@/shared/ui/icons/IconConnectorArrowTwo';

import st from './InsuranceInfo.module.scss';

const AUTO_MS = 5000;

const CONNECTORS = [
  IconConnectorArrowOne,
  IconConnectorArrowTwo,
  IconConnectorArrowThree,
  IconConnectorArrowFour,
] as const;

type InsuranceInfoItem = {
  id: string;
  label: string;
};

type InsuranceInfoProps = {
  items?: InsuranceInfoItem[];
  description?: string;
};

const DEFAULT_ITEMS: InsuranceInfoItem[] = [
  {
    id: 'claims-follow-up',
    label: 'Leads come in faster than your floor can call them',
  },
  {
    id: 'quote-qualification',
    label: "You're paying for traffic that never gets a real conversation",
  },
  {
    id: 'payment-reminders',
    label: "You're expanding into new language markets and don't want to hire locally",
  },
  {
    id: 'document-kyc',
    label:
      "One client cut their calling floor from 60 agents to 25 with flat conversion — that's the kind of shift you're after",
  },
];

const DEFAULT_DESCRIPTION = 'Talk to us about a 30-day pilot on your highest-volume lead source.';

export const InsuranceInfo = ({
  items = DEFAULT_ITEMS,
  description = DEFAULT_DESCRIPTION,
}: InsuranceInfoProps) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const row = rowRef.current;

    if (!row) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        observer.disconnect();
        setInView(true);
        setActiveId(items[0].id);
      },
      { threshold: 0.25 }
    );

    observer.observe(row);

    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    if (!inView || !activeId) return;

    const timeoutId = window.setTimeout(() => {
      setActiveId((current) => {
        if (!current) return items[0].id;

        const index = items.findIndex((item) => item.id === current);

        return items[(index + 1) % items.length].id;
      });
    }, AUTO_MS);

    return () => window.clearTimeout(timeoutId);
  }, [activeId, inView, items]);

  return (
    <section className={st.insurance_info}>
      <div className={'container'}>
        <h2 className={st.insurance_info__title}>Is This You?</h2>

        <div
          ref={rowRef}
          className={st.insurance_info__row}
          style={{ '--insurance-info-fill-duration': `${AUTO_MS}ms` } as CSSProperties}
        >
          <div className={st.insurance_info__left}>
            <ul className={st.insurance_info__list}>
              {items.map((item, index) => {
                const ConnectorIcon = CONNECTORS[index];
                const isActive = inView && item.id === activeId;

                return (
                  <li key={item.id} className={st.insurance_info__item_wrapper}>
                    <div className={cn(st.insurance_info__item, isActive && st.active)}>
                      <span className={st.insurance_info__item_icon}>
                        <IconCheck />
                      </span>
                      <span className={st.insurance_info__item_label}>{item.label}</span>
                    </div>
                    <span
                      className={cn(
                        st.insurance_info__item_connector,
                        isActive && st.insurance_info__item_connector_filling
                      )}
                    >
                      <ConnectorIcon />
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className={st.insurance_info__right}>
            <div className={st.insurance_info__image}>
              <Image
                src={'/images/home/what-can-image-main.png'}
                alt={'Image'}
                fill
                sizes="(max-width: 1024px) 198px, 281px"
              />
            </div>

            <div className={st.insurance_info__right_inner}>
              <div className={st.insurance_info__description}>
                <p>{description}</p>
              </div>

              <div className={st.insurance_info__btn}>
                <BookDemo />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
