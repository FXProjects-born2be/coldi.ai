import Image from 'next/image';

import { cn } from '@/shared/lib/helpers';
import { LazyVideo } from '@/shared/ui/components/lazy-video';

import { WORKFLOWS } from '../../data';
import st from './Workflows.module.scss';

export const UseCasesWorkflows = () => (
  <section className={st.section}>
    <div className={cn('container', st.inner)}>
      <div className={st.grid}>
        <div className={st.lead}>
          <LazyVideo
            className={st.leadVideo}
            src="/videos/use-cases-workflows.mp4"
            poster="/images/use-cases-hub/workflows-poster.jpg"
          />
          <div className={st.leadCopy}>
            <p>
              <span className={st.leadAccent}>One AI Voice Platform.</span>
            </p>
            <p>Multiple Business Workflows.</p>
          </div>
        </div>

        {WORKFLOWS.map((item) => (
          <article key={item.id} className={st.card}>
            <span className={st.icon}>
              <Image src={item.icon} alt="" width={24} height={24} unoptimized />
            </span>
            <div className={st.copy}>
              <h3 className={st.title}>{item.title}</h3>
              <p className={st.text}>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
