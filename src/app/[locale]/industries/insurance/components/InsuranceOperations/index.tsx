import st from './InsuranceOperations.module.scss';

import { Link } from '@/i18n/navigation';

export const InsuranceOperations = () => {
  return (
    <section className={st.insurance_operations}>
      <div className={'container'}>
        <h2 className={st.insurance_operations__title}>Built for Insurance Operations</h2>

        <p className={st.insurance_operations__desc}>
          Every call recorded, scripted to your approved language, and logged for audit. ISO 27001
          and GDPR certification in progress.
        </p>

        <Link href={'/trust-center'} className={'btn btn-primary w-max mx-auto'}>
          Our Security and Compliance
        </Link>
      </div>
      <video
        className={st.insurance_operations__video}
        src="/videos/insurance-operations.mp4"
        autoPlay
        playsInline
        muted
        loop
        preload="metadata"
        controls={false}
        aria-hidden
      />
    </section>
  );
};
