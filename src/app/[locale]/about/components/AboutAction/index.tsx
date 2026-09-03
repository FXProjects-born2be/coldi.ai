import { getTranslations } from 'next-intl/server';

import { cn } from '@/shared/lib/helpers';
import { BookDemo } from '@/shared/ui/components/book-demo';

import st from './AboutAction.module.scss';

export const AboutAction = async () => {
  const t = await getTranslations('AboutAction');

  return (
    <section className={st.about_action}>
      <div className={cn('container', st.about_action__inner)}>
        <h2 className={st.about_action__title}>{t('title')}</h2>
        <p className={st.about_action__text}>{t('description')}</p>
        <BookDemo className={'btn-secondary w-max'} />
      </div>
      <video
        className={st.about_action__video}
        src="/videos/solutions-specific.mp4"
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
