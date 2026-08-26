'use client';

import { useState } from 'react';
import Image from 'next/image';

import { Content, Description, Overlay, Portal, Root, Title } from '@radix-ui/react-dialog';
import { useLocale, useTranslations } from 'next-intl';
import PhoneInput from 'react-phone-input-2';

import { cn } from '@/shared/lib/helpers';
import { isPhoneValid } from '@/shared/lib/validation';
import { ErrorMessage } from '@/shared/ui/components/error-message';
import { CallMeIcon } from '@/shared/ui/icons/fill/call-me';
import { CloseIcon } from '@/shared/ui/icons/outline/close';
import { Select } from '@/shared/ui/kit/select';
import { TextField } from '@/shared/ui/kit/text-field';

import st from './HeroBookDemo.module.scss';

import 'react-phone-input-2/lib/style.css';

import { getPathname } from '@/i18n/navigation';

const OptionIcon = ({ src }: { src: string }) => <Image src={src} alt="" width={20} height={20} />;

const INDUSTRIES = [
  {
    id: 'trading',
    value: 'Trading',
    icon: <OptionIcon src="/icons/modal-form/trading.svg" />,
  },
  {
    id: 'insurance',
    value: 'Insurance',
    icon: <OptionIcon src="/icons/modal-form/insurance.svg" />,
  },
  {
    id: 'lending',
    value: 'Lending',
    icon: <OptionIcon src="/icons/modal-form/lending.svg" />,
  },
  {
    id: 'other',
    value: 'Other',
    icon: <OptionIcon src="/icons/modal-form/other.svg" />,
  },
  {
    id: 'debtCollection',
    value: 'Debt Collection',
    icon: <OptionIcon src="/icons/modal-form/debt-collection.svg" />,
  },
] as const;

const USE_CASES = [
  {
    id: 'sales',
    value: 'Sales',
    icon: <OptionIcon src="/icons/modal-form/sales.svg" />,
  },
  {
    id: 'leadQualification',
    value: 'Lead Qualification',
    icon: <OptionIcon src="/icons/modal-form/lead-qualification.svg" />,
  },
  {
    id: 'customerSupport',
    value: 'Customer Support',
    icon: <OptionIcon src="/icons/modal-form/customer-support.svg" />,
  },
  {
    id: 'customerEngagement',
    value: 'Customer Engagement',
    icon: <OptionIcon src="/icons/modal-form/customer-engagement.svg" />,
  },
  {
    id: 'collections',
    value: 'Collections',
    icon: <OptionIcon src="/icons/modal-form/collections.svg" />,
  },
  {
    id: 'other',
    value: 'Other (Please specify)',
    icon: <OptionIcon src="/icons/modal-form/other-one.svg" />,
  },
] as const;

