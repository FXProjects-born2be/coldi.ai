import st from './ColdiInNews.module.scss';

export const ColdiInNews = () => {
  return (
    <section className={st.layout}>
      <h2 className={st.title}>Coldi Featured in News</h2>
      <div className={st.brands}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={'/images/home/logos/bloomberg.svg'} alt="Bloomberg" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={'/images/home/logos/enterpreneur.svg'} alt="Entrepreneur" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={'/images/home/logos/forbes.svg'} alt="Forbes" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={'/images/home/logos/yahoo.svg'} alt="Yahoo" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={'/images/home/logos/morningstar.svg'} alt="Morningstar" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={'/images/home/logos/benzinga.svg'} alt="Benzinga" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={'/images/home/logos/thestreet.svg'} alt="TheStreet" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={'/images/home/logos/ktla.svg'} alt="KTLA" />
      </div>
    </section>
  );
};
