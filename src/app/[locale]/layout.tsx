import { Urbanist } from 'next/font/google';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import Script from 'next/script';

import { SpeedInsights } from '@vercel/speed-insights/next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import type { ReactNode } from 'react';

import { cn, getBodyPageClass } from '@/shared/lib/helpers';
import { BodyPageClass } from '@/shared/ui/components/body-page-class';
import { Breadcrumbs } from '@/shared/ui/components/breadcrumbs';
import { DeferredMarketingScripts } from '@/shared/ui/components/deferred-marketing-scripts/DeferredMarketingScripts';
import { Footer } from '@/shared/ui/components/footer';
import { Header } from '@/shared/ui/components/header';
import { HideOnPath } from '@/shared/ui/components/hide-on-path';

import { routing } from '@/i18n/routing';

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const pathname = (await headers()).get('x-pathname') ?? '';
  const isLiveDemo = pathname.includes('/live-demo');
  const isAdminRoute = pathname.startsWith('/news-admin');
  const shouldLoadMarketingScripts = !isAdminRoute;

  return (
    <html lang={locale}>
      <SpeedInsights />
      <body className={cn(urbanist.variable, getBodyPageClass(pathname))}>
        <NextIntlClientProvider key={locale} locale={locale} messages={messages}>
          <BodyPageClass />
          <Script
            id="organization-jsonld"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(organizationStructuredData),
            }}
          />
          {shouldLoadMarketingScripts && <DeferredMarketingScripts />}
          {!isLiveDemo && (
            <HideOnPath>
              <Header pathname={pathname} />
            </HideOnPath>
          )}
          <Breadcrumbs />
          {children}
          {!isLiveDemo && (
            <HideOnPath>
              <Footer pathname={pathname} />
            </HideOnPath>
          )}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
