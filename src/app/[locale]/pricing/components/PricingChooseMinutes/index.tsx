'use client';

import Image from 'next/image';

import { useTranslations } from 'next-intl';

import st from './PricingChooseMinutes.module.scss';

import { processSteps } from '@/app/[locale]/pricing/model/content';

export const PricingChooseMinutes = () => {
  const t = useTranslations('PricingChooseMinutes');

  return (
    <section className={st.pricing_choose_minutes}>
      <div className="container">
        <h2 className={st.pricing_choose_minutes__title}>{t('title')}</h2>

        <div className={st.pricing_choose_minutes__grid}>
          {processSteps.map((step) => (
            <article key={step.id} className={st.pricing_choose_minutes__card}>
              <div className={st.pricing_choose_minutes__card_inner}>
                {t.has(`steps.${step.id}.badge`) ? (
                  <div className={st.pricing_choose_minutes__card_badge}>
                    <p>{t(`steps.${step.id}.badge`)}</p>
                  </div>
                ) : (
                  <div />
                )}

                <div>
                  <h3 className={st.pricing_choose_minutes__card_title}>
                    {t(`steps.${step.id}.title`)}
                    <span>{t(`steps.${step.id}.titleSmall`)}</span>
                  </h3>
                  <p className={st.pricing_choose_minutes__card_description}>
                    {t(`steps.${step.id}.description`)}
                  </p>
                </div>
              </div>
              <span className={st.pricing_choose_minutes__card_number}>
                {t(`steps.${step.id}.price`)}
              </span>
              <Image src="/images/pricing/choose-call.png" fill sizes="370px" alt="image" />
            </article>
          ))}
        </div>

        <p className={st.pricing_choose_minutes__description}>{t('description')}</p>
      </div>
    </section>
  );
};
