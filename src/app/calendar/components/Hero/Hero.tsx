'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Script from 'next/script';

import st from './Hero.module.scss';

const HUBSPOT_MEETINGS_BASE = 'https://meetings-eu1.hubspot.com/it-dep/appointment?embed=true';
const HUBSPOT_MEETINGS_SCRIPT =
  'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js';

const PREFILL_PARAMS = ['firstName', 'lastName', 'email'] as const;

export const Hero = () => {
  const searchParams = useSearchParams();
  const embedUrl = useMemo(() => {
    const params = new URLSearchParams();
    PREFILL_PARAMS.forEach((key) => {
      const value = searchParams.get(key);
      if (value) params.set(key, value);
    });
    const query = params.toString();
    return query ? `${HUBSPOT_MEETINGS_BASE}&${query}` : HUBSPOT_MEETINGS_BASE;
  }, [searchParams]);

  return (
    <section className={st.layout}>
      <div className={st.title}>
        <div>
          <h1>
            <span>Your subscription</span> is <br />
            not fully confirmed
          </h1>
          <p>Watch this video until the end (only 1 minute).</p>
        </div>
        <div className={st.video}>
          <div
            id="vidalytics_embed_7GATnpENZk_o6u6D"
            style={{ width: '100%', position: 'relative', paddingTop: '56.25%' }}
          />
          <Script
            id="vidalytics-embed"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
(function (v, i, d, a, l, y, t, c, s) {
y='_'+d.toLowerCase();c=d+'L';if(!v[d]){v[d]={};}if(!v[c]){v[c]={};}if(!v[y]){v[y]={};}var vl='Loader',vli=v[y][vl],vsl=v[c][vl + 'Script'],vlf=v[c][vl + 'Loaded'],ve='Embed';
if (!vsl){vsl=function(u,cb){
if(t){cb();return;}s=i.createElement("script");s.type="text/javascript";s.async=1;s.src=u;
if(s.readyState){s.onreadystatechange=function(){if(s.readyState==="loaded"||s.readyState=="complete"){s.onreadystatechange=null;vlf=1;cb();}};}else{s.onload=function(){vlf=1;cb();};}
i.getElementsByTagName("head")[0].appendChild(s);
};}
vsl(l+'loader.min.js',function(){if(!vli){var vlc=v[c][vl];vli=new vlc();}vli.loadScript(l+'player.min.js',function(){var vec=v[d][ve];t=new vec();t.run(a);});});
})(window, document, 'Vidalytics', 'vidalytics_embed_7GATnpENZk_o6u6D', 'https://fast.vidalytics.com/embeds/J3s4CyNK/7GATnpENZk_o6u6D/');
              `,
            }}
          />
        </div>
      </div>
      <div className={st.calendar}>
        <div className={`${st.meetingsEmbed} meetings-iframe-container`} data-src={embedUrl} />
        <Script src={HUBSPOT_MEETINGS_SCRIPT} strategy="afterInteractive" />
      </div>
    </section>
  );
};
