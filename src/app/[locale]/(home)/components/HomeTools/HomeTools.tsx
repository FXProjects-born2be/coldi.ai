import Image from 'next/image';

import { getTranslations } from 'next-intl/server';

import { cn } from '@/shared/lib/helpers';

import st from './HomeTools.module.scss';

type Tool = {
  image: string;
  alt: string;
};

const card: Tool[] = [
  { image: '/images/home/tools/logo-twilio.svg', alt: 'Twilio' },
  { image: '/images/home/tools/logo-telnyx.svg', alt: 'Telnyx' },
  { image: '/images/home/tools/logo-zadarma.svg', alt: 'Zadarma' },
  { image: '/images/home/tools/logo-didlogic.svg', alt: 'DIDLogic' },
  { image: '/images/home/tools/logo-did-global.svg', alt: 'DID Global' },
  { image: '/images/home/tools/logo-voiso.svg', alt: 'Voiso' },
  { image: '/images/home/tools/logo-tel-tel.svg', alt: 'Tel.Tel' },
  { image: '/images/home/tools/logo-slack.svg', alt: 'Slack' },
  { image: '/images/home/tools/logo-zapier.svg', alt: 'Zapier' },
  { image: '/images/home/tools/logo-sendgrid.svg', alt: 'SendGrid' },
  { image: '/images/home/tools/logo-calleague.svg', alt: 'Calleague' },
  { image: '/images/home/tools/logo-hubspot.svg', alt: 'HubSpot' },
  { image: '/images/home/tools/logo-gitHub.svg', alt: 'GitHub' },
  { image: '/images/home/tools/logo-calendly.svg', alt: 'Calendly' },
  { image: '/images/home/tools/logo-housecall-pro.svg', alt: 'Housecall Pro' },
  { image: '/images/home/tools/logo-google-calendar.svg', alt: 'Google Calendar' },
  { image: '/images/home/tools/logo-grafana-labs.svg', alt: 'Grafana Labs' },
  { image: '/images/home/tools/logo-google-sheets.svg', alt: 'Google Sheets' },
  { image: '/images/home/tools/logo-bitly.svg', alt: 'Bitly' },
  { image: '/images/home/tools/logo-zoho.svg', alt: 'Zoho' },
  { image: '/images/home/tools/logo-n8n.svg', alt: 'n8n' },
  { image: '/images/home/tools/logo-phone.svg', alt: 'Phone' },
  { image: '/images/home/tools/logo-hiya.svg', alt: 'Hiya' },
  { image: '/images/home/tools/logo-jira.svg', alt: 'Jira' },
  { image: '/images/home/tools/logo-commpeack.svg', alt: 'CommPeak' },
];

const rowOne = card.slice(0, 12);
const rowTwo = card.slice(12);

const ToolsRow = ({ items, reverse }: { items: Tool[]; reverse?: boolean }) => (
  <div className={cn(st.home_tools__track, reverse && st.reverse)}>
    {[...items, ...items].map((item, index) => (
      <div key={`${item.alt}-${index}`} className={st.card} aria-hidden={index >= items.length}>
        <Image
          src={item.image}
          alt={index >= items.length ? '' : item.alt}
          width={148}
          height={40}
          loading="lazy"
          style={{ width: 'auto', height: 40 }}
        />
      </div>
    ))}
  </div>
);

export const HomeTools = async () => {
  const t = await getTranslations('HomeTools');

  return (
    <section className={st.home_tools}>
      <div className={cn('container', st.home_tools__container)}>
        <h2 className={st.home_tools__title}>{t('title')}</h2>
        <div className={st.home_tools__images}>
          <ToolsRow items={rowOne} />
          <ToolsRow items={rowTwo} reverse />
        </div>
      </div>
    </section>
  );
};
