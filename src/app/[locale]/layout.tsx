import { Urbanist } from 'next/font/google';
import { headers } from 'next/headers';
import Image from 'next/image';
import Script from 'next/script';

import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';

import BotIdClient from '@/shared/ui/components/BotIdClient';
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
  const pathname = headersList.get('x-pathname') ?? '';

  const isLiveDemo = pathname.includes('/live-demo');

  return (
    <html lang={locale}>
      <GoogleAnalytics gaId="G-RCPHXB9V3B" />
      <RetellWidget />
      <BotIdClient />
      <body className={urbanist.variable}>
        {!isLiveDemo && <Header />}
        {children}
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
