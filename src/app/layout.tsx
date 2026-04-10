import { Urbanist } from 'next/font/google';
import { headers } from 'next/headers';
import Image from 'next/image';
import Script from 'next/script';

import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';

import { Breadcrumbs, BreadcrumbsProvider } from '@/shared/ui/components/breadcrumbs';
import { Footer } from '@/shared/ui/components/footer';
import { Header } from '@/shared/ui/components/header';
import RetellWidget from '@/shared/ui/components/RetellWidget';

import '@/shared/lib/styles/null.scss';
import '@/shared/lib/styles/base.scss';

const urbanist = Urbanist({
  variable: '--font-urbanist',
  subsets: ['latin'],
});

const organizationStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Coldi',
  legalName: 'Coldi Labs LTD.',
  url: 'https://coldi.ai',
  logo: 'https://coldi.ai/full-logo.svg',
  description:
    'Coldi es una plataforma de automatización e integración inteligente para empresas, conectando herramientas líderes para optimizar flujos de trabajo.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Yeal Man 1',
    addressLocality: 'Tel Aviv',
    postalCode: '4713402',
    addressCountry: 'IL',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    url: 'https://coldi.ai/meettheteam',
    availableLanguage: ['en', 'es'],
  },
  sameAs: [
    'https://www.instagram.com/coldi.ai',
    'https://www.facebook.com/coldiai',
    'https://il.linkedin.com/company/coldiai',
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://coldi.ai'),
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') ?? '';

  const isLiveDemo = pathname.includes('/live-demo');
  //const showRetellWidget =
  //!pathname.includes('/turn-leads-into-meetings') && !pathname.includes('/calendar');
  const showRetellWidget = false;
  return (
    <html lang="en">
      <GoogleAnalytics gaId="G-RCPHXB9V3B" />
      {showRetellWidget && <RetellWidget />}
      <body className={urbanist.variable}>
        <Script
          id="organization-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
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
