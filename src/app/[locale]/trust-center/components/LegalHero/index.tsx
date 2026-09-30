import Image from 'next/image';

import { getTranslations } from 'next-intl/server';

import { cn } from '@/shared/lib/helpers';

import st from './LegalHero.module.scss';

export const LegalHero = async () => {
  const t = await getTranslations('LegalHero');

  return (
    <section className={cn('hero-shadow hero-shadow-two', st.legal_hero)}>
      <Image
        className={st.legal_hero__bg}
        src="/images/legal/legal-hero.jpg"
        alt="Image"
        fill
        sizes="100vw"
        aria-hidden
      />
      <div className={cn('container', st.legal_hero__container)}>
        <h1 className={st.legal_hero__title}>{t('title')}</h1>
        <p className={st.legal_hero__desc}>{t('description')}</p>
      </div>
    </section>
  );
};
