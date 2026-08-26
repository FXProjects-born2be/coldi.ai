'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import { useLocale, useTranslations } from 'next-intl';

import { cn } from '@/shared/lib/helpers';

import st from './Footer.module.scss';

import { usePathname, useRouter } from '@/i18n/navigation';

type LocaleOption = {
  value: 'en' | 'uk';
  flag: string;
};

const LOCALES: LocaleOption[] = [
  {
    value: 'en',
    flag: '/images/footer/flag-en.svg',
  },
  {
    value: 'uk',
    flag: '/images/footer/flag-uk.svg',
  },
];

const Chevron = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M4 6L8 10L12 6"
      stroke="#171717"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const FooterLanguageSelect = () => {
  const t = useTranslations('Footer');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selected = LOCALES.find((item) => item.value === locale) ?? LOCALES[0];

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!selectRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const selectLocale = (value: LocaleOption['value']) => {
    const query = searchParams.toString();
    const href = query ? `${pathname}?${query}` : pathname;
    router.replace(href, { locale: value });
    setIsOpen(false);
  };

  return (
    <div className={st.footer__lang} ref={selectRef}>
      <button
        type="button"
        className={cn(st.footer__lang_trigger, isOpen && st.open)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={t('selectLanguage')}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className={st.footer__lang_icon}>
          <Image
            src="/images/footer/language.svg"
            alt={t('languageIconAlt')}
            width={24}
            height={24}
          />
        </span>
        <span className={st.footer__lang_label}>{t(`locales.${selected.value}`)}</span>
        <span className={cn(st.footer__lang_chevron, isOpen && st.open)} aria-hidden>
          <Chevron />
        </span>
      </button>

      {isOpen ? (
        <ul className={st.footer__lang_list} role="listbox">
          {LOCALES.map((item) => (
            <li key={item.value} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={locale === item.value}
                className={cn(st.footer__lang_option, locale === item.value && st.active)}
                onClick={() => selectLocale(item.value)}
              >
                <span className={st.footer__lang_flag}>
                  <Image src={item.flag} alt={t(`locales.${item.value}`)} width={20} height={20} />
                </span>
                <span>{t(`locales.${item.value}`)}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
