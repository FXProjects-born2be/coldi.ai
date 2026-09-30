import type {
  CaseStudyContent,
  HeroContent,
  ProblemContent,
} from '@/app/[locale]/global-professional-services-provider/components/data';

export const residentialElectricalStructure = {
  tocIds: [
    'problem',
    'engagement-snapshot',
    'integrated',
    'implementation',
    'issues',
    'monitoring',
    'went-wrong',
    'results',
  ] as const,
  problemItemIds: ['afterHours', 'manualScreening', 'scheduling'] as const,
  problemTriedIds: ['manualDispatch', 'offShelf'] as const,
  problemAskedBg: '/images/silverbellgroup/problem-one.png',
  problemConclusionBg: '/images/silverbellgroup/problem-two.png',
  snapshotCards: [
    { valueKey: 'timeline', src: 'icons/simple-one.svg', labelKey: 'timeline' },
    { value: '24/7', src: 'icons/simple-two.svg', labelKey: 'coverage' },
    {
      valueKey: 'lifecycle',
      src: 'icons/stone-engagement-icon-one.svg',
      labelKey: 'lifecycle',
    },
  ],
  implementationPhaseIds: [
    'discovery',
    'conversation',
    'testing',
    'emergency',
    'rollout',
    'hardening',
  ] as const,
  integratedIds: ['inbound', 'emergency', 'calendar', 'twilio'] as const,
  integratedSrc: [
    'icons/stone-built-one.svg',
    'icons/stone-built-two.svg',
    'icons/stone-built-three.svg',
    'icons/stone-built-four.svg',
  ],
  askedIds: ['emergency', 'disclosure', 'slot', 'scope', 'audio'] as const,
  askedSrc: [
    'icons/stone-asked-one.svg',
    'icons/stone-asked-two.svg',
    'icons/stone-asked-three.svg',
    'icons/stone-asked-four.svg',
    'icons/stone-asked-five.svg',
  ],
  askedAudioIds: ['projectScoping', 'quoteBooking'] as const,
  askedAudioAssets: [
    {
      image: '/images/silverbellgroup/asked-bg-one.png',
      audio: '/audio/electric-1.mp3',
    },
    {
      image: '/images/silverbellgroup/asked-bg-two.png',
      audio: '/audio/electric-2.mp3',
    },
  ],
  monitoringIds: ['territory', 'summarization', 'integrations'] as const,
  wentWrongCount: 12,
  resultsBg: '/images/silverbellgroup/results-bg.png',
  resultsShowSrc: '/images/silverbellgroup/clarity-result-two-bg.png',
  resultsMetrics: [
    { value: '24/7', labelKey: 'dispatching', highlight: false },
    { value: '100%', labelKey: 'lifecycle', highlight: true },
    { valueKey: 'instant', labelKey: 'calendarSync', highlight: false },
    { value: '100%', labelKey: 'leadCapture', highlight: false },
    { valueKey: 'immediate', labelKey: 'intentZip', highlight: false },
    { value: '100%', labelKey: 'notifications', highlight: false },
    { valueKey: 'threeSteps', labelKey: 'lifecycleSteps', highlight: false },
    { valueKey: 'escalation', labelKey: 'escalationLabel', highlight: false },
  ],
} as const;

type Translator = {
  (key: string): string;
  raw: (key: string) => string;
};

export const buildResidentialElectricalHero = (t: Translator): HeroContent => ({
  titleLine1: t('hero.titleLine1'),
  titleLine2: null,
  subtitle: t('hero.subtitle'),
  reportingRange: t('hero.reportingRange'),
  paragraphs: [t('hero.paragraph')],
});

export const buildResidentialElectricalCaseStudy = (t: Translator): CaseStudyContent => {
  const s = residentialElectricalStructure;

  const problem: ProblemContent = {
    title: t('problem.title'),
    items: s.problemItemIds.map((id) => ({
      title: t(`problem.items.${id}.title`),
      text: t(`problem.items.${id}.text`),
    })),
    tried: {
      title: t('problem.tried.title'),
      items: s.problemTriedIds.map((id) => ({
        title: t(`problem.tried.items.${id}.title`),
        text: t(`problem.tried.items.${id}.text`),
      })),
    },
    asked: {
      title: t('problem.asked.title'),
      text: t('problem.asked.text'),
      bgImage: s.problemAskedBg,
    },
    conclusion: {
      title: t('problem.conclusion.title'),
      text: t('problem.conclusion.text'),
      bgImage: s.problemConclusionBg,
    },
  };

  return {
    tocItems: s.tocIds.map((id) => ({
      id,
      title: t(`toc.${id}.title`),
      description: t(`toc.${id}.description`),
    })),
    problem,
    snapshotCards: s.snapshotCards.map((card) => ({
      value:
        'valueKey' in card
          ? t.raw(`snapshot.values.${card.valueKey}`)
          : (card as { value: string }).value,
      label: t(`snapshot.labels.${card.labelKey}`),
      src: card.src,
    })),
    implementationPhases: s.implementationPhaseIds.map((id) => ({
      title: t(`implementation.${id}.title`),
      text: t(`implementation.${id}.text`),
    })),
    integratedItems: s.integratedIds.map((id, index) => ({
      title: t(`integrated.${id}.title`),
      text: t(`integrated.${id}.text`),
      src: s.integratedSrc[index],
    })),
    askedCards: s.askedIds.map((id, index) => ({
      value: t(`asked.${id}.value`),
      label: t(`asked.${id}.label`),
      src: s.askedSrc[index],
    })),
    askedAudios: s.askedAudioIds.map((id, index) => ({
      title: t(`askedAudios.${id}.title`),
      text: t(`askedAudios.${id}.text`),
      image: s.askedAudioAssets[index].image,
      audio: s.askedAudioAssets[index].audio,
    })),
    monitoringItems: s.monitoringIds.map((id) => ({
      label: t(`monitoring.${id}.label`),
      value: t(`monitoring.${id}.value`),
    })),
    wentWrongItems: Array.from({ length: s.wentWrongCount }, (_, index) => ({
      title: t(`wentWrong.${index}`),
    })),
    resultsBg: s.resultsBg,
    resultsShow: {
      title: t('resultsShow.title'),
      text: t('resultsShow.text'),
      src: s.resultsShowSrc,
    },
    resultsMetrics: s.resultsMetrics.map((metric) => ({
      value:
        'valueKey' in metric
          ? t.raw(`resultsMetrics.values.${metric.valueKey}`)
          : (metric as { value: string }).value,
      label: t(`resultsMetrics.labels.${metric.labelKey}`),
      highlight: metric.highlight,
    })),
    column: 'one',
  };
};
