import { type FaqItem, getFaqStructuredData } from '@/shared/lib/seo/faq';

import { StructuredData } from './StructuredData';

type FaqStructuredDataProps = {
  faqs: FaqItem[];
  id: string;
};

export const FaqStructuredData = ({ faqs, id }: FaqStructuredDataProps) => {
  if (!faqs.length) {
    return null;
  }

  return <StructuredData id={id} type="FAQPage" data={getFaqStructuredData(faqs)} />;
};
