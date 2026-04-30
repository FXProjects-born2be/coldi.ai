'use client';

import { useState } from 'react';

import { useRequestPricingStore } from '@/features/request-pricing/store/store';
import { RequestDialog } from '@/features/request-pricing/ui/request-dialog/RequestDialog';

import { Hero } from '../hero/Hero';
import { PricingPlans } from '../pricing-plans/PricingPlans';
import { Process } from '../process/Process';
import { SpecializedServices } from '../specialized-services/SpecializedServices';

type RequestPlan = {
  label: string;
  title: string;
  price: string;
};

export const Pricing = () => {
  const [open, setOpen] = useState(false);
  const setPlan = useRequestPricingStore((state) => state.setPlan);

  const handleRequest = (plan: RequestPlan) => {
    setPlan(plan);
    setOpen(true);
  };

  return (
    <>
      <Hero />
      <PricingPlans onRequest={handleRequest} />
      <SpecializedServices onRequest={handleRequest} />
      <Process />
      <RequestDialog open={open} setOpen={setOpen} />
    </>
  );
};
