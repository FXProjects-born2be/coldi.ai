import type {
  CaseStudyContent,
  HeroContent,
  ProblemContent,
} from '@/app/[locale]/global-professional-services-provider/components/data';

/** Non-translated structure: icons, images, numeric values, section ids. */
export const multiAssetStructure = {
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
  problemItemIds: ['highDial', 'lowContact', 'scheduling'] as const,
  problemTriedIds: ['manual', 'basicDialers'] as const,
  problemAskedBg: '/images/silverbellgroup/problem-one.png',
  problemConclusionBg: '/images/silverbellgroup/problem-two.png',
  snapshotCards: [
    { value: '29,377', src: 'icons/evest-engagement-icon-one.svg', labelKey: 'callsPlaced' },
    { value: '6,886', src: 'icons/evest-engagement-icon-two.svg', labelKey: 'callsAnswered' },
    { value: '6,638', src: 'icons/evest-engagement-icon-three.svg', labelKey: 'liveReached' },
    { value: '3,519', src: 'icons/evest-engagement-icon-four.svg', labelKey: 'conversations' },
    {
      valueKey: 'talkTime',
      src: 'icons/evest-engagement-icon-five.svg',
      labelKey: 'talkTimeLabel',
    },
    {
      valueKey: 'avgLength',
      src: 'icons/evest-engagement-icon-six.svg',
      labelKey: 'avgLength',
    },
    { value: '672', src: 'icons/evest-engagement-icon-seven.svg', labelKey: 'qualifiedLeads' },
    { value: '+5.5%', src: 'icons/evest-engagement-icon-eight.svg', labelKey: 'momRate' },
  ],
  implementationPhaseIds: ['rollout', 'optimization'] as const,
  integratedIds: ['multiDial', 'amd', 'callback', 'intent'] as const,
  integratedSrc: [
    'icons/evest-built-one.svg',
    'icons/evest-built-two.svg',
    'icons/evest-built-three.svg',
    'icons/evest-built-four.svg',
  ],
  askedIds: ['callbackProtocol', 'midCampaign'] as const,
  askedSrc: ['icons/evest-asked-one.svg', 'icons/evest-asked-two.svg'],
  monitoringIds: ['cadence', 'overlap', 'dialogue'] as const,
  wentWrongCount: 12,
  resultsBg: '/images/silverbellgroup/results-bg.png',
  resultsShowSrc: '/images/silverbellgroup/clarity-result-two-bg.png',
  resultsMetrics: [
    { value: '672', labelKey: 'qualifiedInterest', highlight: true },
    { value: '671', labelKey: 'callbacksArranged', highlight: false },
    { value: '92.8%', labelKey: 'callbackAccuracy', highlight: false },
    { value: '3,519', labelKey: 'liveConversations', highlight: false },
    { value: '96.4%', labelKey: 'pickupEfficiency', highlight: false },
    { value: '55.8%', labelKey: 'peakConversion', highlight: true },
    { valueKey: 'precisionLockIn', labelKey: 'precisionLockInLabel', highlight: false },
    { valueKey: 'voicemailFilter', labelKey: 'voicemailFilterLabel', highlight: false },
  ],
} as const;

type Translator = {
  (key: string): string;
  raw: (key: string) => string;
};

export const buildMultiAssetHero = (t: Translator): HeroContent => ({
  titleLine1: t('hero.titleLine1'),
  titleLine2: null,
  subtitle: t('hero.subtitle'),
  reportingRange: t('hero.reportingRange'),
  paragraphs: [t('hero.paragraph')],
});

export const buildMultiAssetCaseStudy = (t: Translator): CaseStudyContent => {
  const s = multiAssetStructure;

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

// Keep named exports for any leftover imports during transition
export const resultsBg = multiAssetStructure.resultsBg;
