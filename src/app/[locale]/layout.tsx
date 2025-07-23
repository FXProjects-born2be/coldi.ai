import { Urbanist } from 'next/font/google';

import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';

import { Footer } from '@/shared/ui/components/footer';
import { Header } from '@/shared/ui/components/header';

import '@/shared/lib/styles/null.scss';
import '@/shared/lib/styles/base.scss';

const urbanist = Urbanist({
  variable: '--font-urbanist',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Coldi',
    default: 'Coldi | Coldi',
  },
  description: 'Coldi',
  openGraph: {
    title: {
      template: '%s | Coldi',
      default: 'Coldi | Coldi',
    },
    description: 'Coldi',
    //images: 'https://coldi.ai/images/meta.png',
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

  return (
    <html lang={locale}>
      <GoogleAnalytics gaId="G-RCPHXB9V3B" />
      <body className={urbanist.variable}>
        <NextIntlClientProvider>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
