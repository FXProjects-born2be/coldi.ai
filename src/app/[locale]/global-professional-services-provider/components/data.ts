export type HeroContent = {
  titleLine1: string;
  titleLine2: string | null;
  subtitle: string;
  reportingRange: string;
  paragraphs: string[];
};

export type TocItem = {
  id: string;
  title: string;
  description: string;
};

export type SnapshotCard = {
  value: string;
  label: string;
  src: string;
};

export type IntegratedItem = {
  title: string;
  text: string;
  src: string;
};

export type ImplementationPhase = {
  title: string;
  subtitle?: string;
  text: string;
};

export type LabelValue = {
  label: string;
  value: string;
  list?: readonly string[];
};

export type ResultMetric = {
  value: string;
  label: string;
  highlight: boolean;
  subtitle?: string;
};

export type ProblemItem = {
  title: string;
  text: string;
};

export type ProblemPanel = {
  title: string;
  text: string;
  bgImage?: string;
};

export type ProblemContent = {
  title: string;
  items: readonly ProblemItem[];
  tried: {
    title: string;
    items: readonly ProblemItem[];
  };
  asked: ProblemPanel;
  conclusion: ProblemPanel;
};

export type AskedAudio = {
  title: string;
  text: string | null;
  image: string;
  audio: string;
};

export type CaseStudyContent = {
  tocItems: readonly TocItem[];
  problem?: ProblemContent;
  snapshotCards: readonly SnapshotCard[];
  implementationPhases: readonly ImplementationPhase[];
  integratedItems: readonly IntegratedItem[];
  askedCards: readonly SnapshotCard[];
  askedAudios?: readonly AskedAudio[] | null;
  askedAudioColumn?: 'one' | 'two';
  monitoringItems: readonly LabelValue[];
  wentWrongItems: readonly { title: string }[];
  resultsBg: string;
  resultsShow: {
    title: string;
    text: string;
    src: string;
  };
  resultsMetrics: readonly ResultMetric[];
  column?: 'one' | 'two';
};

export const professionalServicesStructure = {
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
  problemItemIds: ['timeZones', 'capacity', 'leadLeakage'] as const,
  problemTriedIds: ['chatbots', 'manualShifts', 'webForms'] as const,
  problemAskedBg: '/images/silverbellgroup/problem-one.png',
  problemConclusionBg: '/images/silverbellgroup/problem-two.png',
  snapshotCards: [
    { valueKey: 'timeline', src: 'icons/simple-one.svg', labelKey: 'timeline' },
    { value: '24/7', src: 'icons/simple-two.svg', labelKey: 'coverage' },
    { valueKey: 'integration', src: 'icons/simple-three.svg', labelKey: 'integration' },
    { valueKey: 'inquiries', src: 'icons/simple-four.svg', labelKey: 'inquiries' },
  ],
  implementationPhaseIds: [
    'discovery',
    'iterative',
    'portal',
    'escalation',
    'rollout',
    'hardening',
  ] as const,
  integratedIds: ['webAgent', 'knowledge', 'leadCapture', 'routing'] as const,
  integratedSrc: [
    'icons/autonomous.svg',
    'icons/domain.svg',
    'icons/proactive.svg',
    'icons/human.svg',
  ],
  askedIds: ['prompts', 'calendar', 'coverage'] as const,
  askedSrc: ['icons/specific.svg', 'icons/calendar.svg', 'icons/coverage.svg'],
  monitoringIds: ['turnkey', 'transparency', 'updates'] as const,
  wentWrongIds: [
    'headerArea',
    'headerHappened',
    'headerResolved',
    'dataArea',
    'dataHappened',
    'dataResolved',
    'scheduleArea',
    'scheduleHappened',
    'scheduleResolved',
    'handoffArea',
    'handoffHappened',
    'handoffResolved',
  ] as const,
  resultsBg: '/images/silverbellgroup/results-bg.png',
  resultsShowSrc: '/images/silverbellgroup/result-two-bg.png',
  resultsMetrics: [
    { value: '100+', labelKey: 'dailyInquiries', highlight: true },
    { valueKey: 'hoursSaved', labelKey: 'hoursSavedLabel', highlight: false },
    { value: '45%', labelKey: 'conversions', highlight: false },
    { value: '24/7', labelKey: 'globalCoverage', highlight: false },
  ],
} as const;

type Translator = {
  (key: string): string;
  raw: (key: string) => string;
};

export const buildProfessionalServicesHero = (t: Translator): HeroContent => ({
  titleLine1: t('hero.titleLine1'),
  titleLine2: t('hero.titleLine2'),
  subtitle: t('hero.subtitle'),
  reportingRange: t('hero.reportingRange'),
  paragraphs: [t('hero.paragraph')],
});

export const buildProfessionalServicesCaseStudy = (t: Translator): CaseStudyContent => {
  const s = professionalServicesStructure;

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
    wentWrongItems: s.wentWrongIds.map((id) => ({
      title: t(`wentWrong.${id}`),
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
    column: 'two',
  };
};
