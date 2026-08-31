import Image from 'next/image';

import { getTranslations } from 'next-intl/server';

import { cn } from '@/shared/lib/helpers';
import { BookDemo } from '@/shared/ui/components/book-demo';

import st from './SolutionsHero.module.scss';

const rings = [
  { src: '/images/solutions/hero-one.svg', width: 1440, height: 537 },
  { src: '/images/solutions/hero-two.svg', width: 1440, height: 537 },
  { src: '/images/solutions/hero-three.svg', width: 1440, height: 537 },
  { src: '/images/solutions/hero-four.svg', width: 1440, height: 537 },
  { src: '/images/solutions/hero-five.svg', width: 1440, height: 537 },
  { src: '/images/solutions/hero-six.svg', width: 1440, height: 537 },
  { src: '/images/solutions/hero-seven.svg', width: 1440, height: 537 },
  { src: '/images/solutions/hero-eight.svg', width: 1440, height: 537 },
  { src: '/images/solutions/hero-nine.svg', width: 1297, height: 537 },
];

export const SolutionsHero = async () => {
  const t = await getTranslations('SolutionsHero');

  return (
    <section className={st.agents_hero}>
      <div className={st.agents_hero__bg} aria-hidden>
        <div className={st.agents_hero__rings}>
          {rings.map((ring) => (
            <div key={ring.src} className={st.agents_hero__ring}>
              <Image
                src={ring.src}
                alt=""
                width={ring.width}
                height={ring.height}
                style={{ width: `${(ring.width / 1440) * 100}%`, height: 'auto' }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={cn('container', st.agents_hero__container)}>
        <h1 className={st.agents_hero__title}>
          {t('titleLine1')}
          <br />
          {t('titleLine2')}
        </h1>
        <p className={st.agents_hero__description}>{t('description')}</p>

        <BookDemo className={cn('btn-primary', st.agents_hero__btn)} />
      </div>
    </section>
  );
};
