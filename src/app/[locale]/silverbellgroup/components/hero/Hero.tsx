import type { HeroContent } from '../data';
import { heroContent as defaultHeroContent } from '../data';
import st from './Hero.module.scss';

export const Hero = ({ content = defaultHeroContent }: { content?: HeroContent }) => (
  <section className={st.section}>
    <div className={`container ${st.inner}`}>
      <div className={st.copy}>
        <h1 className={st.title}>
          <span className={st.titleAccent}>{content.titleLine1}</span>
          <span className={st.titleRest}>{content.titleLine2}</span>
        </h1>
        <p className={st.subtitle}>{content.subtitle}</p>
      </div>

      <div className={st.card}>
        <div className={st.cardInner}>
          <div className={st.period}>
            <p className={st.periodLabel}>{content.reportingLabel}</p>
            <p className={st.periodRange}>{content.reportingRange}</p>
          </div>
          <div className={st.paragraphs}>
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);
