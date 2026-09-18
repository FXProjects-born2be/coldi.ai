import { cn } from '@/shared/lib/helpers';
import { LazyVideo } from '@/shared/ui/components/lazy-video';

import st from './Hero.module.scss';

export const UseCasesHero = () => (
  <section className={st.hero}>
    <div className={cn('container', st.inner)}>
      <h1 className={st.title}>See How Coldi Automates Business Calls</h1>
      <p className={st.subtitle}>
        Real AI voice agents handling real business workflows:
        <br />
        from qualification and follow-ups to support, scheduling, and compliance.
      </p>
    </div>
    <LazyVideo
      className={st.video}
      src="/videos/use-cases-hero.mp4"
      poster="/images/use-cases-hub/hero-poster.jpg"
    />
    <div className={st.smoke} aria-hidden />
  </section>
);
