import Image from 'next/image';

import { getTranslations } from 'next-intl/server';

import st from './MeetTeamInfoQuote.module.scss';

export const MeetTeamInfoQuote = async () => {
  const t = await getTranslations('MeetTeamInfoQuote');

  return (
    <section className={st.meet_team_info_quote}>
      <div className="container">
        <div className={st.meet_team_info_quote__content}>
          <Image
            src="/images/meet-the-team/quote-open.svg"
            alt=""
            width={48}
            height={48}
            aria-hidden="true"
            className={st.meet_team_info_quote__quote_open}
          />

          <div className={st.meet_team_info_quote__badge}>{t('badge')}</div>

          <h2 className={st.meet_team_info_quote__title}>
            {t.rich('title', {
              muted: (chunks) => <span className={st.meet_team_info_quote__muted}>{chunks}</span>,
            })}
          </h2>

          <Image
            src="/images/meet-the-team/quote-close.svg"
            alt=""
            width={48}
            height={48}
            aria-hidden="true"
            className={st.meet_team_info_quote__quote_close}
          />
        </div>
      </div>
    </section>
  );
};
