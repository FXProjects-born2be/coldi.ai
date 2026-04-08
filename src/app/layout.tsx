import { Urbanist } from 'next/font/google';
import { headers } from 'next/headers';
import Image from 'next/image';
import Script from 'next/script';

import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';

import { getCanonicalUrl, shouldHaveSelfCanonical } from '@/shared/lib/seo/canonical';
import { Breadcrumbs, BreadcrumbsProvider } from '@/shared/ui/components/breadcrumbs';
import { CanonicalLink } from '@/shared/ui/components/canonical-link/CanonicalLink';
import { Footer } from '@/shared/ui/components/footer';
import { Header } from '@/shared/ui/components/header';
import RetellWidget from '@/shared/ui/components/RetellWidget';

import '@/shared/lib/styles/null.scss';
import '@/shared/lib/styles/base.scss';

const urbanist = Urbanist({
  variable: '--font-urbanist',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  verification: {
    google: 'xwxPBu6sQqKwZ2sx5fphyZV8rM-oyAvHww_SZNUXevQ',
  },
  other: {
    'facebook-domain-verification': 'mzne85ac0n2d0wka3heosu8pd81iwc',
  },
  title: {
    template: '%s | Coldi',
    default: 'AI Voice Agents and Call Center for Business | Coldi',
  },
  description:
    "Boost your customer service with Coldi's AI call center. Try our AI voice agents to handle calls, bookings, and support – fast, efficient, and always on.",
  openGraph: {
    title: {
      template: '%s | Coldi',
      default: 'AI Voice Agents and Call Center for Business | Coldi',
    },
    description:
      "Boost your customer service with Coldi's AI call center. Try our AI voice agents to handle calls, bookings, and support – fast, efficient, and always on.",
    images: 'https://coldi.ai/images/meta.png',
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  const headersList = await headers();
  const pathname = headersList.get('x-pathname');
  const canonicalHref =
    pathname && shouldHaveSelfCanonical(pathname) ? getCanonicalUrl(pathname) : null;

  const isLiveDemo = pathname?.includes('/live-demo') ?? false;
  //const showRetellWidget =
  //!pathname.includes('/turn-leads-into-meetings') && !pathname.includes('/calendar');
  const showRetellWidget = false;
  return (
    <html lang={locale}>
      <head>
        {canonicalHref && <link rel="canonical" href={canonicalHref} data-self-canonical="true" />}
      </head>
      <GoogleAnalytics gaId="G-RCPHXB9V3B" />
      {showRetellWidget && <RetellWidget />}
      <body className={urbanist.variable}>
        <CanonicalLink />
        {/* Google Tag Manager */}
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
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MLLM3R8B"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager"
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <BreadcrumbsProvider>
          {!isLiveDemo && <Header />}
          {!isLiveDemo && <Breadcrumbs />}
          {children}
        </BreadcrumbsProvider>
        {!isLiveDemo && <Footer />}
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
        <noscript>
          <Image
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=24367361056214270&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
