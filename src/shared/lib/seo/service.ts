export type ServiceOffer = {
  price?: string;
  priceCurrency?: string;
  description?: string;
  priceSpecification?: {
    price?: string;
    priceCurrency?: string;
    unitText?: string;
  };
};

export type ServiceStructuredDataInput = {
  name: string;
  description: string;
  url?: string;
  offers?: ServiceOffer | ServiceOffer[];
};

export const getServiceStructuredData = (services: ServiceStructuredDataInput[]) => ({
  '@graph': services.map(({ name, description, url, offers }) => ({
    '@type': 'Service',
    name,
    description,
    ...(url ? { url } : {}),
    provider: {
      '@type': 'Organization',
      name: 'COLDI LABS LTD',
      url: 'https://coldi.ai',
    },
    ...(offers
      ? {
          offers: Array.isArray(offers)
            ? offers.map((offer) => ({
                '@type': 'Offer',
                ...offer,
              }))
            : {
                '@type': 'Offer',
                ...offers,
              },
        }
      : {}),
  })),
});
