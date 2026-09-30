import type {
  CaseStudyContent,
  HeroContent,
  ProblemContent,
} from '@/app/[locale]/global-professional-services-provider/components/data';

export const agriculturalInfrastructureStructure = {
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
  problemItemIds: ['manualScreening', 'resourceStrain', 'timeZones'] as const,
  problemTriedIds: ['manualFiltering', 'webForms'] as const,
  problemAskedBg: '/images/silverbellgroup/problem-one.png',
  problemConclusionBg: '/images/silverbellgroup/problem-two.png',
  snapshotCards: [
    {
      valueKey: 'timeline',
      src: 'icons/clarity-engagement-icon-one.svg',
      labelKey: 'timeline',
    },
    { value: '24/7', src: 'icons/clarity-engagement-icon-two.svg', labelKey: 'coverage' },
    {
      valueKey: 'intake',
      src: 'icons/clarity-engagement-icon-three.svg',
      labelKey: 'intake',
    },
    {
      valueKey: 'attributes',
      src: 'icons/clarity-engagement-icon-four.svg',
      labelKey: 'attributes',
    },
  ],
  implementationPhaseIds: [
    'discovery',
    'conversation',
    'screening',
    'transition',
    'deployment',
    'optimization',
  ] as const,
  integratedIds: ['discovery', 'crm', 'scoring', 'handoff'] as const,
  integratedSrc: [
    'icons/clarity-built-one.svg',
    'icons/clarity-built-two.svg',
    'icons/clarity-built-three.svg',
    'icons/clarity-built-four.svg',
  ],
  askedIds: ['sectorRules', 'warmHandoff', 'dataCapture'] as const,
  askedSrc: [
    'icons/clarity-asked-one.svg',
    'icons/clarity-asked-two.svg',
    'icons/clarity-asked-three.svg',
  ],
  monitoringIds: ['globalOps', 'thresholds', 'maintenance'] as const,
  wentWrongCount: 12,
  resultsBg: '/images/silverbellgroup/results-bg.png',
  resultsShowSrc: '/images/silverbellgroup/clarity-result-two-bg.png',
  resultsMetrics: [
    { value: '100%', labelKey: 'salesFocus', highlight: true },
    { valueKey: 'automated', labelKey: 'discovery', highlight: false },
    { valueKey: 'fourMetrics', labelKey: 'crmExtraction', highlight: false },
    { value: '24/7', labelKey: 'qualification', highlight: false },
    { valueKey: 'comingSoon1', labelKey: 'comingSoon1', highlight: false },
    { valueKey: 'comingSoon2', labelKey: 'comingSoon2', highlight: false },
    { valueKey: 'targeted', labelKey: 'targetedLabel', highlight: false },
    { valueKey: 'handoffs', labelKey: 'handoffsLabel', highlight: false },
  ],
} as const;

type Translator = {
  (key: string): string;
  raw: (key: string) => string;
};

export const buildAgriculturalInfrastructureHero = (t: Translator): HeroContent => ({
  titleLine1: t('hero.titleLine1'),
  titleLine2: null,
  subtitle: t('hero.subtitle'),
  reportingRange: t('hero.reportingRange'),
  paragraphs: [t('hero.paragraph')],
});

export const buildAgriculturalInfrastructureCaseStudy = (t: Translator): CaseStudyContent => {
  const s = agriculturalInfrastructureStructure;

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
