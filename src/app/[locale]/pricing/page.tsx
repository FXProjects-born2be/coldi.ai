import { PricingTabs } from '@/features/pricing/ui/pricing-tabs/PricingTabs';

import { Hero, Infrustructure, ReadyToHear } from './components';

export default function Products() {
  return (
    <main>
      <Hero />
      <PricingTabs />
      <Infrustructure />
      <ReadyToHear />
    </main>
  );
}
