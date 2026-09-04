import { cn } from '@/shared/lib/helpers';

import st from './InsuranceHero.module.scss';

export const InsuranceHero = () => {
  return (
    <section className={st.insurance_hero}>
      <div className={cn('container', st.insurance_hero__container)}>
        <h1 className={st.insurance_hero__title}>
          AI Voice Agents Built for
          <br />
          <span>Insurance Operations</span>
        </h1>

        <p className={st.insurance_hero__desc}>
          Coldi calls policyholders, chases documents, and handles renewals, fully managed from day
          one.
        </p>
      </div>
      <video
        className={st.insurance_hero__video}
        src="/videos/insurance-hero.mp4"
        autoPlay
        playsInline
        muted
        loop
        preload="metadata"
        controls={false}
        aria-hidden
      />
    </section>
  );
};
