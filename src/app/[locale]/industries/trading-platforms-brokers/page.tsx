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
    canonical: '/industries/fx-brokers',
  },
  title: 'AI Agents for FX Brokers More FTDs & Retention',
  description:
    'Convert more leads and retain more traders with AI voice agents built for FX brokers. Instant calls, reactivation, and 30+ languages. Book a demo.',
  openGraph: {
    title: 'AI Agents for FX Brokers More FTDs & Retention',
    description:
      'Convert more leads and retain more traders with AI voice agents built for FX brokers. Instant calls, reactivation, and 30+ languages. Book a demo.',
    images: '/images/meta.png',
  },
};

export default function BrokersPage() {
  return (
    <main>
      <InsuranceHero
        title="AI Voice Agents Built for"
        titleAccent="Trading Platforms and Brokers"
        description="Coldi qualifies leads the moment they land and chases dormant accounts before they churn, fully managed."
        video="/videos/trading-platforms-brokers-hero.mp4"
      />
      <InsuranceHandles
        items={[
          {
            id: 'lead-qualification',
            icon: '/icons/icons8_diploma-1.svg',
            label: 'Lead Qualification',
          },
          {
            id: 'event-based-calling',
            icon: '/icons/fluent_calendar-phone-16-regular.svg',
            label: 'Event-Based Calling',
          },
          {
            id: 'lead-nurturing',
            icon: '/icons/boxicons_pencil-sparkles.svg',
            label: 'Lead Nurturing',
          },
          {
            id: 'onboarding-kyc',
            icon: '/icons/ic_outline-tour.svg',
            label: 'Onboarding / KYC Completion',
          },
          {
            id: 'reactivation',
            icon: '/icons/streamline-flex_voice-activation-check-validate-remix.svg',
            label: 'Reactivation',
          },
        ]}
        firstText={`"Hi, saw you just registered on [Platform]. Got two minutes to tell me what you're looking to trade?"`}
        answer="Sure, mostly FX pairs."
        secondText={`"Good, I'll connect you with an account manager who specializes in FX. They'll call within the hour."`}
        botsHref="/solutions?tab=trading#solutions-info"
        background="/images/general/background-two.png"
        visual="auraTwo"
      />
      <InsuranceCases
        title="Trading Platforms"
        titleAccent="Lead Qualification"
        description="Hear how Coldi separates a real trader from a junk lead before your sales floor ever picks up."
        audio="/audio/trading-platforms.wav"
        visual="aura"
        page="trading-platforms-brokers"
      />
      <InsuranceWhy
        items={[
          {
            id: 'intro',
            icon: null,
            video: '/videos/meet-the-team-drive.mp4',
            title: 'Why Trading Teams',
            titleAccent: 'Bring Coldi In',
          },
          {
            id: 'first-contact',
            icon: '/icons/boxicons_thumb-up.svg',
            title: 'First contact',
            body: 'Every new sign-up gets called within minutes, while intent is still high.',
          },
          {
            id: 'lead-economics',
            icon: '/icons/material-symbols_finance-mode-rounded.svg',
            title: 'Lead economics',
            body: 'AI qualifies before a human joins the call, so reps only speak with real prospects.',
          },
          {
            id: 'retention',
            icon: '/icons/streamline-flex_voice-activation-check-validate-remix.svg',
            title: 'Retention',
            body: 'Withdrawals, inactivity, and dormant accounts trigger automatic outreach, not a manual review.',
          },
          {
            id: 'onboarding',
            icon: '/icons/ic_outline-tour.svg',
            title: 'Onboarding',
            body: 'Verification drop-off is recovered with multilingual follow-up, no local hires required.',
          },
        ]}
      />
      <InsuranceOperations
        title="Built for Trading Operations"
        description="Multi-entity, multi-jurisdiction ready. Scripts adapt by license and region, every call logged for compliance."
      />
      <InsuranceInfo
        items={[
          {
            id: 'leads-faster',
            label: 'Leads come in faster than your floor can call them',
          },
          {
            id: 'paid-traffic',
            label: "You're paying for traffic that never gets a real conversation",
          },
          {
            id: 'new-languages',
            label: "You're expanding into new language markets and don't want to hire locally",
          },
          {
            id: 'floor-reduction',
            label:
              "One client cut their calling floor from 60 agents to 25 with flat conversion — that's the kind of shift you're after",
          },
        ]}
        description="Talk to us about a 30-day pilot on your highest-volume lead source."
      />
    </main>
  );
}
