import type { Metadata } from 'next';

import {
  ColdiAgentsBuilt,
  ColdiSpeaks,
  Faq,
  Hero,
  NeverMiss,
  OutboundCalling,
  VoiceAgentKPIs,
} from './components';

export const metadata: Metadata = {
  title: 'Our Voice Agents and Solutions',
  description:
    'Explore AI call center software and AI voice agents designed for real workflows. From AI outbound calling to scheduling and multilingual support, Coldi handles it all 24/7. Explore top AI calling solutions now!',
  openGraph: {
    title: 'Our Voice Agents and Solutions',
    description:
      'Explore AI call center software and AI voice agents designed for real workflows. From AI outbound calling to scheduling and multilingual support, Coldi handles it all 24/7. Explore top AI calling solutions now!',
    //images: 'https://coldi.ai/images/meta.png',
  },
};

export default function Products() {
  return (
    <main>
      <Hero />
      <NeverMiss />
      <OutboundCalling />
      <ColdiAgentsBuilt />
      <VoiceAgentKPIs />
      <ColdiSpeaks />
      <Faq />
    </main>
  );
}
