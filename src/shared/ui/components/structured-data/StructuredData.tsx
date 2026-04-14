import Script from 'next/script';

type StructuredDataProps = {
  id?: string;
  type: 'Organization' | 'WebSite' | 'Product' | 'Article' | 'BreadcrumbList' | 'FAQPage';
  data: Record<string, unknown>;
};

export const StructuredData = ({ id, type, data }: StructuredDataProps) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  const serializedStructuredData = JSON.stringify(structuredData)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');

  return (
    <Script
      id={id ?? `structured-data-${type.toLowerCase()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: serializedStructuredData,
      }}
    />
  );
};
