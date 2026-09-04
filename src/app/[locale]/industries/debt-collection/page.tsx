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
    canonical: '/industries/debt-collection',
  },
  title: 'AI Voice Agents for Debt Collection Software',
  description:
    'AI debt collection software that automates borrower communication, payment reminders, and recovery workflows. Scale credit and debit collection services with AI voice agents.',
  openGraph: {
    title: 'AI Voice Agents for Debt Collection Software',
    description:
      'AI debt collection software that automates borrower communication, payment reminders, and recovery workflows. Scale credit and debit collection services with AI voice agents.',
    images: '/images/meta.png',
  },
};

export default function DebtCollectionPage() {
  return (
    <main>
      <InsuranceHero
        title="AI Voice Agents Built for"
        titleAccent="Debt Collection"
        description="Coldi works your full portfolio on a compliant script, at a fraction of the cost of a human floor."
        video="/videos/debt-collection-hero.mp4"
      />
      <InsuranceHandles
        items={[
          {
            id: 'payment-reminders',
            icon: '/icons/fluent_receipt-sparkles-24-regular.svg',
            label: 'Payment Reminders',
          },
          {
            id: 'arrangement-negotiation',
            icon: '/icons/ic_outline-policy.svg',
            label: 'Arrangement / Negotiation',
          },
          {
            id: 'broken-promise-follow-up',
            icon: '/icons/hugeicons_ai-audio.svg',
            label: 'Broken-Promise Follow-up',
          },
          {
            id: 'pre-legal-notice',
            icon: '/icons/octicon_comment-ai-16.svg',
            label: 'Pre-Legal Notice',
          },
        ]}
        firstText={`"Hi, this is Coldi calling about your account ending 4471. You have a payment of $210 due Friday. Would you like to set up a plan?"`}
        answer="Can I pay half now and half next month?"
        secondText={`"Yes, I can set that up right now. You'll get a confirmation text with both dates."`}
        botsHref="/solutions?tab=debt#solutions-info"
        background="/images/general/background-three.png"
        visual="timerTwo"
      />
      <InsuranceCases
        title="Debt Collection"
        titleAccent="Payment Reminder"
        description="Scripted word for word, recorded end to end, opt-out honored instantly."
        audio="/audio/debt-collection.wav"
        visual="timer"
        page="debt-collection"
      />
      <InsuranceWhy
        items={[
          {
            id: 'intro',
            icon: null,
            video: '/videos/meet-the-team-drive.mp4',
            title: 'Why Collections Teams',
            titleAccent: 'Bring Coldi In',
          },
          {
            id: 'contact-rate',
            icon: '/icons/ic_outline-star-rate.svg',
            title: 'Contact rate',
            body: 'Portfolios get worked at the times and in the languages that actually connect.',
          },
          {
            id: 'compliance',
            icon: '/icons/ic_outline-policy.svg',
            title: 'Compliance',
            body: 'The approved script runs every time, every call recorded and transcribed.',
          },
          {
            id: 'small-balances',
            icon: '/icons/cil_balance-scale.svg',
            title: 'Small balances',
            body: 'Accounts too small to justify a human agent become profitable to chase again.',
          },
          {
            id: 'follow-through',
            icon: '/icons/fluent_payment-16-regular.svg',
            title: 'Follow-through',
            body: 'Payment arrangements get reminded and re-confirmed automatically instead of going stale.',
          },
        ]}
      />
      <InsuranceOperations
        title="Built for Collections Operations"
        description={
          <>
            Mandatory disclosures built into every script.
            <br /> Full audit trail, immediate stop on any opt-out.
          </>
        }
      />
      <InsuranceInfo
        items={[
          {
            id: 'portfolio-headcount',
            label: 'Your portfolio is growing faster than headcount',
          },
          {
            id: 'audit-compliance',
            label: "You've had a recent audit, compliance incident, or regulatory pressure",
          },
          {
            id: 'small-balances',
            label: "You're writing off small balances that were never worth a human agent's time",
          },
          {
            id: 'agent-turnover',
            label: 'Agent turnover on your hardest seat is a recurring cost',
          },
        ]}
        description="Talk to us about a 30-day pilot on one portfolio segment."
      />
    </main>
  );
}
