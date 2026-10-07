import { Fragment } from 'react';
import Image from 'next/image';

import { getTranslations } from 'next-intl/server';

import { cn } from '@/shared/lib/helpers';
import { LazyVideo } from '@/shared/ui/components/lazy-video';

import st from './PricingHero.module.scss';

const STEP_IDS = ['plan', 'minutes', 'integrations'] as const;

const DESKTOP_CONNECTORS = [
  { src: '/icons/pricing-connector-line.svg', sizes: '63px' },
  { src: '/icons/pricing-connector-line-second.svg', sizes: '85px' },
] as const;

const CHECKMARK_ICON = '/icons/fluent_checkmark-circle-12-filled-blue.svg';
const MOBILE_CONNECTOR_ICON = '/icons/pricing-connector-line-mobile.svg';

export const PricingHero = async () => {
  const t = await getTranslations('PricingHero');
  const iconAlt = t('iconAlt');

  return (
    <section className={st.pricing_hero}>
      <div className={cn('container', st.pricing_hero__container)}>
        <div className={st.pricing_hero__header}>
          <h1 className={st.pricing_hero__title}>{t('title')}</h1>

          <div className={st.pricing_hero__row}>
            {STEP_IDS.map((stepId, index) => (
              <Fragment key={stepId}>
                <div className={st.pricing_hero__item}>
                  <div className={st.pricing_hero__item_icon}>
                    <Image src={CHECKMARK_ICON} fill sizes="19px" alt={iconAlt} />
                  </div>
                  <p className={st.pricing_hero__item_description}>{t(`steps.${stepId}`)}</p>
                  {index < STEP_IDS.length - 1 ? (
                    <div
                      className={cn(
                        st.pricing_hero__item_connector_mobile,
                        index === 1 && st.pricing_hero__item_connector_mobile_second
                      )}
                    >
                      <Image src={MOBILE_CONNECTOR_ICON} fill sizes="306" alt={iconAlt} />
                    </div>
                  ) : null}
                </div>

                {index < DESKTOP_CONNECTORS.length ? (
                  <div className={st.pricing_hero__item_connector}>
                    <Image
                      src={DESKTOP_CONNECTORS[index].src}
                      fill
                      sizes={DESKTOP_CONNECTORS[index].sizes}
                      alt={iconAlt}
                    />
                  </div>
                ) : null}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
      <LazyVideo className={st.pricing_hero__video} src="/videos/pricing-hero.mp4" />
    </section>
  );
};