type Step = 1 | 2;

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
  const [step, setStep] = useState<Step>(1);
  const [useCase, setUseCase] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [industry, setIndustry] = useState('');
  const [company, setCompany] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const industries = INDUSTRIES.map((item) => ({
    ...item,
    label: t(`bookDemo.industries.${item.id}`),
  }));

  const useCases = USE_CASES.map((item) => ({
    ...item,
    label: t(`bookDemo.useCases.${item.id}`),
  }));

  const reset = () => {
    setStep(1);
    setUseCase('');
    setPhone('');
    setName('');
    setEmail('');
    setIndustry('');
    setCompany('');
    setErrors({});
    setIsSubmitting(false);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) reset();
  };

  const goNext = () => {
    const nextErrors: Record<string, string> = {};

    if (!name.trim()) nextErrors.name = t('bookDemo.errors.name');
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = t('bookDemo.errors.email');
    }
    if (!phone || !isPhoneValid(`+${phone}`)) nextErrors.phone = 'invalid';
    if (!company.trim()) nextErrors.company = t('bookDemo.errors.company');

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setStep(2);
  };

  const submit = async () => {
    const nextErrors: Record<string, string> = {};

    if (!industry) nextErrors.industry = t('bookDemo.errors.industry');
    if (!useCase) nextErrors.useCase = t('bookDemo.errors.useCase');

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length || isSubmitting) return;

    setIsSubmitting(true);
    setErrors((current) => ({ ...current, submit: '' }));

    const useCaseValue = USE_CASES.find((item) => item.value === useCase)?.value ?? useCase;

    try {
      const res = await fetch('/api/leads-book-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name: name.trim(),
          surname: '',
          phone: phone.startsWith('+') ? phone : `+${phone}`,
          email: email.trim(),
          sector: industry,
          company: company.trim(),
          call_scenarios: useCaseValue,
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
          <Content className={st.hero_book_demo__content}>
            <button
              type="button"
              className={st.hero_book_demo__close}
              onClick={() => handleOpenChange(false)}
              aria-label={t('bookDemo.closeAria')}
            >
              <CloseIcon />
            </button>

            <div className={st.hero_book_demo__top}>
              <Title className={st.hero_book_demo__title}>{t('bookDemo.title')}</Title>

              <Description className={st.hero_book_demo__subtitle}>
                {t('bookDemo.subtitle')}
              </Description>

              <div className={st.hero_book_demo__progress} aria-hidden>
                <span className={cn(st.hero_book_demo__progress_bar, step >= 1 && st.active)} />
                <span className={cn(st.hero_book_demo__progress_bar, step === 2 && st.active)} />
              </div>
            </div>

            {step === 1 ? (
              <div className={st.hero_book_demo__step}>
                <div className={st.hero_book_demo__fields}>
                  <div>
                    <TextField
                      name="name"
                      placeholder={t('bookDemo.name')}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      intent={errors.name ? 'danger' : 'default'}
                      className={st.hero_book_demo__field}
                    />
                    {errors.name ? <ErrorMessage>{errors.name}</ErrorMessage> : null}
                  </div>
                  <div>
                    <TextField
                      name="email"
                      placeholder={t('bookDemo.email')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      intent={errors.email ? 'danger' : 'default'}
                      className={st.hero_book_demo__field}
                    />
                    {errors.email ? <ErrorMessage>{errors.email}</ErrorMessage> : null}
                  </div>
                  <div className={st.hero_book_demo__phone}>
                    <PhoneInput
                      country="us"
                      value={phone}
                      onChange={(value) => {
                        setPhone(value);
                        setErrors((current) => ({ ...current, phone: '' }));
                      }}
                      placeholder={t('bookDemo.phone')}
                      inputClass={cn(st.hero_book_demo__phone_input, errors.phone && st.error)}
                      buttonClass={st.hero_book_demo__phone_button}
                      dropdownClass={st.hero_book_demo__phone_dropdown}
                      enableSearch
                      searchPlaceholder={t('bookDemo.searchCountry')}
                      autoFormat
                    />
                  </div>
                  <div>
                    <TextField
                      name="company"
                      placeholder={t('bookDemo.company')}
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      intent={errors.company ? 'danger' : 'default'}
                      className={st.hero_book_demo__field}
                    />
                    {errors.company ? <ErrorMessage>{errors.company}</ErrorMessage> : null}
                  </div>
                </div>

                <button type="button" onClick={goNext} className="btn btn-primary w-max">
                  {t('bookDemo.next')}
                </button>
              </div>
            ) : (
              <div className={st.hero_book_demo__step}>
                <div className={st.hero_book_demo__selects}>
                  <div>
                    <Select
                      items={industries}
                      value={industry}
                      onChange={setIndustry}
                      placeholder={t('bookDemo.industry')}
                      showOtherInput
                      otherPlaceholder={t('bookDemo.industryOther')}
                    />
                    {errors.industry ? <ErrorMessage>{errors.industry}</ErrorMessage> : null}
                  </div>
                  <div>
                    <Select
                      items={useCases}
                      value={useCase}
                      onChange={setUseCase}
                      placeholder={t('bookDemo.useCase')}
                      showOtherInput
                      otherPlaceholder={t('bookDemo.useCaseOther')}
                    />
                    {errors.useCase ? <ErrorMessage>{errors.useCase}</ErrorMessage> : null}
                  </div>
                </div>

                <div className={st.hero_book_demo__submit}>
                  <button
                    type="button"
                    onClick={() => void submit()}
                    className="btn btn-primary w-max"
                    disabled={isSubmitting}
                  >
                    <CallMeIcon />
                    {isSubmitting ? t('bookDemo.sending') : t('bookDemo.callMe')}
                  </button>
                  {errors.submit ? <ErrorMessage>{errors.submit}</ErrorMessage> : null}
                  <p className={st.hero_book_demo__hint}>{t('bookDemo.hint')}</p>
                </div>
              </div>
            )}
          </Content>
        </Portal>
      </Root>
    </>
  );
};
