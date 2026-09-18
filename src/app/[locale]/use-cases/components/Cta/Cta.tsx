import { cn } from '@/shared/lib/helpers';
import { BookDemo } from '@/shared/ui/components/book-demo';
import { LazyVideo } from '@/shared/ui/components/lazy-video';

import st from './Cta.module.scss';

export const UseCasesCta = () => (
  <section className={st.section}>
    <div className={cn('container', st.inner)}>
      <h2 className={st.title}>Inspired by the Results?</h2>
      <p className={st.text}>
        Tell us what your team is spending time on.
        <br />
        We&apos;ll show you where Coldi can automate the workflow.
      </p>
      <BookDemo className="btn-secondary w-max" />
    </div>
    <LazyVideo
      className={st.video}
      src="/videos/use-cases-wave.mp4"
      poster="/images/use-cases-hub/wave-poster.jpg"
    />
  </section>
);
