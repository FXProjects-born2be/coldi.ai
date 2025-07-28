import {
  ColdiAgentsBuilt,
  ColdiSpeaks,
  Faq,
  Hero,
  NeverMiss,
  OutboundCalling,
  VoiceAgentKPIs,
} from './components';

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
