import Image from 'next/image';

import { getTranslations } from 'next-intl/server';

import { cn } from '@/shared/lib/helpers';

import st from './SolutionsUseCases.module.scss';

const CASES = [
  {
    id: 'clickomi',
    featured: true,
    image: { src: '/images/solutions/cases-one.png', width: 795, height: 336 },
  },
  {
    id: 'payset',
    image: { src: '/images/solutions/cases-two.svg', width: 150, height: 63 },
  },
  {
    id: 'clarity',
    image: { src: '/images/solutions/cases-three.svg', width: 150, height: 63 },
  },
  {
    id: 'stone',
    image: { src: '/images/solutions/cases-four.svg', width: 150, height: 63 },
  },
] as const;

export const SolutionsUseCases = async () => {
  const t = await getTranslations('SolutionsUseCases');
  const [featured, ...cards] = CASES;

  return (
    <section className={st.solutions_use_cases}>
      <div className="container">
        <h2 className={st.solutions_use_cases__title}>{t('title')}</h2>
        <div className={st.solutions_use_cases__panel}>
          <article className={st.solutions_use_cases__featured}>
            <div className={st.solutions_use_cases__featured_media}>
              <Image
                src={featured.image.src}
                alt={t(`items.${featured.id}.title`)}
                width={featured.image.width}
                height={featured.image.height}
              />
            </div>
            <div className={st.solutions_use_cases__featured_body}>
              <h3 className={st.solutions_use_cases__card_title}>
                {t(`items.${featured.id}.title`)}
              </h3>
              <p className={st.solutions_use_cases__card_text}>
                {t(`items.${featured.id}.description`)}
              </p>
              <a href="#" className={cn('btn', 'btn-secondary', st.solutions_use_cases__cta)}>
                {t('readCase')}
              </a>
            </div>
          </article>
          <div className={st.solutions_use_cases__grid}>
            {cards.map((item) => (
              <article key={item.id} className={st.solutions_use_cases__card}>
                <div className={st.solutions_use_cases__card_media}>
                  <Image
                    src={item.image.src}
                    alt={t(`items.${item.id}.title`)}
                    width={item.image.width}
                    height={item.image.height}
                  />
                </div>
                <h3 className={st.solutions_use_cases__card_title}>
                  {t(`items.${item.id}.title`)}
                </h3>
                <p className={st.solutions_use_cases__card_text}>
                  {t(`items.${item.id}.description`)}
                </p>
                <a href="#" className={cn('btn', 'btn-secondary', st.solutions_use_cases__cta)}>
                  {t('readCase')}
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
