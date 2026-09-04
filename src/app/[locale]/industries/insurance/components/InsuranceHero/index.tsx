import { cn } from '@/shared/lib/helpers';
import { BookDemo } from '@/shared/ui/components/book-demo';

import st from './InsuranceHero.module.scss';

type InsuranceHeroProps = {
  title?: string;
  titleAccent?: string;
  description?: string;
  video?: string;
};

export const InsuranceHero = ({
  title = 'AI Voice Agents Built for',
  titleAccent = 'Insurance Operations',
  description = 'Coldi calls policyholders, chases documents, and handles renewals, fully managed from day one.',
  video = '/videos/insurance-hero.mp4',
}: InsuranceHeroProps) => {
  return (
    <section className={st.insurance_hero}>
      <div className={cn('container', st.insurance_hero__container)}>
        <h1 className={st.insurance_hero__title}>
          {title}
          <br />
          <span>{titleAccent}</span>
        </h1>

        <p className={st.insurance_hero__desc}>{description}</p>

        <BookDemo />
      </div>
      <video
        className={st.insurance_hero__video}
        src={video}
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
