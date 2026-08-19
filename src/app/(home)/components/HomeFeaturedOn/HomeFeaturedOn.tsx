import Image from 'next/image';

import { cn } from '@/shared/lib/helpers';

import st from './HomeFeaturedOn.module.scss';

type Logo = {
  image: string;
  alt: string;
};

const logos: Logo[] = [
  { image: '/images/home/tools/logo-yahoo.svg', alt: 'Yahoo' },
  { image: '/images/home/tools/logo-morningstar.svg', alt: 'Morningstar' },
  { image: '/images/home/tools/logo-benzinga.svg', alt: 'Benzinga' },
  { image: '/images/home/tools/logo-newswire.svg', alt: 'Newswire' },
  { image: '/images/home/tools/logo-street.svg', alt: 'TheStreet' },
];

export const HomeFeaturedOn = () => (
  <section className={st.home_featured_on}>
    <div className={cn('container', st.home_featured_on__container)}>
      <h2 className={st.home_featured_on__title}>Featured on</h2>
      <div className={st.home_featured_on__images}>
        <div className={st.home_featured_on__track}>
          {[...logos, ...logos].map((item, index) => (
            <div
              key={`${item.alt}-${index}`}
              className={st.card}
              aria-hidden={index >= logos.length}
            >
              <Image
                src={item.image}
                alt={index >= logos.length ? '' : item.alt}
                width={420}
                height={50}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
