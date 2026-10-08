'use client';

import { useState } from 'react';
import Image from 'next/image';

import { useTranslations } from 'next-intl';

import { cn } from '@/shared/lib/helpers';

import st from './PricingChooseMinutes.module.scss';

import { processSteps } from '@/app/[locale]/pricing/model/content';

const DESCRIPTION_IDS = ['includes', 'volumes'] as const;

export const PricingChooseMinutes = () => {
  const t = useTranslations('PricingChooseMinutes');
  const [activeIndex, setActiveIndex] = useState(0);
  const canScrollPrev = activeIndex > 0;
  const canScrollNext = activeIndex < processSteps.length - 1;

  const goToStep = (direction: -1 | 1) => {
    setActiveIndex((current) =>
      Math.min(processSteps.length - 1, Math.max(0, current + direction))
    );
  };

  return (
    <section className={st.pricing_choose_minutes}>
      <div className="container">
        <div className={st.pricing_choose_minutes__inner}>
          <h2 className={st.pricing_choose_minutes__title}>{t('title')}</h2>

          <div className={st.pricing_choose_minutes__grid}>
            {processSteps.map((step, index) => (
              <article
                key={step.id}
                className={cn(st.pricing_choose_minutes__card, index === activeIndex && st.active)}
              >
                <div className={st.pricing_choose_minutes__card_inner}>
                  <h3 className={st.pricing_choose_minutes__card_title}>
                    {t(`steps.${step.id}.title`)}
                    <span>{t(`steps.${step.id}.titleSmall`)}</span>
                  </h3>
                  <p className={st.pricing_choose_minutes__card_description}>
                    {t(`steps.${step.id}.description`)}
                  </p>
                </div>
                <div className={st.pricing_choose_minutes__card_bottom}>
                  <span className={st.pricing_choose_minutes__card_number}>
                    {t(`steps.${step.id}.price`)}
                  </span>
                  {t.has(`steps.${step.id}.badge`) ? (
                    <span className={st.pricing_choose_minutes__card_badge}>
                      {t(`steps.${step.id}.badge`)}
                    </span>
                  ) : null}
                </div>
                <Image src="/images/pricing/choose-call.png" fill sizes="370px" alt="image" />
              </article>
            ))}
          </div>

          <div className={st.pricing_choose_minutes__slider}>
            <button
              type="button"
              className={cn(st.pricing_choose_minutes__slider_btn, canScrollPrev && st.can_scroll)}
              aria-label={t('prevStep')}
              disabled={!canScrollPrev}
              onClick={() => goToStep(-1)}
            >
              <Image src="/icons/arrow-left.svg" alt="" width={18} height={18} />
            </button>
            <button
              type="button"
              className={cn(st.pricing_choose_minutes__slider_btn, canScrollNext && st.can_scroll)}
              aria-label={t('nextStep')}
              disabled={!canScrollNext}
              onClick={() => goToStep(1)}
            >
              <Image src="/icons/arrow-right.svg" alt="" width={18} height={18} />
            </button>
          </div>

          <div className={st.pricing_choose_minutes__descriptions}>
            {DESCRIPTION_IDS.map((id) => (
              <p key={id} className={st.pricing_choose_minutes__description}>
                {t(`descriptions.${id}`)}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
