'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { cn } from '@/shared/lib/helpers';

import { FAQ_SECTIONS, type FaqSectionId } from './content';
import st from './FaqInfo.module.scss';

export const FaqInfo = () => {
  const t = useTranslations('FaqInfo');
  const [activeId, setActiveId] = useState<FaqSectionId>(FAQ_SECTIONS[0].id);

  const scrollToSection = (id: FaqSectionId) => {
    setActiveId(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className={st.faq_info} aria-labelledby="faq">
      <div className="container">
        <h2 id="faq" className={st.faq_info__heading}>
          {t('heading')}
        </h2>
        <p className={st.faq_info__updated}>{t('lastUpdated')}</p>

        <div className={st.faq_info__tabs} role="tablist" aria-label={t('tabsAria')}>
          {FAQ_SECTIONS.map((section) => (
            <button
              key={section.id}
              type="button"
              role="tab"
              aria-selected={section.id === activeId}
              className={cn(st.faq_info__tab, section.id === activeId && st.active)}
              onClick={() => scrollToSection(section.id)}
            >
              {t(`sections.${section.id}.title`)}
            </button>
          ))}
        </div>

        <div className={st.faq_info__content}>
          {FAQ_SECTIONS.map((section) => (
            <div key={section.id} id={section.id} className={st.faq_info__content_row}>
              <p className={st.faq_info__content_title}>{t(`sections.${section.id}.title`)}</p>
              <div className={st.faq_info__content_info}>
                {section.items.map((itemId) => (
                  <div key={itemId} id={itemId} className={st.faq_info__content_info_item}>
                    <h3 className={st.faq_info__content_info_title}>
                      {t(`sections.${section.id}.items.${itemId}.question`)}
                    </h3>
                    <p className={st.faq_info__content_info_description}>
                      {t(`sections.${section.id}.items.${itemId}.answer`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
