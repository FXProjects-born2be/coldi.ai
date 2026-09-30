import { getTranslations } from 'next-intl/server';

import { cn } from '@/shared/lib/helpers';
import { LazyVideo } from '@/shared/ui/components/lazy-video';

import st from './Hero.module.scss';

export const UseCasesHero = async () => {
  const t = await getTranslations('UseCasesPage.hero');

  return (
    <section className={st.hero}>
      <div className={cn('container', st.inner)}>
        <h1 className={st.title}>{t('title')}</h1>
        <p className={st.subtitle}>
          {t('subtitle')}
          <br />
          {t('subtitleRest')}
        </p>
      </div>
      <LazyVideo
        className={st.video}
        src="/videos/use-cases-hero.mp4"
        poster="/images/use-cases-hub/hero-poster.jpg"
      />
      <div className={st.smoke} aria-hidden />
    </section>
  );
};
