import {
  getSoftwareApplicationStructuredData,
  type SoftwareApplicationStructuredDataInput,
} from '@/shared/lib/seo/software-application';

import { StructuredData } from './StructuredData';

type SoftwareApplicationStructuredDataProps = {
  id?: string;
} & SoftwareApplicationStructuredDataInput;

export const SoftwareApplicationStructuredData = ({
  id,
  ...data
}: SoftwareApplicationStructuredDataProps) => {
  return (
    <StructuredData
      id={id ?? 'software-application-jsonld'}
      type="SoftwareApplication"
      data={getSoftwareApplicationStructuredData(data)}
    />
  );
};
