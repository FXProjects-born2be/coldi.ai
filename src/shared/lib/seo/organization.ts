export const getOrganizationStructuredData = () => ({
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
    url: 'https://coldi.ai/meet-the-team',
    availableLanguage: ['en', 'es'],
  },
  sameAs: [
    'https://www.instagram.com/coldi.ai',
    'https://www.facebook.com/coldiai',
    'https://il.linkedin.com/company/coldiai',
  ],
});
