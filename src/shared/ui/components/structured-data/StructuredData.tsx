type StructuredDataProps = {
  id?: string;
  type?:
    | 'Organization'
    | 'WebSite'
    | 'Product'
    | 'Service'
    | 'SoftwareApplication'
    | 'Article'
    | 'NewsArticle'
    | 'BreadcrumbList'
    | 'FAQPage';
  data: Record<string, unknown>;
};

export const StructuredData = ({ id, type, data }: StructuredDataProps) => {
  const structuredData = {
    '@context': 'https://schema.org',
    ...(type ? { '@type': type } : {}),
    ...data,
  };

  const serializedStructuredData = JSON.stringify(structuredData)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');

  // Plain <script>, not next/script — so JSON-LD is in the initial HTML for crawlers/validators.
  return (
    <script
      id={id ?? `structured-data-${type?.toLowerCase() ?? 'graph'}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: serializedStructuredData,
      }}
    />
  );
};
