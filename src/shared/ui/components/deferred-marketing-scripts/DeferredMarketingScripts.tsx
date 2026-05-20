'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Script from 'next/script';

const MARKETING_FALLBACK_DELAY = 15000;

export const DeferredMarketingScripts = () => {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad) return;

    const enableScripts = () => {
      setShouldLoad(true);
      window.removeEventListener('pointerdown', enableScripts);
      window.removeEventListener('keydown', enableScripts);
      window.removeEventListener('touchstart', enableScripts);
      window.removeEventListener('scroll', enableScripts);
    };

    const fallbackTimer = window.setTimeout(enableScripts, MARKETING_FALLBACK_DELAY);

    window.addEventListener('pointerdown', enableScripts, { once: true, passive: true });
    window.addEventListener('keydown', enableScripts, { once: true });
    window.addEventListener('touchstart', enableScripts, { once: true, passive: true });
    window.addEventListener('scroll', enableScripts, { once: true, passive: true });

    return () => {
      window.clearTimeout(fallbackTimer);
      window.removeEventListener('pointerdown', enableScripts);
      window.removeEventListener('keydown', enableScripts);
      window.removeEventListener('touchstart', enableScripts);
      window.removeEventListener('scroll', enableScripts);
    };
  }, [shouldLoad]);

  if (!shouldLoad) {
    return (
      <>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MLLM3R8B"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager"
          />
        </noscript>
        <noscript>
          <Image
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=24367361056214270&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </>
    );
  }

  return (
    <>
      <Script
        id="google-analytics-src"
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-RCPHXB9V3B"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RCPHXB9V3B');
          `,
        }}
      />
      <Script
        id="gtm"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MLLM3R8B');`,
        }}
      />
      <Script
        async
        defer
        id="hs-script-loader"
        strategy="afterInteractive"
        src="//js-eu1.hs-scripts.com/146476440.js"
      />
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '24367361056214270');
            fbq('track', 'PageView');
          `,
        }}
      />
    </>
  );
};
