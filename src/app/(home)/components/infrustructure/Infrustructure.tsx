import st from './Infrustructure.module.scss';

export const Infrustructure = () => {
  return (
    <section className={st.layout}>
      <div className={st.row}>
        <div className={st.col}>
          <h3>Global Telephony Infrastructure</h3>
          <p>
            Coldi operates a fully managed, high-quality telephony network across dozens of
            countries. You can choose to use your own telephony provider (such as Twilio,
            RingCentral, Aircall), or use Coldi’s infrastructure with localized landline access.
            Telephony rates vary by region and traffic volume, and our team will assist in choosing
            the most efficient and cost-effective setup for your needs.
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
