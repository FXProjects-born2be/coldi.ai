import {
  ColdiAgentsBuilt,
  ColdiSpeaks,
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
    </main>
  );
}
