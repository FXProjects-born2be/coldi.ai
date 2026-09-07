import { getTranslations } from 'next-intl/server';

import st from './LegalInfo.module.scss';

const FILES = [
  { id: 'terms', href: '/terms-of-service.pdf' },
  { id: 'privacy', href: '/privacy-policy.pdf' },
  { id: 'dpa', href: '/dpa.pdf' },
] as const;

export const LegalInfo = async () => {
  const t = await getTranslations('LegalInfo');

  return (
    <div className={st.legal_info}>
      <div className="container">
        <div className={st.legal_info__list}>
          {FILES.map((file) => (
            <div key={file.id} className={st.legal_info__item}>
              <p className={st.legal_info__title}>{t(`files.${file.id}.title`)}</p>
              <p className={st.legal_info__meta}>{t(`files.${file.id}.meta`)}</p>

              <a
                className="btn btn-secondary mx-auto w-max"
                href={file.href}
                target="_blank"
                rel="noreferrer"
              >
                {t('download')}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
