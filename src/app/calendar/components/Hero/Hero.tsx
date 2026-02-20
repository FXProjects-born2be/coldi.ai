import Script from 'next/script';

import st from './Hero.module.scss';

const HUBSPOT_MEETINGS_EMBED_URL = 'https://meetings-eu1.hubspot.com/hector-iglesias?embed=true';
const HUBSPOT_MEETINGS_SCRIPT =
  'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js';

export const Hero = () => {
  return (
    <section className={st.layout}>
      <div className={st.title}>
        <h1>
          Thank You for <br /> <span>Your Interest</span>
        </h1>
      </div>
      <div className={st.calendar}>
        <div
          className={`${st.meetingsEmbed} meetings-iframe-container`}
          data-src={HUBSPOT_MEETINGS_EMBED_URL}
        />
        <Script src={HUBSPOT_MEETINGS_SCRIPT} strategy="afterInteractive" />
      </div>
    </section>
  );
};
