import Image from 'next/image';

import { getTranslations } from 'next-intl/server';

import { cn } from '@/shared/lib/helpers';
import { BookDemo } from '@/shared/ui/components/book-demo';

import st from './FaqHero.module.scss';

export const FaqHero = async () => {
  const t = await getTranslations('FaqHero');

  return (
    <section className={cn('hero-shadow hero-shadow-two', st.faq_hero)}>
      <Image
        className={st.faq_hero__bg}
        src="/images/legal/legal-hero.jpg"
        alt="Image"
        fill
        sizes="100vw"
        aria-hidden
      />
      <div className={cn('container', st.faq_hero__container)}>
        <h1 className={st.faq_hero__title}>{t('title')}</h1>
        <p className={st.faq_hero__desc}>{t('description')}</p>

        <p className={st.faq_hero__updated}>{t('lastUpdated')}</p>

        <BookDemo />
      </div>
    </section>
  );
};
