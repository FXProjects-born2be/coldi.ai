'use client';

import { useEffect, useRef, useState } from 'react';

import { useTranslations } from 'next-intl';

import { cn } from '@/shared/lib/helpers';

import st from './PricingProcess.module.scss';

import { processSteps } from '@/app/[locale]/pricing/model/content';

const FIRST_STEP_ID = processSteps[0]?.id;

export const PricingProcess = () => {
  const t = useTranslations('PricingProcess');
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const [openIds, setOpenIds] = useState<Set<string>>(
    () => new Set(FIRST_STEP_ID ? [FIRST_STEP_ID] : [])
  );

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');

    const openAll = () => {
      setOpenIds(new Set(processSteps.map((step) => step.id)));
    };

    if (!media.matches) {
      openAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = (entry.target as HTMLElement).dataset.stepId;
          if (!id) return;

          setOpenIds((current) => {
            if (current.has(id)) return current;
            const next = new Set(current);
            next.add(id);
            return next;
          });
        });
      },
      { threshold: 0, rootMargin: '0px 0px -42% 0px' }
    );

    cardRefs.current.forEach((card, index) => {
      if (!card || index === 0) return;
      observer.observe(card);
    });

    const onMediaChange = (event: MediaQueryListEvent) => {
      if (!event.matches) openAll();
    };

    media.addEventListener('change', onMediaChange);

    return () => {
      observer.disconnect();
      media.removeEventListener('change', onMediaChange);
    };
  }, []);

  if (!processSteps.length) return null;

  return (
    <section className={st.pricing_process}>
      <div className="container">
        <h2 className={st.pricing_process__title}>{t('title')}</h2>

        <div className={st.pricing_process__grid}>
          {processSteps.map((step, index) => (
            <article
              key={step.id}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              data-step-id={step.id}
              className={cn(st.pricing_process__card, openIds.has(step.id) && st.open)}
            >
              <div className={st.pricing_process__card_copy}>
                <div>
                  <h3 className={st.pricing_process__card_title}>{t(`steps.${step.id}.title`)}</h3>
                  <p className={st.pricing_process__card_description}>
                    {t(`steps.${step.id}.description`)}
                  </p>
                </div>
              </div>
              <span className={st.pricing_process__card_number}>{step.number}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
