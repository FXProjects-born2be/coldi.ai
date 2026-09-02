import Script from 'next/script';

import { getTranslations } from 'next-intl/server';

import { cn } from '@/shared/lib/helpers';

import st from './Hero.module.scss';

const CALENDLY_URL =
  'https://calendly.com/coldi/30min?hide_event_type_details=1&hide_gdpr_banner=1';
const CALENDLY_SCRIPT = 'https://assets.calendly.com/assets/external/widget.js';

export const Hero = async () => {
  const t = await getTranslations('CalendarHero');

  return (
    <section className={st.calendar_home}>
      <div className={cn('container', st.calendar_home_container)}>
        <div className={st.calendar_home__row}>
          <div>
            <h1 className={st.calendar_home__title}>
              {t('title')} <br />
              <span>{t('titleHighlight')}</span>
            </h1>

            <p className={st.calendar_home__description}>
              {t('description')} <br />
              {t('descriptionSecond')}
            </p>
          </div>

          <div className={st.calendar_home__embed}>
            <div
              className={`calendly-inline-widget ${st.calendar_home__widget}`}
              data-url={CALENDLY_URL}
            />
            <Script src={CALENDLY_SCRIPT} strategy="afterInteractive" />
          </div>
        </div>
      </div>
    </section>
  );
};
