import type { ReactNode } from 'react';

import { LazyVideo } from '@/shared/ui/components/lazy-video';

import st from './InsuranceOperations.module.scss';

import { Link } from '@/i18n/navigation';

type InsuranceOperationsProps = {
  title?: string;
  description?: ReactNode;
  video?: string;
};

export const InsuranceOperations = ({
  title = 'Built for Insurance Operations',
  description = 'Every call follows your approved scripts and messaging, with complete recordings, transcripts, and audit logs. Built to support GDPR-compliant insurance operations.',
  video = '/videos/insurance-operations.mp4',
}: InsuranceOperationsProps) => {
  return (
    <section className={st.insurance_operations}>
      <div className={'container'}>
        <h2 className={st.insurance_operations__title}>{title}</h2>

        <p className={st.insurance_operations__desc}>{description}</p>

        <Link href={'/trust-center'} className={'btn btn-primary w-max mx-auto'}>
          Our Security and Compliance
        </Link>
      </div>
      <LazyVideo className={st.insurance_operations__video} src={video} />
    </section>
  );
};
