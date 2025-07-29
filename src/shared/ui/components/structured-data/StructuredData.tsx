import Script from 'next/script';

type StructuredDataProps = {
  type: 'Organization' | 'WebSite' | 'Product' | 'Article' | 'BreadcrumbList';
  data: Record<string, unknown>;
};

export const StructuredData = ({ type, data }: StructuredDataProps) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
};
