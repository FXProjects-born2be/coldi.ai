'use client';

import { useState } from 'react';
import Image from 'next/image';

import { useTranslations } from 'next-intl';

import { cn } from '@/shared/lib/helpers';

import st from './PricingSpecializedServices.module.scss';

import { services } from '@/app/[locale]/pricing/model/content';
import { Link } from '@/i18n/navigation';

export const PricingSpecializedServices = () => {
  const t = useTranslations('SpecializedServices');
  const [activeId, setActiveId] = useState(services[0]?.id);
  const activeIndex = services.findIndex((item) => item.id === activeId);
  const activeService = services[activeIndex] ?? services[0];

  if (!activeService) return null;

  const goToService = (direction: -1 | 1) => {
    const nextIndex = (activeIndex + direction + services.length) % services.length;
    const next = services[nextIndex];
    if (!next) return;
    setActiveId(next.id);
  };

  return (
    <section className={st.pricing_services}>
      <div className="container">
        <h2 className={st.pricing_services__title}>{t('title')}</h2>

        <div className={st.pricing_services__grid}>
          {services.map((service) => (
            <article
              key={service.id}
              className={cn(
                st.pricing_services__card,
                service.id === activeService.id && st.active
              )}
            >
              <Image
                className={st.pricing_services__card_bg}
                src={service.hoverBg}
                alt=""
                fill
                aria-hidden
                sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className={st.pricing_services__card_body}>
                <h3 className={st.pricing_services__card_title}>
                  {t(`services.${service.id}.title`)}
                </h3>
                <p className={st.pricing_services__card_description}>
                  {t(`services.${service.id}.description`)}
                </p>
              </div>

              <div className={st.pricing_services__card_body}>
                <div className={st.pricing_services__price}>
                  <p className={st.pricing_services__price_label}>{t('priceLabel')}</p>
                  <p className={st.pricing_services__price_value}>
                    {t(`services.${service.id}.price`)}
                  </p>
                </div>

                <Link href="/calendar" className={cn('btn', st.pricing_services__btn)}>
                  {t('cta')}
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className={st.pricing_services__slider}>
          <button
            type="button"
            className={st.pricing_services__slider_btn}
            aria-label={t('prevService')}
            onClick={() => goToService(-1)}
          >
            <Image src="/icons/arrow-left.svg" alt="" width={18} height={18} />
          </button>
          <p className={st.pricing_services__slider_label}>
            {t(`services.${activeService.id}.tab`)}
          </p>
          <button
            type="button"
            className={st.pricing_services__slider_btn}
            aria-label={t('nextService')}
            onClick={() => goToService(1)}
          >
            <Image src="/icons/arrow-right.svg" alt="" width={18} height={18} />
          </button>
        </div>
      </div>
    </section>
  );
};
