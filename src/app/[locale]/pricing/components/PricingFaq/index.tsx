'use client';

import { useState } from 'react';
import Image from 'next/image';

import { useTranslations } from 'next-intl';

import { cn } from '@/shared/lib/helpers';

import { PRICING_FAQ_IDS } from './content';
import st from './PricingFaq.module.scss';

import { Link } from '@/i18n/navigation';

export const PricingFaq = () => {
  const t = useTranslations('PricingFaq');
  const tGeneral = useTranslations('General');
  const [openId, setOpenId] = useState<(typeof PRICING_FAQ_IDS)[number] | null>(PRICING_FAQ_IDS[0]);

  return (
    <section className={st.pricing_faq}>
      <div className="container">
        <div className={st.pricing_faq__row}>
          <div className={st.pricing_faq__left}>
            <h2 id="faq" className={st.pricing_faq__title}>
              {t('title')}
            </h2>
            <p className={st.pricing_faq__updated}>{t('lastUpdated')}</p>

            <Link href="/faq" className={`btn btn-secondary w-max ${st.pricing_faq__btn_desktop}`}>
              {tGeneral('faqLink')}
            </Link>
          </div>

          <div className={st.pricing_faq__right}>
            {PRICING_FAQ_IDS.map((id) => {
              const isOpen = openId === id;
              const answerRaw = t.raw(`items.${id}.answer`);
              const paragraphs = Array.isArray(answerRaw)
                ? (answerRaw as string[])
                : [String(answerRaw)];

              return (
                <div key={id} id={id} className={st.pricing_faq__right_item}>
                  <button
                    type="button"
                    className={st.pricing_faq__right_heading}
                    aria-expanded={isOpen}
                    aria-controls={`${id}-answer`}
                    onClick={() => setOpenId(isOpen ? null : id)}
                  >
                    <h3 className={st.pricing_faq__right_heading_title}>
                      {t(`items.${id}.question`)}
                    </h3>
                    <span className={st.pricing_faq__right_heading_icon} aria-hidden>
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
                      st.pricing_faq__right_content,
                      !isOpen && st.pricing_faq__right_content_collapsed
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

          <Link href="/faq" className={`btn btn-secondary w-max ${st.pricing_faq__btn_tablet}`}>
            {tGeneral('faqLink')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingFaq;
