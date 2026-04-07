'use client';

import Image from 'next/image';

import st from './Visuals.module.scss';

type VisualProps = {
  alt: string;
};

export const ImplementationVisual = ({ alt }: VisualProps) => {
  return (
    <div className={st.surface}>
      <Image
        src="/images/customer-service-agent/implementation-photo.png"
        alt={alt}
        fill
        className={st.photo}
        unoptimized
      />
      <div className={st.implementationCard}>
        <p>Deployment</p>
        <div className={st.progressTrack}>
          <div className={st.progressFill} />
          <span className={st.progressDot} />
        </div>
        <div className={st.badge}>88%</div>
        <Image
          src="/images/customer-service-agent/implementation-pointer.svg"
          alt=""
          width={18}
          height={22}
          className={st.pointer}
          unoptimized
        />
      </div>
    </div>
  );
};

export const ProgressVisual = ({ alt }: VisualProps) => {
  return (
    <div className={st.surface} aria-label={alt} role="img">
      <div className={st.progressVisual}>
        <h3>AI Implementation Progress</h3>
        {['Instant Responses', 'Smart Routing', 'Context Memory'].map((item) => (
          <div key={item} className={st.progressPill}>
            <Image
              src="/images/customer-service-agent/check-pill.svg"
              alt=""
              width={32}
              height={32}
              unoptimized
            />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const DecisionVisual = ({ alt }: VisualProps) => {
  const metrics = [
    { label: 'Manual Workload', value: '54%' },
    { label: 'Resolution Time', value: '41%' },
    { label: 'Customer Satisfaction', value: '32%' },
  ];

  const steps = [
    { label: 'Intent Detected', icon: '/images/customer-service-agent/check-step-filled.svg' },
    { label: 'Data Retrieved', icon: '/images/customer-service-agent/check-step-outline.svg' },
    { label: 'Action Executed' },
  ];

  return (
    <div className={st.surface} aria-label={alt} role="img">
      <div className={st.decisionCard}>
        <h3>Real-time AI decision making</h3>
        <div className={st.metricGrid}>
          {metrics.map((metric) => (
            <div key={metric.label} className={st.metricPill}>
              <span>{metric.label}</span>
              <strong>
                {metric.value}
                <Image
                  src="/images/customer-service-agent/arrow-up.svg"
                  alt=""
                  width={17}
                  height={17}
                  unoptimized
                />
              </strong>
            </div>
          ))}
        </div>
        <div className={st.divider} />
        <div className={st.steps}>
          {steps.map((step, index) => (
            <div key={step.label} className={st.stepRow}>
              <div className={st.stepRail}>
                {step.icon ? (
                  <Image src={step.icon} alt="" width={24} height={24} unoptimized />
                ) : (
                  <span className={st.stepCircle} />
                )}
                {index < steps.length - 1 && (
                  <span className={index === 0 ? st.lineBlue : st.lineGrey} />
                )}
              </div>
              <p className={index === 0 ? st.stepActive : ''}>{step.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const GrowthVisual = ({ alt }: VisualProps) => {
  const labels = [
    { label: 'Launch', left: '12%' as const, top: '44%' as const },
    { label: 'Launch', left: '36%' as const, top: '37%' as const },
    { label: 'Optimize', left: '62%' as const, top: '27%' as const },
    { label: 'Lead', left: '84%' as const, top: '12%' as const },
  ];

  return (
    <div className={st.surface} aria-label={alt} role="img">
      <div className={st.growthCard}>
        <h3>Built for Long-Term Growth</h3>
        <div className={st.chart}>
          <div className={st.gridLines} />
          <Image
            src="/images/customer-service-agent/growth-area.svg"
            alt=""
            fill
            className={st.chartArea}
            unoptimized
          />
          <Image
            src="/images/customer-service-agent/growth-line.svg"
            alt=""
            fill
            className={st.chartLine}
            unoptimized
          />
          {labels.map((item) => (
            <div
              key={item.label + item.left}
              className={st.chartPoint}
              style={{ left: item.left, top: item.top }}
            >
              <span className={st.chartBadge}>{item.label}</span>
              <span className={st.chartStem} />
              <Image
                src="/images/customer-service-agent/growth-dot.svg"
                alt=""
                width={16}
                height={16}
                className={st.chartDot}
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
