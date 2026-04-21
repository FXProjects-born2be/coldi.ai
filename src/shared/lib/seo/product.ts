export type ProductStructuredDataInput = {
  name: string;
  description: string;
  image: string[];
  url: string;
  brand?: string;
};

export const getProductStructuredData = ({
  name,
  description,
  image,
  url,
  brand = 'Coldi',
}: ProductStructuredDataInput) => ({
  name,
  image,
  description,
  brand: {
    '@type': 'Brand',
    name: brand,
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': url,
  },
});
