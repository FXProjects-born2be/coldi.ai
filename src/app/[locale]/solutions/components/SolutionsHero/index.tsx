import Image from 'next/image';

import { cn } from '@/shared/lib/helpers';

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

export const SolutionsHero = () => {
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
          Named AI Agents,
          <br />
          Built for Fintech Workflows
        </h1>
        <p className={st.agents_hero__description}>
          Not a generic voice AI toolkit. Every bot below is built, deployed, and managed by Coldi
          for a specific job.
        </p>

        <button className={cn('btn btn-primary', st.agents_hero__btn)} type="button">
          Book a Demo
        </button>
      </div>
    </section>
  );
};
