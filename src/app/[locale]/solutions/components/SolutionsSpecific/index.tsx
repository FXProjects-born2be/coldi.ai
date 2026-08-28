import { getTranslations } from 'next-intl/server';

import { cn } from '@/shared/lib/helpers';

import st from './SolutionsSpecific.module.scss';

import { Link } from '@/i18n/navigation';

export const SolutionsSpecific = async () => {
  const t = await getTranslations('SolutionsSpecific');

  return (
    <section className={st.solutions_specific}>
      <div className={cn('container', st.solutions_specific__inner)}>
        <h2 className={st.solutions_specific__title}>{t('title')}</h2>
        <p className={st.solutions_specific__text}>{t('description')}</p>
        <Link href="/calendar" className={cn('btn', 'btn-secondary', st.solutions_specific__cta)}>
          {t('cta')}
        </Link>
      </div>
      <video
        className={st.solutions_specific__video}
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
