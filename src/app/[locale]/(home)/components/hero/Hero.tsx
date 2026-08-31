import Image from 'next/image';

import { getTranslations } from 'next-intl/server';

import { BookDemo } from '@/shared/ui/components/book-demo';

import st from './Hero.module.scss';
import { HeroRotatingPhrase } from './HeroRotatingPhrase';

const rings = [
  { src: '/images/home/one.svg', width: 1440, height: 676 },
  { src: '/images/home/two.svg', width: 1440, height: 676 },
  { src: '/images/home/three.svg', width: 1440, height: 676 },
  { src: '/images/home/four.svg', width: 1440, height: 676 },
  { src: '/images/home/five.svg', width: 1372, height: 586 },
  { src: '/images/home/six.svg', width: 1098, height: 449 },
  { src: '/images/home/seven.svg', width: 1143, height: 472 },
  { src: '/images/home/eight.svg', width: 915, height: 357 },
  { src: '/images/home/nine.svg', width: 686, height: 243 },
];

const Rings = () => (
  <>
    {rings.map((ring) => (
      <div key={ring.src} className={st.hero__ring}>
        <Image
          src={ring.src}
          alt=""
          width={ring.width}
          height={ring.height}
          style={{ width: `${(ring.width / 1440) * 100}%`, height: 'auto' }}
        />
      </div>
    ))}
  </>
);

export const Hero = async () => {
  const t = await getTranslations('Hero');

  return (
    <section className={st.hero}>
      <div className={st.hero__bg} aria-hidden>
        <div className={st.hero__rings}>
          <Rings />
        </div>
        <div className={st.hero__rings}>
          <Rings />
        </div>
      </div>
      <div className={st.hero__glow_top} aria-hidden />
      <div className={st.hero__glow} aria-hidden />

      <div className={`container ${st.hero__content}`}>
        <h1 className={st.hero__title}>
          {t('titleLine1')}
          <br />
          {t('titleLine2')} <br />
          <HeroRotatingPhrase />
        </h1>
        <p className={st.hero__subtitle}>{t('subtitle')}</p>

        <BookDemo />
      </div>
    </section>
  );
};
