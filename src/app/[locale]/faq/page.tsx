import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import type { FaqItem } from '@/shared/lib/seo/faq';
import { FaqStructuredData } from '@/shared/ui/components/structured-data/FaqStructuredData';

import { FaqHero, FaqInfo } from './components';
import { FAQ_SECTIONS } from './components/FaqInfo/content';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'FaqPage' });

  return {
    alternates: {
      canonical: '/faq',
    },
    title: t('metaTitle'),
    description: t('metaDescription'),
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      images: '/images/meta.png',
    },
  };
}

export default async function FaqPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'FaqInfo' });

  const faqs: FaqItem[] = FAQ_SECTIONS.flatMap((section) =>
    section.items.map((itemId) => ({
      question: t(`sections.${section.id}.items.${itemId}.question`),
      // t.raw keeps tags as text; strip them for plain FAQPage JSON-LD.
      answer: String(t.raw(`sections.${section.id}.items.${itemId}.answer`)).replace(
        /<\/?(?:pricingLink|trustCenterLink)>/g,
        ''
      ),
    }))
  );

  return (
    <main>
      <FaqStructuredData id="faq-page-jsonld" faqs={faqs} />
      <FaqHero />
      <FaqInfo />
    </main>
  );
}
