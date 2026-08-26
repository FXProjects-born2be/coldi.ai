import st from './Infrustructure.module.scss';

export const Infrustructure = () => {
  return (
    <section className={st.layout}>
      <div className={st.row}>
        <div className={st.col}>
          <h3>
            Global Reach. <br />
            Local Presence.
          </h3>
          <p>
            Coldi operates across 50+ countries with localised calling infrastructure,
            enterprise-grade routing, and full flexibility to bring your own telephony provider
            (Twilio, RingCentral, Aircall) or use Coldi&apos;s managed network — launch globally in
            days, not months.
          </p>
        </div>
        <div className={st.video}>
          <video
            src="/videos/pricing/infrustructure.mp4"
            autoPlay
            playsInline
            muted
            loop
            preload="metadata"
            controls={false}
          />
        </div>
      </div>
    </section>
  );
};
