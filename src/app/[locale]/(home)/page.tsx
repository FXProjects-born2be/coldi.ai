import type { Metadata } from 'next';

import { getCoreVoiceAgentService } from '@/shared/lib/seo/core-services';
import { ServiceStructuredData } from '@/shared/ui/components/structured-data/ServiceStructuredData';
import { SoftwareApplicationStructuredData } from '@/shared/ui/components/structured-data/SoftwareApplicationStructuredData';

import {
  Hero,
  HomeBuiltFor,
  HomeFeaturedOn,
  HomeHearVoice,
  HomeManaged,
  HomeTools,
  HomeWhatCanDo,
} from './components';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
  keywords: ['AI voice agents for fintech'],
};

export default function Home() {
  return (
    <main>
      <SoftwareApplicationStructuredData id="home-software-application-jsonld" />
      <ServiceStructuredData id="home-service-jsonld" services={[getCoreVoiceAgentService()]} />
      <Hero />
      <HomeBuiltFor />
      <HomeTools />
      <HomeWhatCanDo />
      <HomeHearVoice />
      <HomeFeaturedOn />
      <HomeManaged />
    </main>
  );
}
