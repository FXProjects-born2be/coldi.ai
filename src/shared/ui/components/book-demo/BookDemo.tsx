'use client';

import { useState } from 'react';
import Image from 'next/image';

import { Content, Description, Overlay, Portal, Root, Title } from '@radix-ui/react-dialog';
import { useTranslations } from 'next-intl';

import { cn } from '@/shared/lib/helpers';
import { CalendlyInline } from '@/shared/ui/components/calendly-inline';
import { CloseIcon } from '@/shared/ui/icons/outline/close';

import st from './BookDemo.module.scss';

import { Link } from '@/i18n/navigation';

const CALENDLY_URL =
  'https://calendly.com/coldi/30min?hide_event_type_details=1&hide_gdpr_banner=1';

const INFO_ITEMS = [
  {
    id: 'conversation',
    icon: '/icons/modal-form/ph-chats-teardrop.svg',
  },
  {
    id: 'cases',
    icon: '/icons/modal-form/streamline-ultimate_business-contract-give.svg',
  },
  {
    id: 'match',
    icon: '/icons/modal-form/codicon_voice-mode-compact.svg',
  },
] as const;

export const BookDemo = ({ className }: { className?: string }) => {
  const t = useTranslations('BookDemo');
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="text-center">
        <button
          type="button"
          className={cn('btn d-inline-block', className ?? 'btn-primary')}
          onClick={() => setOpen(true)}
        >
          {t('cta')}
        </button>
      </div>

      <Root open={open} onOpenChange={setOpen}>
        <Portal>
          <Overlay className={st.book_demo__overlay} />
          <Content
            className={st.book_demo__content}
            onPointerDownOutside={(event) => event.preventDefault()}
            onFocusOutside={(event) => event.preventDefault()}
          >
            <button
              type="button"
              className={st.book_demo__close}
              onClick={() => setOpen(false)}
              aria-label={t('closeAria')}
            >
              <CloseIcon />
            </button>

            <div className={st.book_demo__row}>
              <div>
                <Link href="/" className={st.book_demo__logo}>
                  <Image src="/full-logo.svg" alt="Coldi" width={93} height={32} loading="lazy" />
                </Link>

                <Title className={st.book_demo__title}>
                  {t('title')}
                  <span> {t('titleHighlight')}</span>
                </Title>

                <Description className={st.book_demo__subtitle}>
                  {t('subtitle')}
                  <br />
                  {t('subtitleSecond')}
                </Description>
              </div>

              <div>
                <p className={st.book_demo__info_title}>{t('whatToExpect')}</p>

                <div className={st.book_demo__info_list}>
                  {INFO_ITEMS.map((item) => (
                    <div key={item.id} className={st.book_demo__info_item}>
                      <div className={st.book_demo__info_item_icon}>
                        <Image src={item.icon} alt="" width={24} height={24} loading="lazy" />
                      </div>
                      <p className={st.book_demo__info_item_title}>{t(`infoItems.${item.id}`)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className={st.book_demo__form_wrapper}>
                <CalendlyInline
                  url={CALENDLY_URL}
                  className={st.book_demo__calendar_widget}
                  active={open}
                />
              </div>
            </div>
          </Content>
        </Portal>
      </Root>
    </>
  );
};
