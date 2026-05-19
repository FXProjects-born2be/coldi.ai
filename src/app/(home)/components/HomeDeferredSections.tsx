'use client';

import dynamic from 'next/dynamic';

const VoicesList = dynamic(() => import('./voices-list/VoicesList').then((mod) => mod.VoicesList), {
  ssr: false,
});
const WhatCanDo = dynamic(() => import('./what-can-do/WhatCanDo').then((mod) => mod.WhatCanDo), {
  ssr: false,
});
const DashboardSlider = dynamic(
  () =>
    import('@/shared/ui/components/dashboard-slider/DashboardSlider').then(
      (mod) => mod.DashboardSlider
    ),
  { ssr: false }
);
const HearColdi = dynamic(() => import('./hear-coldi/HearColdi').then((mod) => mod.HearColdi), {
  ssr: false,
});
const Delivers = dynamic(() => import('./delivers/Delivers').then((mod) => mod.Delivers), {
  ssr: false,
});
const ColdiInNews = dynamic(
  () => import('./coldi-in-news/ColdiInNews').then((mod) => mod.ColdiInNews),
  { ssr: false }
);
const IndustrySolutionsSlider = dynamic(
  () =>
    import('./industry-solutions-slider/IndustrySolutionsSlider').then(
      (mod) => mod.IndustrySolutionsSlider
    ),
  { ssr: false }
);
const ProductSolutionsSlider = dynamic(
  () =>
    import('./product-solutions-slider/ProductSolutionsSlider').then(
      (mod) => mod.ProductSolutionsSlider
    ),
  { ssr: false }
);
const Reviews = dynamic(() => import('./reviews/Reviews').then((mod) => mod.Reviews), {
  ssr: false,
});
const WhatIs = dynamic(() => import('./what-it-is/WhatIs').then((mod) => mod.WhatIs), {
  ssr: false,
});
const Faq = dynamic(() => import('./faq/Faq').then((mod) => mod.Faq), {
  ssr: false,
});

export const HomeDeferredSections = () => {
  return (
    <>
      <VoicesList />
      <WhatCanDo />
      <DashboardSlider
        title="<span>Easily Track</span> How Coldi Works"
        subtitle="See all results in one place: review calls, compare performance, <br/>and optimize your campaigns with clear, real-time data."
      />
      <HearColdi />
      <Delivers />
      <ColdiInNews />
      <IndustrySolutionsSlider />
      <ProductSolutionsSlider />
      <Reviews />
      <WhatIs />
      <Faq />
    </>
  );
};
