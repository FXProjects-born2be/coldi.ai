'use client';

import Image from 'next/image';

import { imageAlt } from '@/shared/constants/page-image-alt';

import st from './Visuals.module.scss';

type VisualProps = {
  alt?: string;
};

const pageAlt = imageAlt('aiForQualityControl');

export const HeroVisual = ({ alt = `${pageAlt} hero visual` }: VisualProps) => {
  return (
    <div className={st.heroSurface} aria-label={alt} role="img">
      <Image
        src="/images/ai-for-quality-control/hero-visual.png"
        alt={alt}
        fill
        className={st.containImage}
        unoptimized
      />
    </div>
  );
};

export const DashboardVisual = ({ alt = `${pageAlt} management dashboard` }: VisualProps) => {
  return (
    <div className={st.panelSurface} aria-label={alt} role="img">
      <div className={st.panelChrome}>
        <div className={st.panelDots}>
          <span />
          <span />
          <span />
        </div>
        <span className={st.panelTitle}>Dashboard</span>
      </div>

      <div className={st.dashboardStatRow}>
        <div className={st.dashboardStat}>
          <span>Total cases</span>
          <strong>3,254</strong>
        </div>
        <div className={st.dashboardStat}>
          <span>Reviewed</span>
          <strong>
            98%
            <Image
              src="/images/ai-for-quality-control/metric-arrow.svg"
              alt=""
              width={16}
              height={16}
              unoptimized
            />
          </strong>
        </div>
      </div>

      <div className={st.dashboardFrame}>
        <Image
          src="/images/ai-for-quality-control/dashboard-bg.png"
          alt=""
          fill
          className={st.coverImage}
          unoptimized
        />
        <Image
          src="/images/ai-for-quality-control/dashboard-table.png"
          alt=""
          fill
          className={st.coverImage}
          unoptimized
        />
      </div>
    </div>
  );
};

export const AnalysisVisual = ({ alt = `${pageAlt} analysis result` }: VisualProps) => {
  return (
    <div className={st.panelSurface} aria-label={alt} role="img">
      <div className={st.analysisHeader}>
        <div>
          <span className={st.analysisEyebrow}>Result #740</span>
          <strong>Lead qualification and KYC analysis</strong>
        </div>
        <span className={st.analysisBadge}>AI reviewed</span>
      </div>

      <div className={st.analysisFrame}>
        <Image
          src="/images/ai-for-quality-control/analysis-bg.png"
          alt=""
          fill
          className={st.coverImage}
          unoptimized
        />
        <Image
          src="/images/ai-for-quality-control/analysis-table.png"
          alt=""
          fill
          className={st.coverImage}
          unoptimized
        />
      </div>
    </div>
  );
};

export const CoverageVisual = ({ alt = `${pageAlt} coverage dashboard` }: VisualProps) => {
  return (
    <div className={st.coverageSurface} aria-label={alt} role="img">
      <div className={st.coverageTop}>
        <div>
          <span>Monitoring coverage</span>
          <strong>24/7 oversight</strong>
        </div>
        <p>Every call, every rep, every touchpoint.</p>
      </div>

      <div className={st.coverageGrid}>
        <article>
          <span>Audited conversations</span>
          <strong>100%</strong>
        </article>
        <article>
          <span>Flagged issues</span>
          <strong>312</strong>
        </article>
        <article>
          <span>Auto-synced fields</span>
          <strong>28k</strong>
        </article>
        <article>
          <span>Average score</span>
          <strong>91.4%</strong>
        </article>
      </div>

      <div className={st.coverageBar}>
        <span />
      </div>
    </div>
  );
};

export const QualityVisual = ({ alt = `${pageAlt} quality control workflow` }: VisualProps) => {
  const chips = [
    { label: 'QA Accuracy', value: '98.4%' },
    { label: 'Error Rate', value: '-35%' },
    { label: 'Processing Speed', value: 'Real-time' },
  ];

  const toggles = ['Compliance', 'Quality', 'Consistency'];

  return (
    <div className={st.qualitySurface} aria-label={alt} role="img">
      <div className={st.qualityPanel}>
        <div className={st.qualityTopBar}>
          <span />
          <span />
          <span />
        </div>

        <div className={st.qualityMedia} />

        <div className={st.qualityChips}>
          {chips.map((chip) => (
            <div key={chip.label} className={st.qualityChip}>
              <span>{chip.label}</span>
              <strong>{chip.value}</strong>
            </div>
          ))}
          {toggles.map((toggle) => (
            <div key={toggle} className={st.qualityChip}>
              <span>{toggle}</span>
              <div className={st.switch}>
                <div />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const FaqChevron = () => (
  <div className={st.faqChevron}>
    <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 6L8 11L13 6"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  </div>
);

export const IntegrationVisual = ({ alt = `${pageAlt} integration map` }: VisualProps) => {
  const items = [
    { label: 'Log', icon: '/images/ai-for-quality-control/check-log.svg', className: st.log },
    { label: 'Call', icon: '/images/ai-for-quality-control/check-call.svg', className: st.call },
    { label: 'CRM', icon: '/images/ai-for-quality-control/check-crm.svg', className: st.crm },
    {
      label: 'Dashboard',
      icon: '/images/ai-for-quality-control/check-crm.svg',
      className: st.dashboard,
    },
  ];

  return (
    <div className={st.integrationSurface} aria-label={alt} role="img">
      <h3>Integration</h3>
      <span className={`${st.path} ${st.pathTop}`} />
      <span className={`${st.path} ${st.pathMiddle}`} />
      <span className={`${st.path} ${st.pathBottom}`} />

      {items.map((item) => (
        <div key={item.label} className={`${st.integrationNode} ${item.className}`}>
          <Image src={item.icon} alt="" width={32} height={32} unoptimized />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};
