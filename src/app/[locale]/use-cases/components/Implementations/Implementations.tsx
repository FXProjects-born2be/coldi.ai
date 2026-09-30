'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useTranslations } from 'next-intl';

import { cn } from '@/shared/lib/helpers';

import { IMPLEMENTATIONS } from '../../data';
import st from './Implementations.module.scss';

export const UseCasesImplementations = () => {
  const t = useTranslations('UseCasesPage.implementations');
  const [activeId, setActiveId] = useState(IMPLEMENTATIONS[0].id);
  const activeIndex = IMPLEMENTATIONS.findIndex((item) => item.id === activeId);
  const active = IMPLEMENTATIONS[activeIndex] ?? IMPLEMENTATIONS[0];

  const goTo = (direction: -1 | 1) => {
    const nextIndex = (activeIndex + direction + IMPLEMENTATIONS.length) % IMPLEMENTATIONS.length;
    setActiveId(IMPLEMENTATIONS[nextIndex].id);
  };

  return (
    <section id="implementations" className={st.section}>
      <div className={cn('container', st.inner)}>
        <h2 className={st.heading}>{t('heading')}</h2>

        <div className={st.panel}>
          <div className={st.sidebar} role="tablist" aria-label={t('tabsAria')}>
            {IMPLEMENTATIONS.map((item) => {
              const isActive = item.id === active.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={cn(st.sideTab, isActive && st.sideTabActive)}
                  onClick={() => setActiveId(item.id)}
                >
                  {t(`cases.${item.id}.tab`)}
                </button>
              );
            })}
          </div>

          <div className={st.content} key={active.id}>
            <div className={st.contentTop}>
              <div className={st.copy}>
                <div className={st.copyText}>
                  <h3 className={st.title}>{t(`cases.${active.id}.title`)}</h3>
                  <p className={st.description}>{t(`cases.${active.id}.description`)}</p>
                </div>
                <Link href={active.href} className={st.cta}>
                  {t('exploreCta')}
                </Link>
              </div>

              <div className={st.handles}>
                <p className={st.handlesTitle}>{t('handlesTitle')}</p>
                <ul className={st.handlesList}>
                  {active.handles.map((handle) => (
                    <li key={handle.labelKey} className={st.handleItem}>
                      <span className={st.handleIcon}>
                        <Image src={handle.icon} alt="" width={24} height={24} unoptimized />
                      </span>
                      <span className={st.handleLabel}>
                        {t(`cases.${active.id}.handles.${handle.labelKey}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={st.visuals}>
              <div className={st.workflow}>
                <Image
                  src="/images/use-cases-hub/workflow-card.png"
                  alt={t('workflowAlt')}
                  width={624}
                  height={300}
                  className={cn(st.cardImage, st.cardImageDesktop)}
                />
                <Image
                  src="/images/use-cases-hub/workflow-card-mobile.jpg"
                  alt={t('workflowAlt')}
                  width={636}
                  height={1291}
                  className={cn(st.cardImage, st.cardImageMobile)}
                />
              </div>

              <div className={st.integration}>
                <Image
                  src="/images/use-cases-hub/integration-card.jpg"
                  alt={t('integrationAlt')}
                  width={576}
                  height={600}
                  className={cn(st.cardImage, st.cardImageDesktop)}
                  unoptimized
                />
                <Image
                  src="/images/use-cases-hub/integration-card-mobile.jpg"
                  alt={t('integrationAlt')}
                  width={636}
                  height={475}
                  className={cn(st.cardImage, st.cardImageMobile)}
                  unoptimized
                />
              </div>
            </div>
          </div>

          <div className={st.mobileNav}>
            <button
              type="button"
              className={st.navBtn}
              aria-label={t('prevItem')}
              onClick={() => goTo(-1)}
            >
              <Image src="/icons/arrow-left.svg" alt="" width={18} height={18} unoptimized />
            </button>
            <p className={st.navTitle}>{t(`cases.${active.id}.tab`)}</p>
            <button
              type="button"
              className={st.navBtn}
              aria-label={t('nextItem')}
              onClick={() => goTo(1)}
            >
              <Image src="/icons/arrow-right.svg" alt="" width={18} height={18} unoptimized />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
