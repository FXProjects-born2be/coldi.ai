import st from './Hero.module.scss';

export const Hero = () => {
  return (
    <section className={st.hero}>
      <div className={`container ${st.hero__content}`}>
        <h1 className={st.hero__title}>Coldi Community & News</h1>
        <p className={st.hero__subtitle}>
          Media buzz, product updates, and real-world impact - follow the rise of human-sounding AI
          callers built to convert.
        </p>
      </div>
    </section>
  );
};
