import {
  getServiceStructuredData,
  type ServiceStructuredDataInput,
} from '@/shared/lib/seo/service';

import { StructuredData } from './StructuredData';

type ServiceStructuredDataProps = {
  id: string;
  services: ServiceStructuredDataInput[];
};

export const ServiceStructuredData = ({ id, services }: ServiceStructuredDataProps) => {
  return <StructuredData id={id} data={getServiceStructuredData(services)} />;
};
