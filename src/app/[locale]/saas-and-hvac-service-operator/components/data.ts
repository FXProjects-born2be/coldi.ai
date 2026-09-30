import type {
  CaseStudyContent,
  HeroContent,
  ProblemContent,
} from '@/app/[locale]/global-professional-services-provider/components/data';

export const saasHvacStructure = {
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
  problemItemIds: ['databaseDecay', 'manualCalling', 'latency'] as const,
  problemTriedIds: ['manualSdr', 'dialers'] as const,
  problemAskedBg: '/images/silverbellgroup/problem-one.png',
  problemConclusionBg: '/images/silverbellgroup/problem-two.png',
  snapshotCards: [
    { value: '67', src: 'icons/hvac-engagement-icon-one.svg', labelKey: 'calls' },
    {
      valueKey: 'duration',
      src: 'icons/hvac-engagement-icon-two.svg',
      labelKey: 'duration',
    },
    { value: '27', src: 'icons/hvac-engagement-icon-three.svg', labelKey: 'leads' },
    { value: '<500ms', src: 'icons/hvac-engagement-icon-four.svg', labelKey: 'latency' },
  ],
  implementationPhaseIds: ['phase1', 'phase2', 'phase3', 'phase4', 'phase5', 'phase6'] as const,
  integratedIds: ['voice', 'calendly', 'crm', 'dashboard'] as const,
  integratedSrc: [
    'icons/hvac-built-one.svg',
    'icons/hvac-built-two.svg',
    'icons/hvac-built-three.svg',
    'icons/hvac-built-four.svg',
  ],
  askedIds: ['objection', 'techStack', 'conversion'] as const,
  askedSrc: [
    'icons/hvac-saas-asked-one.svg',
    'icons/hvac-saas-asked-two.svg',
    'icons/hvac-saas-asked-three.svg',
  ],
  askedAudioIds: ['hvacVoice'] as const,
  askedAudioAssets: [
    {
      image: '/images/silverbellgroup/asked-bg-one.png',
      audio: '/audio/hvac.mp3',
      text: null,
    },
  ],
  monitoringIds: ['latency', 'outreach', 'crm'] as const,
  wentWrongCount: 12,
  resultsBg: '/images/silverbellgroup/results-bg.png',
  resultsShowSrc: '/images/silverbellgroup/clarity-result-two-bg.png',
  resultsMetrics: [
    { value: '27', labelKey: 'qualifiedLeads', highlight: true },
    { valueKey: 'twoSteps', labelKey: 'objectionHandling', highlight: false },
    { value: '100%', labelKey: 'techStackLogged', highlight: false },
    { valueKey: 'oneClick', labelKey: 'smsDelivery', highlight: false },
    { value: '67', labelKey: 'outboundCalls', highlight: false },
    { valueKey: 'callMinutes', labelKey: 'callMinutesLabel', highlight: false },
    { valueKey: 'linkDispatch', labelKey: 'linkDispatchLabel', highlight: false },
    { valueKey: 'marketResearch', labelKey: 'marketResearchLabel', highlight: false },
  ],
} as const;

type Translator = {
  (key: string): string;
  raw: (key: string) => string;
};

export const buildSaasHvacHero = (t: Translator): HeroContent => ({
  titleLine1: t('hero.titleLine1'),
  titleLine2: null,
  subtitle: t('hero.subtitle'),
  reportingRange: t('hero.reportingRange'),
  paragraphs: [t('hero.paragraph')],
});

export const buildSaasHvacCaseStudy = (t: Translator): CaseStudyContent => {
  const s = saasHvacStructure;

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
      text: s.askedAudioAssets[index].text,
      image: s.askedAudioAssets[index].image,
      audio: s.askedAudioAssets[index].audio,
    })),
    askedAudioColumn: 'one',
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
