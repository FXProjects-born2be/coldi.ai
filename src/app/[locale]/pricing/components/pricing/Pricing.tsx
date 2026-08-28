import { PricingPlans } from '../PricingPlans';
import { Process } from '../process/Process';
import { SpecializedServices } from '../specialized-services/SpecializedServices';

export const Pricing = () => {
  return (
    <>
      <PricingPlans />
      <SpecializedServices />
      <Process />
    </>
  );
};
