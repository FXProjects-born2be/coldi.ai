import type { Metadata } from 'next';

import {
  InsuranceCases,
  InsuranceHandles,
  InsuranceHero,
  InsuranceInfo,
  InsuranceOperations,
  InsuranceWhy,
} from './components';

export const metadata: Metadata = {
  alternates: {
    canonical: '/industries/insurance',
  },
  title: 'Coldi AI Voice Agents for Insurance ',
  description:
    'Optimize claims and policy renewals with Coldi’s insurance AI voice agents. Automate FNOL, quote intake, and CRM updates 24/7. Book a demo!',
  openGraph: {
    title: 'Coldi AI Voice Agents for Insurance ',
    description:
      'Optimize claims and policy renewals with Coldi’s insurance AI voice agents. Automate FNOL, quote intake, and CRM updates 24/7. Book a demo!',
    images: '/images/meta.png',
  },
};

export default function InsuranceAgentsPage() {
  return (
    <main>
      <InsuranceHero />
      <InsuranceHandles />
      <InsuranceCases page="insurance" titleAccent="Policy Renewal" />
      <InsuranceWhy />
      <InsuranceOperations />
      <InsuranceInfo />
    </main>
  );
}
