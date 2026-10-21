import Image from 'next/image';

import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/helpers';

import st from './MeetTeamGlance.module.scss';

const INTEGRATION_LOGOS = [
  { src: '/images/home/tools/logo-twilio.svg', width: 74, height: 23 },
  { src: '/images/home/tools/logo-hubspot.svg', width: 76, height: 22 },
  { src: '/images/home/tools/logo-housecall-pro.svg', width: 144, height: 22 },
  { src: '/images/home/tools/logo-n8n.svg', width: 81, height: 22 },
  { src: '/images/home/tools/logo-calendly.svg', width: 91, height: 22 },
  { src: '/images/home/tools/logo-slack.svg', width: 74, height: 22 },
  { src: '/images/home/tools/logo-zapier.svg', width: 81, height: 22 },
  { src: '/images/home/tools/logo-google-sheets.svg', width: 128, height: 22 },
] as const;

const CARDS = [
  {
    id: 'campaignBrain',
    image: { src: '/images/meet-the-team/glance-one.png', width: 368, height: 400 },
  },
  {
    id: 'industries',
    image: { src: '/images/meet-the-team/glance-two.png', width: 372, height: 170 },
  },
  { id: 'founded', value: true },
  { id: 'languages', value: true },
  {
    id: 'headquarters',
    value: true,
    bg: { src: '/images/meet-the-team/glance-three.svg', width: 420, height: 230 },
  },
  { id: 'integrations', row: true },
] as const;

export default async function MeetTeamGlance() {
  const t = await getTranslations('MeetTeamGlance');
  const richTags = {
    brand: (chunks: ReactNode) => <span>{chunks}</span>,
    strong: (chunks: ReactNode) => <span>{chunks}</span>,
  };

  return (
    <section className={st.meet_team_glance}>
      <div className="container">
        <h2 className={st.meet_team_glance__title}>{t.rich('title', richTags)}</h2>

        <div className={st.meet_team_glance__row}>
          {CARDS.map((card) => (
            <div
              key={card.id}
              className={cn(
                st.meet_team_glance__item,
                'row' in card && card.row && st.meet_team_glance__itemRow
              )}
            >
              {'image' in card && card.image && (
                <Image
                  src={card.image.src}
                  alt={t('imageAlt')}
                  width={card.image.width}
                  height={card.image.height}
                />
              )}

              {'value' in card && card.value ? (
                <>
                  <p className={st.meet_team_glance__label}>{t(`${card.id}.label`)}</p>
                  <p className={st.meet_team_glance__subtitle}>
                    <span>{t(`${card.id}.value`)}</span>
                  </p>
                </>
              ) : (
                <div>
                  <p className={st.meet_team_glance__label}>{t(`${card.id}.label`)}</p>
                  <p className={st.meet_team_glance__description}>
                    {t.rich(`${card.id}.description`, richTags)}
                  </p>
                </div>
              )}

              {'bg' in card && card.bg && (
                <Image
                  src={card.bg.src}
                  alt={t('imageAlt')}
                  width={card.bg.width}
                  height={card.bg.height}
                  className={st.meet_team_glance__bg}
                />
              )}

              {card.id === 'integrations' && (
                <div className={st.meet_team_glance__logos}>
                  {INTEGRATION_LOGOS.map((logo) => (
                    <div key={logo.src} className={st.meet_team_glance__logo}>
                      <Image
                        src={logo.src}
                        alt={t('imageAlt')}
                        width={logo.width}
                        height={logo.height}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
