'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { useTranslations } from 'next-intl';

import st from './NewsInterview.module.scss';

export default function NewsInterview() {
  const t = useTranslations('NewsInterview');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={st.news_interview}>
      <div className="container">
        <div className={st.news_interview__row}>
          <div>
            <p className={st.news_interview__badge}>{t('badge')}</p>

            <h2 className={st.news_interview__title}>{t('title')}</h2>

            <div className={st.news_interview__description_wrapper}>
              <p className={st.news_interview__description}>{t('description.first')}</p>

              <p className={st.news_interview__description}>{t('description.second')}</p>

              <p className={st.news_interview__description}>{t('description.third')}</p>
            </div>
          </div>

          <div className={st.news_interview__image}>
            <Image src="/images/news/interview-image.png" alt={t('imageAlt')} fill sizes="795px" />

            <button
              type="button"
              className={st.news_interview__btn}
              onClick={() => setIsOpen(true)}
              aria-label={t('playButton')}
            >
              <Image src="/icons/basil_play-solid.svg" width={48} height={48} alt="" />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className={st.news_interview__modal}>
          <div className={st.news_interview__overlay} onClick={closeModal} />

          <button
            type="button"
            className={st.news_interview__close}
            onClick={closeModal}
            aria-label={t('closeButton')}
          >
            <span />
            <span />
          </button>

          <div className={st.news_interview__modal_content}>
            <iframe
              className={st.news_interview__modal_video}
              src="https://www.youtube.com/embed/hRBatBW2IPw?autoplay=1"
              title={t('title')}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              width="1920"
              height="1080"
            />
          </div>
        </div>
      )}
    </div>
  );
}
