import type { Metadata } from 'next';

import { LeadFormContainer } from './components';

export const metadata: Metadata = {
  alternates: {
    canonical: '/lead-request',
  },
};

export default function LeadRequest() {
  return <LeadFormContainer />;
}
