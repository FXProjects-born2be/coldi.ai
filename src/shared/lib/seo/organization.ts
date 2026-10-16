export const getOrganizationStructuredData = () => ({
  name: 'COLDI LABS LTD',
  legalName: 'COLDI LABS LTD',
  brand: {
    '@type': 'Brand',
    name: 'Coldi',
  },
  url: 'https://coldi.ai',
  logo: {
    '@type': 'ImageObject',
    url: 'https://coldi.ai/full-logo.svg',
  },
  description:
    'Coldi is a managed AI voice agent platform for fintech and sales teams. Coldi builds, integrates and runs AI voice agents that handle inbound and outbound calls.',
  email: 'info@coldi.ai',
  telephone: '+441299667777',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IL',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'info@coldi.ai',
    telephone: '+441299667777',
    availableLanguage: ['en', 'uk'],
  },
  sameAs: [
    'https://x.com/Coldiai',
    'https://www.facebook.com/coldiai/',
    'https://www.linkedin.com/company/coldiai/',
    'https://www.youtube.com/@ColdiAI',
    'https://t.me/ColdiAI',
  ],
});
