import { getTranslations } from 'next-intl/server';

import { cn } from '@/shared/lib/helpers';

import st from './AboutHero.module.scss';

export const AboutHero = async () => {
  const t = await getTranslations('AboutHero');

  return (
    <section className={st.about_hero}>
      <div className={cn('container', st.about_hero__container)}>
        <div className={st.about_hero__header}>
          <h1 className={st.about_hero__title}>
            <span>{t('titleEyebrow')}</span>
            <br />
            {t('title')}
          </h1>

          <p className={st.about_hero__desc}>{t('description')}</p>
        </div>
      </div>
      <video
        className={st.about_hero__video}
        src="/videos/about-hero.mp4"
        autoPlay
        playsInline
        muted
        loop
        preload="metadata"
        controls={false}
        aria-hidden
      />
    </section>
  );
};
