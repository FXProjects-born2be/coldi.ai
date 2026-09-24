import Image from 'next/image';

import { getTranslations } from 'next-intl/server';

import { cn } from '@/shared/lib/helpers';

import st from './AboutHandles.module.scss';

const items = [
  {
    id: 'languages',
    image: '/images/about/handles-one.svg',
  },
  {
    id: 'telephony',
    image: '/images/about/handles-two.svg',
  },
  {
    id: 'availability',
    image: '/images/about/handles-three.svg',
  },
] as const;

export const AboutHandles = async () => {
  const t = await getTranslations('AboutHandles');

  return (
    <section className={st.about_handles}>
      <div className={cn('container', st.about_handles__container)}>
        <h2 className={st.about_handles__title}>{t('title')}</h2>
        <div className={st.about_handles__list}>
          {items.map((item) => (
            <article key={item.id} className={st.about_handles__item}>
              <div className={st.about_handles__top}>
                <div className={st.about_handles__picture}>
                  <Image
                    src={item.image}
                    alt={t(`items.${item.id}.title`)}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>

                <p className={st.about_handles__item_label}>{t(`items.${item.id}.label`)}</p>
              </div>
              <h3 className={st.about_handles__item_title}>{t(`items.${item.id}.title`)}</h3>
              <p className={st.about_handles__item_desc}>{t(`items.${item.id}.description`)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
