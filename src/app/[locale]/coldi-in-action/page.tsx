import type { Metadata } from 'next';

import { BotCard, Choose, Hero } from './components';

export const metadata: Metadata = {
  title: 'Listen to Recorded Calls',
  description:
    'Discover how Coldi’s AI voice sounds in action — a smooth, natural conversation that demonstrates real-world engagement and response flow.',
  openGraph: {
    title: 'Listen to Recorded Calls',
    description:
      'Discover how Coldi’s AI voice sounds in action — a smooth, natural conversation that demonstrates real-world engagement and response flow.',
    images: 'https://coldi.ai/images/meta.png',
  },
};

export default function Products() {
  return (
    <main>
      <Hero />
      <BotCard />
      <Choose />
    </main>
  );
}
