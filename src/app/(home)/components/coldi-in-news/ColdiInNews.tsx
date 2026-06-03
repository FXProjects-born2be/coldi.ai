import Link from 'next/link';

import st from './ColdiInNews.module.scss';

export const ColdiInNews = () => {
  return (
    <section className={st.layout}>
      <h2 className={st.title}>Coldi Featured in News</h2>
      <div className={st.brands}>
        <Link href="https://www.bloomberg.com/" target="_blank" rel="noopener noreferrer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={'/images/home/logos/bloomberg.svg'} alt="Bloomberg" />
        </Link>
        <Link href="https://www.entrepreneur.com/" target="_blank" rel="noopener noreferrer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={'/images/home/logos/enterpreneur.svg'} alt="Entrepreneur" />
        </Link>
        <Link href="https://www.yahoo.com/" target="_blank" rel="noopener noreferrer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={'/images/home/logos/yahoo.svg'} alt="Yahoo" />
        </Link>
        <Link href="https://www.morningstar.com/" target="_blank" rel="noopener noreferrer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={'/images/home/logos/morningstar.svg'} alt="Morningstar" />
        </Link>
        <Link href="https://www.benzinga.com/" target="_blank" rel="noopener noreferrer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={'/images/home/logos/benzinga.svg'} alt="Benzinga" />
        </Link>
        <Link href="https://www.thestreet.com/" target="_blank" rel="noopener noreferrer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={'/images/home/logos/thestreet.svg'} alt="TheStreet" />
        </Link>
        <Link href="https://www.ktla.com/" target="_blank" rel="noopener noreferrer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={'/images/home/logos/ktla.svg'} alt="KTLA" />
        </Link>
      </div>
    </section>
  );
};
