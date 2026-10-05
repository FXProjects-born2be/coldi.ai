import Image from 'next/image';

import { getTranslations } from 'next-intl/server';

import { LazyVideo } from '@/shared/ui/components/lazy-video';

import st from './PricingHowWorks.module.scss';

const ITEMS = [
  {
    id: 'intro',
    icon: null,
    video: '/videos/meet-the-team-drive.mp4',
  },
  {
    id: 'renewals',
    icon: '/icons/icon-unnamed-one.svg',
    video: null,
  },
  {
    id: 'claimsIntake',
    icon: '/icons/icon-unnamed-two.svg',
    video: null,
  },
  {
    id: 'crossSell',
    icon: '/icons/icon-unnamed-three.svg',
    video: null,
  },
  {
    id: 'verification',
    icon: '/icons/icon-unnamed-four.svg',
    video: null,
  },
] as const;

export const PricingHowWorks = async () => {
  const t = await getTranslations('PricingHowWorks');

  return (
    <div className={st.pricing_how_works}>
      <div className="container">
        <div className={st.pricing_how_works__list}>
          {ITEMS.map((item) => {
            const isIntro = item.icon === null;

            return (
              <article key={item.id} className={st.pricing_how_works__card}>
                {item.icon && (
                  <div className={st.pricing_how_works__icon}>
                    <Image src={item.icon} alt="" width={24} height={24} aria-hidden="true" />
                  </div>
                )}

                {isIntro ? (
                  <h2 className={st.pricing_how_works__title}>{t(`items.${item.id}.title`)}</h2>
                ) : (
                  <h3 className={st.pricing_how_works__card_title}>
                    {t(`items.${item.id}.title`)}
                  </h3>
                )}

                {t.has(`items.${item.id}.body`) && (
                  <p
                    className={
                      isIntro ? st.pricing_how_works__desc : st.pricing_how_works__card_desc
                    }
                  >
                    {t(`items.${item.id}.body`)}
                  </p>
                )}

                {item.video && (
                  <LazyVideo className={st.pricing_how_works__video} src={item.video} />
                )}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};
