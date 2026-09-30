import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';

import { LazyVideo } from '@/shared/ui/components/lazy-video';

import st from './InsuranceOperations.module.scss';

import { Link } from '@/i18n/navigation';

type InsuranceOperationsProps = {
  title?: string;
  description?: ReactNode;
  video?: string;
};

export const InsuranceOperations = async ({
  title,
  description,
  video = '/videos/insurance-operations.mp4',
}: InsuranceOperationsProps) => {
  const t = await getTranslations('InsuranceOperations');

  return (
    <section className={st.insurance_operations}>
      <div className={'container'}>
        <h2 className={st.insurance_operations__title}>{title ?? t('title')}</h2>

        <p className={st.insurance_operations__desc}>{description ?? t('description')}</p>

        <Link href={'/trust-center'} className={'btn btn-primary w-max mx-auto'}>
          {t('cta')}
        </Link>
      </div>
      <LazyVideo className={st.insurance_operations__video} src={video} />
    </section>
  );
};
