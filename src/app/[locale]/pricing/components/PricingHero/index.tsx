import { cn } from '@/shared/lib/helpers';

import st from './Hero.module.scss';

export const PricingHero = () => {
  return (
    <section className={st.pricing_hero}>
      <div className={cn('container', st.pricing_hero__container)}>
        <div className={st.pricing_hero__header}>
          <h1 className={st.pricing_hero__title}>Simple Pricing. Scalable Power.</h1>

          <p className={st.pricing_hero__desc}>
            Choose the plan that fits your stage - whether you&apos;re just testing or scaling full
            operations.
          </p>
        </div>
      </div>
      <video
        className={st.pricing_hero__video}
        src="/videos/pricing-hero.mp4"
        autoPlay
        playsInline
        muted
        loop
        preload="auto"
        controls={false}
        aria-hidden
      />
    </section>
  );
};
