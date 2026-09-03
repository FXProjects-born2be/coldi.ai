import Image from 'next/image';

import { getTranslations } from 'next-intl/server';

import st from './MeetTeamInfoDrive.module.scss';

const items = [
  {
    id: 'intro',
    icon: null,
    video: '/videos/meet-the-team-drive.mp4',
  },
  {
    id: 'ownership',
    icon: '/icons/carbon_development.svg',
    video: null,
  },
  {
    id: 'quality',
    icon: '/icons/carbon_rule-data-quality.svg',
    video: null,
  },
  {
    id: 'integration',
    icon: '/icons/carbon_integration.svg',
    video: null,
  },
  {
    id: 'optimization',
    icon: '/icons/mingcute_performance-line.svg',
    video: null,
  },
  {
    id: 'reliability',
    icon: '/icons/carbon_ai-agent-detached.svg',
    video: null,
  },
] as const;

export const MeetTeamInfoDrive = async () => {
  const t = await getTranslations('MeetTeamInfoDrive');

  return (
    <div className={st.meet_team_info_drive}>
      <div className="container">
        <div className={st.meet_team_info_drive__list}>
          {items.map((item) => {
            const isIntro = item.icon === null;

            return (
              <article key={item.id} className={st.meet_team_info_drive__card}>
                {item.icon && (
                  <div className={st.meet_team_info_drive__icon}>
                    <Image src={item.icon} alt="" width={24} height={24} aria-hidden="true" />
                  </div>
                )}

                {isIntro ? (
                  <h2 className={st.meet_team_info_drive__title}>
                    <span>{t(`items.${item.id}.title`)}</span>
                    {t.has(`items.${item.id}.titleRest`) && t(`items.${item.id}.titleRest`)}
                  </h2>
                ) : (
                  <h3 className={st.meet_team_info_drive__card_title}>
                    {t(`items.${item.id}.title`)}
                  </h3>
                )}
                <p
                  className={
                    isIntro ? st.meet_team_info_drive__desc : st.meet_team_info_drive__card_desc
                  }
                >
                  {t(`items.${item.id}.body`)}
                </p>

                {item.video && (
                  <video
                    className={st.meet_team_info_drive__video}
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
