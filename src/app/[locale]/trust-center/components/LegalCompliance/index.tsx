import Image from 'next/image';
import NextLink from 'next/link';

import { getTranslations } from 'next-intl/server';

import st from './LegalCompliance.module.scss';

export const LegalCompliance = async () => {
  const t = await getTranslations('LegalCompliance');

  return (
    <section className={st.legal_compliance}>
      <div className="container">
        <div className={st.legal_compliance__row}>
          <div className={st.legal_compliance__left}>
            <Image
              src="/images/trust-center/compliance-bg.png"
              alt={t('starAiAria')}
              fill
              sizes="600px"
            />

            <p className={st.legal_compliance__subtitle}>{t('subtitle')}</p>

            <div className={st.legal_compliance__badges}>
              <NextLink
                href="https://cloudsecurityalliance.org/star/registry/coldi-labs-ltd"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('starAiAria')}
              >
                <Image
                  src="/images/footer/star-ai.png"
                  alt={t('starAiAria')}
                  width={150}
                  height={150}
                />
              </NextLink>
              <NextLink
                href="https://cloudsecurityalliance.org/star/registry/coldi-labs-ltd/services/coldi-ai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('starLevelAria')}
              >
                <Image
                  src="/images/footer/star-level.png"
                  alt={t('starLevelAria')}
                  width={150}
                  height={150}
                />
              </NextLink>
              <NextLink
                href="https://www.saashub.com/coldi?utm_source=badge&utm_campaign=badge&utm_content=coldi&badge_variant=color&badge_kind=approved"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('saasHubAria')}
              >
                <Image
                  src="/images/footer/saas-hub.png"
                  alt={t('saasHubAria')}
                  width={246}
                  height={82}
                />
              </NextLink>
            </div>
          </div>

          <div>
            <h2 className={st.legal_compliance__title}>{t('title')}</h2>
            <p className={st.legal_compliance__description}>{t('description')}</p>

            <div className={st.legal_compliance__contact}>
              <p className={st.legal_compliance__contact_title}>{t('contactTitle')}</p>
              <NextLink href="mailto:info@coldi.ai" className={st.legal_compliance__contact_link}>
                <Image src="/icons/ci_mail.svg" alt={t('mailIconAlt')} width={24} height={24} />
                info@coldi.ai
              </NextLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
