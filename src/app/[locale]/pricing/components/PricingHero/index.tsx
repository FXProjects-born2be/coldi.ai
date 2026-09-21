import { getTranslations } from 'next-intl/server';

import { cn } from '@/shared/lib/helpers';
import { LazyVideo } from '@/shared/ui/components/lazy-video';

import st from './PricingHero.module.scss';

export const PricingHero = async () => {
  const t = await getTranslations('PricingHero');

  return (
    <section className={st.pricing_hero}>
      <div className={cn('container', st.pricing_hero__container)}>
        <div className={st.pricing_hero__header}>
          <h1 className={st.pricing_hero__title}>{t('title')}</h1>

          <p className={st.pricing_hero__desc}>{t('description')}</p>
        </div>
      </div>
      <LazyVideo className={st.pricing_hero__video} src="/videos/pricing-hero.mp4" />
    </section>
  );
};
