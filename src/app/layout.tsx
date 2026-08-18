import { Urbanist } from 'next/font/google';
import { headers } from 'next/headers';
import Script from 'next/script';

import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

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
    default: 'Fully Managed AI Voice Agents for Fintech | Coldi AI',
  },
  description:
    'Automate customer conversations with AI voice agents built for FinTech. Handle calls, qualify leads, collect payments, and scale customer operations.',
  openGraph: {
    title: {
      template: '%s | Coldi',
      default: 'Fully Managed AI Voice Agents for Fintech | Coldi AI',
    },
    description:
      'Automate customer conversations with AI voice agents built for FinTech. Handle calls, qualify leads, collect payments, and scale customer operations.',
    images: '/images/meta.png',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') ?? '';

  const isLiveDemo = pathname.includes('/live-demo');
  const isAdminRoute = pathname.startsWith('/news-admin');
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
        <Breadcrumbs />
        {children}
        {!isLiveDemo && <Footer pathname={pathname} />}
      </body>
    </html>
  );
}
