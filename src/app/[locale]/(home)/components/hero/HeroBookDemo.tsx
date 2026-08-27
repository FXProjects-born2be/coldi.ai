'use client';

import { type ComponentType, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Script from 'next/script';

import { Content, Description, Overlay, Portal, Root, Title } from '@radix-ui/react-dialog';
import { useLocale, useTranslations } from 'next-intl';

import { cn } from '@/shared/lib/helpers';
import { ArrowBottom } from '@/shared/ui/icons/fill/arrow-bottom';
import { IconHugeIconsAddMoneyCircle } from '@/shared/ui/icons/IconHugeIconsAddMoneyCircle';
import { IconHugeIconsAiBrowser } from '@/shared/ui/icons/IconHugeIconsAiBrowser';
import { IconHugeIconsAiMagic } from '@/shared/ui/icons/IconHugeIconsAiMagic';
import { IconHugeIconsAiSecurity } from '@/shared/ui/icons/IconHugeIconsAiSecurity';
import { IconHugeIconsAiSheets } from '@/shared/ui/icons/IconHugeIconsAiSheets';
import { CloseIcon } from '@/shared/ui/icons/outline/close';
import { TextField } from '@/shared/ui/kit/text-field';

import st from './HeroBookDemo.module.scss';

import { getPathname, Link } from '@/i18n/navigation';

const CALENDLY_URL = 'https://calendly.com/coldi/30min';
const CALENDLY_SCRIPT = 'https://assets.calendly.com/assets/external/widget.js';

type CalendlyWidget = {
  initInlineWidget: (options: {
    url: string;
    parentElement: HTMLElement;
    prefill?: { name?: string; email?: string };
  }) => void;
};

const getCalendly = () => (window as Window & { Calendly?: CalendlyWidget }).Calendly;

const INDUSTRIES = [
  {
    id: 'insurance',
    value: 'Insurance',
    Icon: IconHugeIconsAiSecurity,
  },
  {
    id: 'trading',
    value: 'Trading Platforms & Brokers',
    Icon: IconHugeIconsAiSheets,
  },
  {
    id: 'debtCollection',
    value: 'Debt Collection',
    Icon: IconHugeIconsAiBrowser,
  },
  {
    id: 'emisPayments',
    value: 'EMIs & Payments',
    Icon: IconHugeIconsAddMoneyCircle,
  },
  {
    id: 'other',
    value: 'Other',
    Icon: IconHugeIconsAiMagic,
  },
] as const;

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

const OTHER_VALUE = 'Other';

type IndustryOption = {
  id: string;
  value: string;
  label: string;
  Icon: ComponentType;
};

const IndustrySelect = ({
  items,
  value,
  onChange,
  placeholder,
  otherPlaceholder,
  hasError,
  onOpenChange,
}: {
  items: IndustryOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  otherPlaceholder: string;
  hasError?: boolean;
  onOpenChange?: (open: boolean) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherText, setOtherText] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const otherInputRef = useRef<HTMLInputElement>(null);

  const isKnownValue = items.some((item) => item.value === value);
  const isCustomOther = !!value && !isKnownValue;
  const displayValue = isCustomOther
    ? value
    : (items.find((item) => item.value === value)?.label ?? (value || placeholder));
  const selectedItem = isCustomOther
    ? items.find((item) => item.value === OTHER_VALUE)
    : items.find((item) => item.value === value);
  const SelectedIcon = selectedItem?.Icon;

  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        if (showOtherInput && otherText.trim()) onChange(otherText.trim());
        setShowOtherInput(false);
        setIsOpen(false);
      }
    };

    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, showOtherInput, otherText, onChange]);

  useEffect(() => {
    if (showOtherInput) otherInputRef.current?.focus();
  }, [showOtherInput]);

  const handleOptionClick = (itemValue: string) => {
    if (itemValue === OTHER_VALUE) {
      setShowOtherInput(true);
      setOtherText(isCustomOther ? value : '');
      return;
    }

    onChange(itemValue);
    setShowOtherInput(false);
    setOtherText('');
    setIsOpen(false);
  };

  const commitOther = () => {
    onChange(otherText.trim() || OTHER_VALUE);
    setShowOtherInput(false);
    setIsOpen(false);
  };

  return (
    <div className={st.hero_book_demo__select} ref={containerRef}>
      <button
        type="button"
        className={cn(
          st.hero_book_demo__select_trigger,
          isOpen && st.hero_book_demo__select_trigger_open,
          hasError && st.hero_book_demo__select_trigger_error
        )}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span
          className={cn(
            st.hero_book_demo__select_value,
            !value && st.hero_book_demo__select_placeholder
          )}
        >
          {SelectedIcon ? <SelectedIcon /> : null}
          {displayValue}
        </span>
        <ArrowBottom />
      </button>

      {isOpen ? (
        <div className={st.hero_book_demo__select_dropdown} role="listbox">
          {items.map((item) => {
            const isActive =
              item.value === OTHER_VALUE
                ? isCustomOther || value === OTHER_VALUE
                : value === item.value;

            const OptionIcon = item.Icon;

            return (
              <button
                key={item.value}
                type="button"
                role="option"
                aria-selected={isActive}
                className={cn(
                  st.hero_book_demo__select_option,
                  isActive && st.hero_book_demo__select_option_active
                )}
                onClick={() => handleOptionClick(item.value)}
              >
                <OptionIcon />
                {item.label}
              </button>
            );
          })}
          {showOtherInput ? (
            <input
              ref={otherInputRef}
              className={st.hero_book_demo__select_other}
              type="text"
              placeholder={otherPlaceholder}
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  commitOther();
                }
              }}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const;

const getUtmParams = () => {
  if (typeof window === 'undefined') return {};

  const search = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};

  UTM_KEYS.forEach((key) => {
    const value = search.get(key);
    if (value) utm[key] = value;
  });

  return utm;
};

export const HeroBookDemo = () => {
  const t = useTranslations('Hero');
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [industry, setIndustry] = useState('');
  const [company, setCompany] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shareNeeds, setShareNeeds] = useState(false);
  const [isIndustryOpen, setIsIndustryOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendlyRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [calendarBox, setCalendarBox] = useState<{ width: number; height: number } | null>(null);

  const industries = INDUSTRIES.map((item) => ({
    ...item,
    label: t(`bookDemo.industries.${item.id}`),
  }));

  const reset = () => {
    setName('');
    setEmail('');
    setIndustry('');
    setCompany('');
    setErrors({});
    setIsSubmitting(false);
    setShareNeeds(false);
    setIsIndustryOpen(false);
    setShowCalendar(false);
    setCalendarBox(null);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) reset();
  };

  const syncCalendarBox = () => {
    const rect = contentRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCalendarBox({ width: rect.width, height: rect.height });
  };

  const openCalendar = () => {
    syncCalendarBox();
    setShowCalendar(true);
  };

  useEffect(() => {
    if (!showCalendar) return;

    syncCalendarBox();
    window.addEventListener('resize', syncCalendarBox);
    return () => window.removeEventListener('resize', syncCalendarBox);
  }, [showCalendar]);

  const initCalendly = () => {
    const parent = calendlyRef.current;
    const Calendly = getCalendly();
    if (!parent || !Calendly) return false;

    parent.innerHTML = '';
    Calendly.initInlineWidget({
      url: CALENDLY_URL,
      parentElement: parent,
      prefill: {
        ...(name.trim() ? { name: name.trim() } : {}),
        ...(email.trim() ? { email: email.trim() } : {}),
      },
    });

    return true;
  };

  useEffect(() => {
    if (!showCalendar) return;

    if (initCalendly()) return;

    const id = window.setInterval(() => {
      if (initCalendly()) window.clearInterval(id);
    }, 80);

    return () => window.clearInterval(id);
  }, [showCalendar]);

  const submit = async () => {
    const nextErrors: Record<string, string> = {};

    if (!name.trim()) nextErrors.name = 'invalid';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'invalid';
    }
    if (!industry) nextErrors.industry = 'invalid';
    if (!company.trim()) nextErrors.company = 'invalid';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length || isSubmitting) return;

    setIsSubmitting(true);
    setErrors((current) => ({ ...current, submit: '' }));

    try {
      const res = await fetch('/api/leads-book-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name: name.trim(),
          surname: '',
          email: email.trim(),
          sector: industry,
          company: company.trim(),
          ...getUtmParams(),
        }),
      });

      if (!res.ok) {
        setErrors((current) => ({
          ...current,
          submit: t('bookDemo.errors.submit'),
        }));
        setIsSubmitting(false);
        return;
      }

      const params = new URLSearchParams();
      if (name.trim()) params.set('firstName', name.trim());
      if (email.trim()) params.set('email', email.trim());
      const query = params.toString();
      const calendarHref = getPathname({ href: '/calendar', locale });
      window.location.assign(query ? `${calendarHref}?${query}` : calendarHref);
    } catch {
      setErrors((current) => ({
        ...current,
        submit: t('bookDemo.errors.submit'),
      }));
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="text-center">
        <button
          type="button"
          className="btn btn-primary d-inline-block"
          onClick={() => setOpen(true)}
        >
          {t('cta')}
        </button>
      </div>

      <Root open={open} onOpenChange={handleOpenChange}>
        <Portal>
          <Overlay className={st.hero_book_demo__overlay} />
          <Content
            ref={contentRef}
            className={st.hero_book_demo__content}
            onPointerDownOutside={(event) => {
              if (showCalendar) event.preventDefault();
            }}
            onFocusOutside={(event) => {
              if (showCalendar) event.preventDefault();
            }}
          >
            <button
              type="button"
              className={st.hero_book_demo__close}
              onClick={() => handleOpenChange(false)}
              aria-label={t('bookDemo.closeAria')}
            >
              <CloseIcon />
            </button>

            <div className={st.hero_book_demo__row}>
              <div>
                <Link href="/" className={st.hero_book_demo__logo}>
                  <Image
                    className={st.header__logo}
                    src="/full-logo.svg"
                    alt="Coldi"
                    width={93}
                    height={32}
                    loading={'lazy'}
                  />
                </Link>

                <Title className={st.hero_book_demo__title}>
                  {t('bookDemo.title')}
                  <span> {t('bookDemo.titleHighlight')}</span>
                </Title>

                <Description className={st.hero_book_demo__subtitle}>
                  {t('bookDemo.subtitle')}
                  <br />
                  {t('bookDemo.subtitleSecond')}
                </Description>
              </div>

              <div>
                <p className={st.hero_book_demo__info_title}>{t('bookDemo.whatToExpect')}</p>

                <div className={st.hero_book_demo__info_list}>
                  {INFO_ITEMS.map((item) => (
                    <div key={item.id} className={st.hero_book_demo__info_item}>
                      <div className={st.hero_book_demo__info_item_icon}>
                        <Image src={item.icon} alt="" width={24} height={24} loading="lazy" />
                      </div>
                      <p className={st.hero_book_demo__info_item_title}>
                        {t(`bookDemo.infoItems.${item.id}`)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className={st.hero_book_demo__form_wrapper}>
                <div className={st.hero_book_demo__fields}>
                  <p className={st.hero_book_demo__form_title}>{t('bookDemo.formTitle')}</p>

                  <div className={st.hero_book_demo__form_item}>
                    <TextField
                      name="name"
                      placeholder={t('bookDemo.name')}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      intent={errors.name ? 'danger' : 'default'}
                      className={st.hero_book_demo__field}
                    />
                  </div>
                  <div className={st.hero_book_demo__form_item}>
                    <TextField
                      name="email"
                      placeholder={t('bookDemo.email')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      intent={errors.email ? 'danger' : 'default'}
                      className={st.hero_book_demo__field}
                    />
                  </div>
                  <div className={st.hero_book_demo__form_item}>
                    <TextField
                      name="company"
                      placeholder={t('bookDemo.company')}
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      intent={errors.company ? 'danger' : 'default'}
                      className={st.hero_book_demo__field}
                    />
                  </div>
                  <div
                    className={cn(
                      st.hero_book_demo__form_item,
                      isIndustryOpen && st.hero_book_demo__form_item_select_open
                    )}
                  >
                    <IndustrySelect
                      items={industries}
                      value={industry}
                      onChange={setIndustry}
                      placeholder={t('bookDemo.industry')}
                      otherPlaceholder={t('bookDemo.industryOther')}
                      hasError={Boolean(errors.industry)}
                      onOpenChange={setIsIndustryOpen}
                    />
                  </div>

                  <button
                    type="button"
                    className={cn('btn btn-secondary', st.hero_book_demo__form_btn_date)}
                    onClick={openCalendar}
                  >
                    {t('bookDemo.selectTimeDate')}
                  </button>

                  <div className={st.hero_book_demo__submit}>
                    <label className={st.hero_book_demo__needs}>
                      <input
                        type="checkbox"
                        className={st.hero_book_demo__needs_input}
                        checked={shareNeeds}
                        onChange={(e) => setShareNeeds(e.target.checked)}
                      />
                      <span className={st.hero_book_demo__needs_box} aria-hidden />
                      <p>{t('bookDemo.needs')}</p>
                    </label>
                    <button
                      type="button"
                      onClick={() => void submit()}
                      className={cn('btn btn-primary', st.hero_book_demo__form_btn)}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? t('bookDemo.sending') : t('bookDemo.callMe')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Content>

          {showCalendar ? (
            <div
              className={st.hero_book_demo__calendar}
              style={
                calendarBox ? { width: calendarBox.width, height: calendarBox.height } : undefined
              }
            >
              <div ref={calendlyRef} className={st.hero_book_demo__calendar_widget} />
              <button
                type="button"
                className={st.hero_book_demo__calendar_close}
                onClick={() => setShowCalendar(false)}
                aria-label={t('bookDemo.closeAria')}
              >
                <CloseIcon />
              </button>
            </div>
          ) : null}
        </Portal>
      </Root>
      {open ? <Script src={CALENDLY_SCRIPT} strategy="afterInteractive" /> : null}
    </>
  );
};
