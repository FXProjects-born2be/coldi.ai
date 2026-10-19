'use client';

import { useState } from 'react';
import Image from 'next/image';

import { useTranslations } from 'next-intl';

import { cn } from '@/shared/lib/helpers';

import { INSURANCE_FAQ_IDS } from './content';
import st from './InsuranceFaq.module.scss';

export const InsuranceFaq = () => {
  const t = useTranslations('InsuranceFaq');
  const [openId, setOpenId] = useState<(typeof INSURANCE_FAQ_IDS)[number] | null>(
    INSURANCE_FAQ_IDS[0]
  );

  return (
    <section className={st.insurance_faq}>
      <div className="container">
        <div className={st.insurance_faq__row}>
          <div className={st.insurance_faq__left}>
            <h2 id="faq" className={st.insurance_faq__title}>
              {t('title')}
            </h2>
            <p className={st.insurance_faq__updated}>{t('lastUpdated')}</p>
          </div>

          <div className={st.insurance_faq__right}>
            {INSURANCE_FAQ_IDS.map((id) => {
              const isOpen = openId === id;
              const answerRaw = t.raw(`items.${id}.answer`);
              const paragraphs = Array.isArray(answerRaw)
                ? (answerRaw as string[])
                : [String(answerRaw)];

              return (
                <div key={id} id={id} className={st.insurance_faq__right_item}>
                  <button
                    type="button"
                    className={st.insurance_faq__right_heading}
                    aria-expanded={isOpen}
                    aria-controls={`${id}-answer`}
                    onClick={() => setOpenId(isOpen ? null : id)}
                  >
                    <h3 className={st.insurance_faq__right_heading_title}>
                      {t(`items.${id}.question`)}
                    </h3>
                    <span className={st.insurance_faq__right_heading_icon} aria-hidden>
                      <Image
                        src={isOpen ? '/icons/akar-icons-minus.svg' : '/icons/akar-icons-plus.svg'}
                        alt=""
                        width={24}
                        height={24}
                      />
                    </span>
                  </button>

                  <div
                    id={`${id}-answer`}
                    className={cn(
                      st.insurance_faq__right_content,
                      !isOpen && st.insurance_faq__right_content_collapsed
                    )}
                  >
                    {paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsuranceFaq;
