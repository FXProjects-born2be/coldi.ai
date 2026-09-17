import Image from 'next/image';

import { getTranslations } from 'next-intl/server';

import { cn } from '@/shared/lib/helpers';
import { CalendlyInline } from '@/shared/ui/components/calendly-inline';

import st from './Hero.module.scss';

const CALENDLY_URL =
  'https://calendly.com/coldi/30min?hide_event_type_details=1&hide_gdpr_banner=1';

type HeroProps = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  industry?: string;
};

const pickParam = (value?: string | string[]) => (Array.isArray(value) ? value[0] : value)?.trim();

const formatPhone = (value?: string) => {
  if (!value) return undefined;
  return value.startsWith('+') ? value : `+${value}`;
};

const calendlyUrlWithPrefill = ({ firstName, lastName, email, phone, industry }: HeroProps) => {
  const url = new URL(CALENDLY_URL);
  const first = pickParam(firstName);
  const last = pickParam(lastName);
  const mail = pickParam(email);
  const tel = formatPhone(pickParam(phone));
  const sector = pickParam(industry);
  const name = [first, last].filter(Boolean).join(' ');

  if (first) url.searchParams.set('first_name', first);
  if (last) url.searchParams.set('last_name', last);
  if (mail) url.searchParams.set('email', mail);
  if (name) url.searchParams.set('name', name);
  // Custom questions on this Calendly event:
  // a1 Phone, a2 Monthly call volume, a3 Company name, a4 Industry.
  if (tel) url.searchParams.set('a1', tel);
  if (sector) url.searchParams.set('a4', sector);

  return {
    url: url.toString().replace(/\+/g, '%20'),
    prefill: {
      ...(first ? { firstName: first } : {}),
      ...(last ? { lastName: last } : {}),
      ...(name ? { name } : {}),
      ...(mail ? { email: mail } : {}),
      customAnswers: {
        ...(tel ? { a1: tel } : {}),
        ...(sector ? { a4: sector } : {}),
      },
    },
  };
};

export const Hero = async ({ firstName, lastName, email, phone, industry }: HeroProps) => {
  const t = await getTranslations('CalendarHero');
  const { url, prefill } = calendlyUrlWithPrefill({ firstName, lastName, email, phone, industry });

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
            <Image
              className={st.calendar_home__bg}
              src="/images/calendar/calendar-bg.png"
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <CalendlyInline url={url} prefill={prefill} className={st.calendar_home__widget} />
          </div>
        </div>
      </div>
    </section>
  );
};
