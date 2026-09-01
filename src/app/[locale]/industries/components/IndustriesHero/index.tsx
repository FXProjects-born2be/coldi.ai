import { getTranslations } from 'next-intl/server';

import { cn } from '@/shared/lib/helpers';
import { BookDemo } from '@/shared/ui/components/book-demo';
import { IconWave } from '@/shared/ui/IconWave';

import st from './IndustriesHero.module.scss';

export const IndustriesHero = async () => {
  const t = await getTranslations('IndustriesHero');

  return (
    <section className={st.industries_hero}>
      <div className={cn('container', st.industries_hero__container)}>
        <h1 className={st.industries_hero__title}>
          {t('title')} <span>{t('titleHighlight')}</span>
        </h1>

        <p className={st.industries_hero__description}>{t('description')}</p>

        <BookDemo className={cn('btn-primary', st.industries_hero__btn)} />
      </div>

      <div className={st.industries_hero__wave}>
        <IconWave />
      </div>
    </section>
  );
};
