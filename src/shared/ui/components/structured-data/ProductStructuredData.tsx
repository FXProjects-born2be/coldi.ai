import {
  getProductStructuredData,
  type ProductStructuredDataInput,
} from '@/shared/lib/seo/product';

import { StructuredData } from './StructuredData';

type ProductStructuredDataProps = ProductStructuredDataInput & {
  id: string;
};

export const ProductStructuredData = ({ id, ...product }: ProductStructuredDataProps) => {
  return <StructuredData id={id} type="Product" data={getProductStructuredData(product)} />;
};
