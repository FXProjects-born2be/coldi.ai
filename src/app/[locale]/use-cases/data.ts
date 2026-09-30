export type FeaturedCaseMeta = {
  id: string;
  href: string;
  results: {
    value: string;
    suffixKey?: 'sec' | 'hours' | 'talk' | 's' | 'm' | 'min' | 'metrics' | 'steps' | 'click';
    labelKey: string;
  }[];
};

export type ImplementationMeta = {
  id: string;
  href: string;
  handles: { icon: string; labelKey: string }[];
};

export type WorkflowMeta = {
  id: string;
  icon: string;
};

export const FEATURED_CASES: FeaturedCaseMeta[] = [
  {
    id: 'multi-asset-broker',
    href: '/multi-asset-trading-and-investment-platform',
    results: [
      { value: '29,377', labelKey: 'callsPlaced' },
      { value: '88+', suffixKey: 'talk', labelKey: 'talkHours' },
      { value: '96.4%', labelKey: 'pickupEfficiency' },
      { value: '672', labelKey: 'qualifiedLeads' },
    ],
  },
  {
    id: 'payment-solutions',
    href: '/canadian-fintech',
    results: [
      { value: '100%', labelKey: 'reviewAutomation' },
      { value: '0', suffixKey: 'sec', labelKey: 'escalationLag' },
      { value: '10+', suffixKey: 'hours', labelKey: 'savedMonthly' },
      { value: '24/7', labelKey: 'inboundCoverage' },
    ],
  },
  {
    id: 'silverbell',
    href: '/global-professional-services-provider',
    results: [
      { value: '100+', labelKey: 'dailyInquiries' },
      { value: '75', suffixKey: 'hours', labelKey: 'hoursSavedWeekly' },
      { value: '45%', labelKey: 'leadConversions' },
      { value: '24/7', labelKey: 'globalCoverage' },
    ],
  },
  {
    id: 'stone-electric',
    href: '/residential-electrical-contractor',
    results: [
      { value: '24/7', labelKey: 'dispatch' },
      { value: '0', suffixKey: 's', labelKey: 'emergencyDelay' },
      { value: '100%', labelKey: 'bookingAutomated' },
      { value: '0', suffixKey: 'm', labelKey: 'schedulingOverhead' },
    ],
  },
  {
    id: 'agricultural-infrastructure-provider',
    href: '/global-agricultural-infrastructure-provider',
    results: [
      { value: '100%', labelKey: 'salesFocus' },
      { value: '0', suffixKey: 'min', labelKey: 'screeningOverhead' },
      { value: '4', suffixKey: 'metrics', labelKey: 'crmExtraction' },
      { value: '24/7', labelKey: 'multiTimezone' },
    ],
  },
  {
    id: 'hvac-saas',
    href: '/saas-and-hvac-service-operator',
    results: [
      { value: '27', labelKey: 'leadsCaptured' },
      { value: '2', suffixKey: 'steps', labelKey: 'objectionHandling' },
      { value: '100%', labelKey: 'techStackCapture' },
      { value: '1', suffixKey: 'click', labelKey: 'smsDemo' },
    ],
  },
];

export const IMPLEMENTATIONS: ImplementationMeta[] = [
  {
    id: 'digital-ads',
    href: '/performance-marketing-agency',
    handles: [
      { icon: '/images/use-cases-hub/handle-outbound.png', labelKey: 'outbound' },
      { icon: '/icons/griddy-icons_customer-support.svg', labelKey: 'availability' },
      { icon: '/images/use-cases-hub/handle-handoff.png', labelKey: 'liveTransfer' },
      { icon: '/icons/hugeicons_appointment-02.svg', labelKey: 'callback' },
      { icon: '/images/use-cases-hub/handle-interest.png', labelKey: 'inboundId' },
      { icon: '/icons/bx_data.svg', labelKey: 'dataRetrieval' },
    ],
  },
  {
    id: 'portfolioiq',
    href: '/canadian-fintech',
    handles: [
      { icon: '/images/use-cases-hub/handle-outbound.png', labelKey: 'outbound' },
      { icon: '/images/use-cases-hub/handle-interest.png', labelKey: 'interest' },
      { icon: '/images/use-cases-hub/handle-callback.png', labelKey: 'callbackConversion' },
      { icon: '/icons/ri_chat-follow-up-line.svg', labelKey: 'sms' },
      { icon: '/images/use-cases-hub/handle-handoff.png', labelKey: 'dataCapture' },
    ],
  },
];

export const WORKFLOWS: WorkflowMeta[] = [
  { id: 'qualify', icon: '/icons/fluent_call-inbound-16-regular.svg' },
  { id: 'follow-up', icon: '/icons/ri_chat-follow-up-line.svg' },
  { id: 'support', icon: '/icons/fluent_person-support-16-regular.svg' },
  { id: 'schedule', icon: '/icons/hugeicons_appointment-02.svg' },
  { id: 'dispatch', icon: '/icons/carbon_send.svg' },
  { id: 'comply', icon: '/icons/cil_balance-scale.svg' },
];
