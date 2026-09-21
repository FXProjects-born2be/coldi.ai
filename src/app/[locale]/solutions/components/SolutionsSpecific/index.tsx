import { getTranslations } from 'next-intl/server';

import { cn } from '@/shared/lib/helpers';
import { BookDemo } from '@/shared/ui/components/book-demo';
import { LazyVideo } from '@/shared/ui/components/lazy-video';

import st from './SolutionsSpecific.module.scss';

export const SolutionsSpecific = async () => {
  const t = await getTranslations('SolutionsSpecific');

  return (
    <section className={st.solutions_specific}>
      <div className={cn('container', st.solutions_specific__inner)}>
        <h2 className={st.solutions_specific__title}>{t('title')}</h2>
        <p className={st.solutions_specific__text}>{t('description')}</p>
        <BookDemo className={'btn-secondary w-max'} />
      </div>
      <LazyVideo className={st.solutions_specific__video} src="/videos/solutions-specific.mp4" />
    </section>
  );
};
