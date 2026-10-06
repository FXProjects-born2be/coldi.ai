import { getOrganizationStructuredData } from '@/shared/lib/seo/organization';

import { StructuredData } from './StructuredData';

type OrganizationStructuredDataProps = {
  id?: string;
};

export const OrganizationStructuredData = ({ id }: OrganizationStructuredDataProps) => {
  return <StructuredData id={id} type="Organization" data={getOrganizationStructuredData()} />;
};
