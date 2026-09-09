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
    canonical: '/industries/other-industries',
  },
  title: 'Coldi AI Voice Agents for Other Regulated Industries',
  description:
    "See how Coldi's AI voice agents apply to healthcare, real estate, and call center operations beyond our core fintech focus. Book a demo to explore your use case.",
  openGraph: {
    title: 'Coldi AI Voice Agents for Other Regulated Industries',
    description:
      "See how Coldi's AI voice agents apply to healthcare, real estate, and call center operations beyond our core fintech focus. Book a demo to explore your use case.",
    images: '/images/meta.png',
  },
};

export default function OtherIndustriesPage() {
  return (
    <main>
      <InsuranceHero
        title="AI Voice Agents Built for "
        titleAccent="More Industries"
        description="Coldi helps businesses automate calls and keep every customer conversation moving."
        video="/videos/other-industries-hero.mp4"
      />
      <InsuranceHandles
        items={[
          {
            id: 'lead-qualification',
            icon: '/icons/hugeicons_diploma.svg',
            label: 'Lead Qualification for Real Estate, Technology & E-commerce',
          },
          {
            id: 'appointment-booking',
            icon: '/icons/hugeicons_appointment-02.svg',
            label: 'Appointment Booking for Healthcare, Hospitality & Consulting',
          },
          {
            id: 'customer-support',
            icon: '/icons/griddy-icons_customer-support.svg',
            label: 'Customer Support for Retail, Telecommunications & Education',
          },
          {
            id: 'service-dispatchg',
            icon: '/icons/carbon_send.svg',
            label: 'Service Dispatch for HVAC, Residential & Agro-Industry',
          },
          {
            id: 'lead-re-engagement',
            icon: '/icons/hugeicons_touch-interaction-01.svg',
            label: 'Lead Re-engagement for Real Estate, E-commerce & Entertainment',
          },
          {
            id: 'follow-ups',
            icon: '/icons/fluent_person-account-16-regular.svg',
            label: 'famicons_trending-up-outline',
          },
        ]}
        firstText={`"Hi, this is Coldi calling on behalf of [Provider]. You left a request on our website. Is it now a good time to talk?" " `}
        answer="Yes, I did. Thanks for the fast callback"
        secondText={`"Of course. Could you tell me a little more about your request so I can coordinate the right next step? "`}
        botsHref="/solutions?tab=other#solutions-info"
        background="/images/general/background-five.png"
        video="/videos/other-industries-handles.mp4"
      />
      <InsuranceCases
        title="Lead Follow-Up"
        description="A new request, called back to qualify the need and arrange the next step."
        audio="/audio/other-industries.mp3"
        visual="horizon"
        page="other-industries"
      />
      <InsuranceWhy
        items={[
          {
            id: 'intro',
            icon: null,
            video: '/videos/meet-the-team-drive.mp4',
            title: 'Why Teams',
            titleAccent: 'Bring Coldi In',
          },
          {
            id: 'handle-more-calls',
            icon: '/icons/bx_phone-call.svg',
            title: 'Handle more calls',
            body: 'AI voice calling gives healthcare, retail, and e-commerce teams the capacity to handle high call volumes without adding headcount.',
          },
          {
            id: 'follow-up-faster',
            icon: '/icons/ri_chat-follow-up-line.svg',
            title: 'Follow up faster',
            body: 'New requests and missed calls get an immediate response, so potential customers do not wait for an agent to become available.',
          },
          {
            id: 'automate-routine-tasks',
            icon: '/icons/mdi_checkbox-marked-circle-auto-outline.svg',
            title: 'Automate routine tasks',
            body: "From qualification and information collection to appointment scheduling, Coldi takes repetitive calls off your team's workload.",
          },
          {
            id: 'scale-without-a-call-center',
            icon: '/icons/boxicons_scale.svg',
            title: 'Scale without a call center',
            body: 'Technology companies, call centers, and service teams can expand their calling capacity without building a larger contact center.',
          },
        ]}
      />
      <InsuranceOperations
        title="Built for Secured Operations"
        description={
          <>
            Every call is logged with a full audit trail. ISO 27001 and GDPR certification in
            progress.
          </>
        }
      />
      <InsuranceInfo
        items={[
          {
            id: 'cannot-respond-fast-enough',
            label:
              'Your team handles hundreds or thousands of calls and requests, but cannot respond to all of them fast enough',
          },
          {
            id: 'leads-go-cold',
            label:
              'Valuable leads and customer requests go cold while your team is busy handling existing conversations',
          },
          {
            id: 'repetitive-calls',
            label:
              'Your agents spend too much time on repetitive calls, follow-ups, qualification, and appointment scheduling',
          },
          {
            id: 'volume-peaks',
            label:
              'Call volume fluctuates, but hiring enough people to cover every peak does not make operational sense',
          },
          {
            id: 'routine-conversations',
            label:
              'Your call center is overloaded with routine conversations that do not require a human agent',
          },
          {
            id: 'calling-capacity',
            label: 'You need more calling capacity without building a larger contact center',
          },
          {
            id: 'no-24-7-coverage',
            label:
              'Customers expect immediate responses, but your team cannot provide 24/7 coverage',
          },
        ]}
        description="Start with a 30-day pilot for one department, product category or service. "
        page="other-industries"
      />
    </main>
  );
}
