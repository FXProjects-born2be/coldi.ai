import { getTranslations } from 'next-intl/server';

import { cn } from '@/shared/lib/helpers';
import { BookDemo } from '@/shared/ui/components/book-demo';
import { LazyVideo } from '@/shared/ui/components/lazy-video';

import st from './Cta.module.scss';

export const UseCasesCta = async () => {
  const t = await getTranslations('UseCasesPage.cta');

  return (
    <section className={st.section}>
      <div className={cn('container', st.inner)}>
        <h2 className={st.title}>{t('title')}</h2>
        <p className={st.text}>
          {t('text')}
          <br />
          {t('textRest')}
        </p>
        <BookDemo className="btn-secondary w-max" />
      </div>
      <LazyVideo
        className={st.video}
        src="/videos/use-cases-wave.mp4"
        poster="/images/use-cases-hub/wave-poster.jpg"
      />
    </section>
  );
};
