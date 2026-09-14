import { heroContent } from '../data';
import st from './Hero.module.scss';

export const Hero = () => (
  <section className={st.section}>
    <div className={`container ${st.inner}`}>
      <div className={st.copy}>
        <h1 className={st.title}>
          <span className={st.titleAccent}>{heroContent.titleLine1}</span>
          <span className={st.titleRest}>{heroContent.titleLine2}</span>
        </h1>
        <p className={st.subtitle}>{heroContent.subtitle}</p>
      </div>

      <div className={st.card}>
        <div className={st.cardInner}>
          <div className={st.period}>
            <p className={st.periodLabel}>{heroContent.reportingLabel}</p>
            <p className={st.periodRange}>{heroContent.reportingRange}</p>
          </div>
          <div className={st.paragraphs}>
            {heroContent.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);
