import Image from 'next/image';
import Link from 'next/link';

import st from './ColdiInNews.module.scss';

const brands = [
  {
    href: 'https://www.bloomberg.com/',
    src: '/images/home/logos/bloomberg.svg',
    alt: 'Bloomberg',
  },
  {
    href: 'https://www.entrepreneur.com/',
    src: '/images/home/logos/enterpreneur.svg',
    alt: 'Entrepreneur',
  },
  {
    href: 'https://www.yahoo.com/',
    src: '/images/home/logos/yahoo.svg',
    alt: 'Yahoo',
  },
  {
    href: 'https://www.morningstar.com/',
    src: '/images/home/logos/morningstar.svg',
    alt: 'Morningstar',
  },
  {
    href: 'https://www.benzinga.com/',
    src: '/images/home/logos/benzinga.svg',
    alt: 'Benzinga',
  },
  {
    href: 'https://www.thestreet.com/',
    src: '/images/home/logos/thestreet.svg',
    alt: 'TheStreet',
  },
  {
    href: 'https://www.ktla.com/',
    src: '/images/home/logos/ktla.svg',
    alt: 'KTLA',
  },
];

export const ColdiInNews = () => {
  return (
    <section className={st.layout}>
      <h2 className={st.title}>Coldi Featured in News</h2>
      <div className={st.brands}>
        {brands.map((brand) => (
          <Link key={brand.alt} href={brand.href} target="_blank" rel="noopener noreferrer">
            <Image src={brand.src} alt={brand.alt} width={160} height={40} />
          </Link>
        ))}
      </div>
    </section>
  );
};
