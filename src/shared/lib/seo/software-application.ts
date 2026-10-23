export type SoftwareApplicationStructuredDataInput = {
  name?: string;
  description?: string;
  url?: string;
  applicationCategory?: string;
  operatingSystem?: string;
};

export const getSoftwareApplicationStructuredData = ({
  name = 'Coldi',
  description = 'Coldi is a managed AI voice agent platform for fintech and sales teams. Coldi builds, integrates and runs AI voice agents that handle inbound and outbound calls.',
  url = 'https://coldi.ai',
  applicationCategory = 'BusinessApplication',
  operatingSystem = 'Web',
}: SoftwareApplicationStructuredDataInput = {}) => ({
  name,
  description,
  url,
  applicationCategory,
  operatingSystem,
  provider: {
    '@type': 'Organization',
    name: 'COLDI LABS LTD',
    url: 'https://coldi.ai',
  },
  brand: {
    '@type': 'Brand',
    name: 'Coldi',
  },
  offers: {
    '@type': 'Offer',
    url: 'https://coldi.ai/pricing',
    priceCurrency: 'USD',
    description: 'Flexible managed and self-service AI voice agent plans',
  },
});
