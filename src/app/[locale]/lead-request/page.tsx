import type { Metadata } from 'next';

import { LeadFormContainer } from './components';

export const metadata: Metadata = {
  alternates: {
    canonical: '/call-request',
  },
};

export default function LeadRequest() {
  return <LeadFormContainer />;
}
