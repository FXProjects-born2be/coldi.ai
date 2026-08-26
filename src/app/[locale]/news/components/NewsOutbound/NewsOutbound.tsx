import st from './NewsOutbound.module.scss';

export const NewsOutbound = () => (
  <section className={st.news_outbound}>
    <div className="container">
      <div className={st.news_outbound__inner}>
        <div className={st.news_outbound__panel}>
          <p className={st.news_outbound__subtitle}>Outbound AI Calling</p>
          <h2 className={st.news_outbound__title}>
            Inside Coldi’s AI Lab: Building Talkers That Actually Perform EXAMPLE
          </h2>
          <p className={st.news_outbound__description}>
            EXAMPLE Take a look behind the curtain at how Coldi engineers, trains, and optimizes AI
            agents to outperform outsourced callers across industries.
          </p>
          <p className={st.news_outbound__data}>8th August 2026</p>
        </div>
      </div>
    </div>
  </section>
);
