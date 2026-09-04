import Image from 'next/image';

import { getTranslations } from 'next-intl/server';

import st from './InsuranceWhy.module.scss';

const items = [
  {
    id: 'intro',
    icon: null,
    video: '/videos/meet-the-team-drive.mp4',
  },
  {
    id: 'renewals',
    icon: '/icons/reicon_subscription.svg',
    video: null,
  },
  {
    id: 'claimsIntake',
    icon: '/icons/bx_data.svg',
    video: null,
  },
  {
    id: 'crossSell',
    icon: '/icons/ic_outline-sell.svg',
    video: null,
  },
  {
    id: 'verification',
    icon: '/icons/ic_outline-policy.svg',
    video: null,
  },
] as const;

export const InsuranceWhy = async () => {
  const t = await getTranslations('InsuranceWhy');

  return (
    <div className={st.insurance_why}>
      <div className="container">
        <div className={st.insurance_why__list}>
          {items.map((item) => {
            const isIntro = item.icon === null;
            const hasBody = t.has(`items.${item.id}.body`);

            return (
              <article key={item.id} className={st.insurance_why__card}>
                {item.icon && (
                  <div className={st.insurance_why__icon}>
                    <Image src={item.icon} alt="" width={24} height={24} aria-hidden="true" />
                  </div>
                )}

                {isIntro ? (
                  <h2 className={st.insurance_why__title}>
                    {t(`items.${item.id}.title`)}
                    {t.has(`items.${item.id}.titleRest`) && (
                      <>
                        <br />
                        <span>{t(`items.${item.id}.titleRest`)}</span>
                      </>
                    )}
                  </h2>
                ) : (
                  <h3 className={st.insurance_why__card_title}>{t(`items.${item.id}.title`)}</h3>
                )}

                {hasBody && (
                  <p className={isIntro ? st.insurance_why__desc : st.insurance_why__card_desc}>
                    {t(`items.${item.id}.body`)}
                  </p>
                )}

                {item.video && (
                  <video
                    className={st.insurance_why__video}
                    src={item.video}
                    autoPlay
                    playsInline
                    muted
                    loop
                    preload="metadata"
                    controls={false}
                    aria-hidden
                  />
                )}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};
