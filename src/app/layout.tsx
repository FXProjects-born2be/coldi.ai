import { Urbanist } from 'next/font/google';
import { headers } from 'next/headers';
import Script from 'next/script';

import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';

import { Breadcrumbs } from '@/shared/ui/components/breadcrumbs';
import { DeferredMarketingScripts } from '@/shared/ui/components/deferred-marketing-scripts/DeferredMarketingScripts';
import { Footer } from '@/shared/ui/components/footer';
import { Header } from '@/shared/ui/components/header';

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
  const isAdminRoute = pathname.startsWith('/news-admin');
  const isNewsArticleRoute = pathname.startsWith('/news/') && pathname !== '/news';
  const shouldLoadMarketingScripts = !isAdminRoute;
  return (
    <html lang="en">
      <SpeedInsights />
      <body className={urbanist.variable}>
        <Script
          id="organization-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
        {shouldLoadMarketingScripts && <DeferredMarketingScripts />}
        {!isLiveDemo && <Header pathname={pathname} />}
        {!isLiveDemo && !isNewsArticleRoute && <Breadcrumbs pathname={pathname} />}
        {children}
        {!isLiveDemo && <Footer pathname={pathname} />}
      </body>
    </html>
  );
}
