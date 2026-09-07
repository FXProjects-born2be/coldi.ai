import type { Metadata } from 'next';

import {
  InsuranceCases,
  InsuranceHandles,
  InsuranceHero,
  InsuranceInfo,
  InsuranceOperations,
  InsuranceWhy,
} from '../insurance/components';

export const metadata: Metadata = {
  alternates: {
    canonical: '/industries/emis-payments',
  },
  title: 'AI Voice Agents for Emis Payments',
  description:
    'AI debt collection software that automates borrower communication, payment reminders, and recovery workflows. Scale credit and debit collection services with AI voice agents.',
  openGraph: {
    title: 'AI Voice Agents for Debt Collection Software',
    description:
      'AI debt collection software that automates borrower communication, payment reminders, and recovery workflows. Scale credit and debit collection services with AI voice agents.',
    images: '/images/meta.png',
  },
};

export default function EmisPaymentsPage() {
  return (
    <main>
      <InsuranceHero
        title="AI Voice Agents Built for "
        titleAccent="EMIs and Payment Providers"
        description="Coldi recovers stalled onboarding and handles compliance outreach without a full contact center."
        image="/images/industries/emis-payments-hero-bg.jpg"
      />
      <InsuranceHandles
        items={[
          {
            id: 'application-recovery',
            icon: '/icons/fluent_receipt-sparkles-24-regular.svg',
            label: 'Application Recovery',
          },
          {
            id: 'verification-document-requests',
            icon: '/icons/ri_file-ai-2-line.svg',
            label: 'Verification / Document Requests',
          },
          {
            id: 'compliance-data-refresh',
            icon: '/icons/ri_bar-chart-box-ai-line.svg',
            label: 'Compliance Data Refresh',
          },
          {
            id: 'account-support-routing',
            icon: '/icons/fluent_person-account-16-regular.svg',
            label: 'Account Support Routing',
          },
        ]}
        firstText={`"Hi, this is Coldi calling on behalf of [Provider]. You started an account application but didn't finish verification — got two minutes?"`}
        answer="Yeah, what do you need?"
        secondText={`"Just a photo ID upload, I'll text you the secure link now."`}
        botsHref="/solutions?tab=emi#solutions-info"
        background="/images/general/background-four.png"
        visual="dotWave"
      />
      <InsuranceCases
        title="EMIs"
        titleAccent="Application Recovery"
        description="A stalled sign-up, walked back through the last step of verification."
        audio="/audio/debt-collection.wav"
        visual="dotWave"
        page="emis-payments"
      />
      <InsuranceWhy
        items={[
          {
            id: 'intro',
            icon: null,
            video: '/videos/meet-the-team-drive.mp4',
            title: 'Why EMI Teams',
            titleAccent: 'Bring Coldi In',
          },
          {
            id: 'onboarding-recovery',
            icon: '/icons/ic_outline-tour.svg',
            title: 'Onboarding recovery',
            body: 'Applications abandoned mid-verification get a timely, multilingual nudge.',
          },
          {
            id: 'compliance-outreach',
            icon: '/icons/eos-icons_network-policy-outlined.svg',
            title: 'Compliance outreach',
            body: 'Document requests and consent refreshes run automatically, fully logged.',
          },
          {
            id: 'support-coverage',
            icon: '/icons/fluent_person-support-16-regular.svg',
            title: 'Support coverage',
            body: 'Routine account questions get answered around the clock, routed to specialists only when needed.',
          },
          {
            id: 'lean-teams',
            icon: '/icons/eos-icons_ai-healing-outlined.svg',
            title: 'Lean teams',
            body: 'You get contact-center coverage without building a contact center.',
          },
        ]}
      />
      <InsuranceOperations
        title="Built for EMI Operations"
        description={
          <>
            Every verification call is logged with a full audit trail. ISO 27001 and GDPR
            certification in progress.
          </>
        }
      />
      <InsuranceInfo
        items={[
          {
            id: 'drop-off',
            label: 'Drop-off between registration and first use is your biggest growth leak',
          },
          {
            id: 'stalls-without-touchpoint',
            label: 'Verification stalls without a human touchpoint',
          },
          {
            id: 'team-is-too-lean',
            label:
              'Your team is too lean to justify a full contact center, but the call volume is there',
          },
        ]}
        description="Talk to us about a 30-day pilot on your onboarding funnel."
      />
    </main>
  );
}
