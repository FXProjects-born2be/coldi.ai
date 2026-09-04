import Image from 'next/image';

import { getTranslations } from 'next-intl/server';

import st from './InsuranceWhy.module.scss';

type InsuranceWhyItem = {
  id: string;
  title: string;
  titleAccent?: string;
  body?: string;
  icon: string | null;
  video?: string | null;
};

type InsuranceWhyProps = {
  items?: InsuranceWhyItem[];
};

const DEFAULT_ITEMS = [
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

export const InsuranceWhy = async ({ items }: InsuranceWhyProps) => {
  const cards = items ?? (await getDefaultItems());

  return (
    <div className={st.insurance_why}>
      <div className="container">
        <div className={st.insurance_why__list}>
          {cards.map((item) => {
            const isIntro = item.icon === null;

            return (
              <article key={item.id} className={st.insurance_why__card}>
                {item.icon && (
                  <div className={st.insurance_why__icon}>
                    <Image src={item.icon} alt="" width={24} height={24} aria-hidden="true" />
                  </div>
                )}

                {isIntro ? (
                  <h2 className={st.insurance_why__title}>
                    {item.title}
                    {item.titleAccent && (
                      <>
                        <br />
                        <span>{item.titleAccent}</span>
                      </>
                    )}
                  </h2>
                ) : (
                  <h3 className={st.insurance_why__card_title}>{item.title}</h3>
                )}

                {item.body && (
                  <p className={isIntro ? st.insurance_why__desc : st.insurance_why__card_desc}>
                    {item.body}
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

const getDefaultItems = async (): Promise<InsuranceWhyItem[]> => {
  const t = await getTranslations('InsuranceWhy');

  return DEFAULT_ITEMS.map((item) => ({
    id: item.id,
    icon: item.icon,
    video: item.video,
    title: t(`items.${item.id}.title`),
    titleAccent: t.has(`items.${item.id}.titleRest`) ? t(`items.${item.id}.titleRest`) : undefined,
    body: t.has(`items.${item.id}.body`) ? t(`items.${item.id}.body`) : undefined,
  }));
};
