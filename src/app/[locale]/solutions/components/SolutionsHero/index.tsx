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
    <section className={cn('hero-shadow ', st.solutions_hero)}>
      <div className={st.solutions_hero__bg} aria-hidden>
        <div className={st.solutions_hero__rings}>
          {rings.map((ring) => (
            <div key={ring.src} className={st.solutions_hero__ring}>
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

      <div className={cn('container', st.solutions_hero__container)}>
        <h1 className={st.solutions_hero__title}>
          {t.rich('titleLine1', {
            span: (chunks) => <span>{chunks}</span>,
          })}
          <br />
          {t.rich('titleLine2', {
            span: (chunks) => <span>{chunks}</span>,
          })}
        </h1>
        <p className={st.solutions_hero__description}>{t('description')}</p>

        <BookDemo className={'btn-primary mx-auto'} />
      </div>
    </section>
  );
};
