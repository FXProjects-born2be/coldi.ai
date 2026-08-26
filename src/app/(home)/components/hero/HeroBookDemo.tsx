'use client';

import { useState } from 'react';
import Image from 'next/image';

import { Content, Description, Overlay, Portal, Root, Title } from '@radix-ui/react-dialog';
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

const OptionIcon = ({ src }: { src: string }) => <Image src={src} alt="" width={20} height={20} />;

const INDUSTRIES = [
  {
    label: 'Trading',
    value: 'Trading',
    icon: <OptionIcon src="/icons/modal-form/trading.svg" />,
  },
  {
    label: 'Insurance',
    value: 'Insurance',
    icon: <OptionIcon src="/icons/modal-form/insurance.svg" />,
  },
  {
    label: 'Lending',
    value: 'Lending',
    icon: <OptionIcon src="/icons/modal-form/lending.svg" />,
  },
  {
    label: 'Other',
    value: 'Other',
    icon: <OptionIcon src="/icons/modal-form/other.svg" />,
  },
  {
    label: 'Debt Collection',
    value: 'Debt Collection',
    icon: <OptionIcon src="/icons/modal-form/debt-collection.svg" />,
  },
];

const USE_CASES = [
  {
    label: 'Sales',
    value: 'Sales',
    icon: <OptionIcon src="/icons/modal-form/sales.svg" />,
  },
  {
    label: 'Lead Qualification',
    value: 'Lead Qualification',
    icon: <OptionIcon src="/icons/modal-form/lead-qualification.svg" />,
  },
  {
    label: 'Customer Support',
    value: 'Customer Support',
    icon: <OptionIcon src="/icons/modal-form/customer-support.svg" />,
  },
  {
    label: 'Customer Engagement',
    value: 'Customer Engagement',
    icon: <OptionIcon src="/icons/modal-form/customer-engagement.svg" />,
  },
  {
    label: 'Collections',
    value: 'Collections',
    icon: <OptionIcon src="/icons/modal-form/collections.svg" />,
  },
  {
    label: 'Other',
    value: 'Other (Please specify)',
    icon: <OptionIcon src="/icons/modal-form/other-one.svg" />,
  },
];

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

    if (!name.trim()) nextErrors.name = 'Please introduce yourself';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "We can't send you the call results without your email address.";
    }
    if (!phone || !isPhoneValid(`+${phone}`)) nextErrors.phone = 'invalid';
    if (!company.trim()) nextErrors.company = 'Please enter your company.';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setStep(2);
  };

  const submit = async () => {
    const nextErrors: Record<string, string> = {};

    if (!industry) nextErrors.industry = 'Please select your industry.';
    if (!useCase) nextErrors.useCase = 'Please select what you want to use AI voice for.';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length || isSubmitting) return;

    setIsSubmitting(true);
    setErrors((current) => ({ ...current, submit: '' }));

    const useCaseLabel = USE_CASES.find((item) => item.value === useCase)?.label ?? useCase;

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
          call_scenarios: useCaseLabel,
          ...getUtmParams(),
        }),
      });

      if (!res.ok) {
        setErrors((current) => ({
          ...current,
          submit: 'Failed to send. Please try again.',
        }));
        setIsSubmitting(false);
        return;
      }

      const params = new URLSearchParams();
      if (name.trim()) params.set('firstName', name.trim());
      if (email.trim()) params.set('email', email.trim());
      const query = params.toString();
      window.location.assign(query ? `/calendar?${query}` : '/calendar');
    } catch {
      setErrors((current) => ({
        ...current,
        submit: 'Failed to send. Please try again.',
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
          Book a Demo
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
              aria-label="Close dialog"
            >
              <CloseIcon />
            </button>

            <div className={st.hero_book_demo__top}>
              <Title className={st.hero_book_demo__title}>
                Let’s tailor the demo to your business
              </Title>

              <Description className={st.hero_book_demo__subtitle}>
                Tell us a little about your needs so we can focus on what matters most to you.
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
                      placeholder="Name*"
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
                      placeholder="Work email*"
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
                      placeholder="Phone number*"
                      inputClass={cn(st.hero_book_demo__phone_input, errors.phone && st.error)}
                      buttonClass={st.hero_book_demo__phone_button}
                      dropdownClass={st.hero_book_demo__phone_dropdown}
                      enableSearch
                      searchPlaceholder="Search country..."
                      autoFormat
                    />
                  </div>
                  <div>
                    <TextField
                      name="company"
                      placeholder="Company*"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      intent={errors.company ? 'danger' : 'default'}
                      className={st.hero_book_demo__field}
                    />
                    {errors.company ? <ErrorMessage>{errors.company}</ErrorMessage> : null}
                  </div>
                </div>

                <button type="button" onClick={goNext} className="btn btn-primary w-max">
                  Next
                </button>
              </div>
            ) : (
              <div className={st.hero_book_demo__step}>
                <div className={st.hero_book_demo__selects}>
                  <div>
                    <Select
                      items={INDUSTRIES}
                      value={industry}
                      onChange={setIndustry}
                      placeholder="Industry*"
                      showOtherInput
                      otherPlaceholder="Please specify your industry"
                    />
                    {errors.industry ? <ErrorMessage>{errors.industry}</ErrorMessage> : null}
                  </div>
                  <div>
                    <Select
                      items={USE_CASES}
                      value={useCase}
                      onChange={setUseCase}
                      placeholder="What are you looking to use AI voice for?*"
                      showOtherInput
                      otherPlaceholder="Please specify"
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
                    {isSubmitting ? 'Sending...' : 'Call Me'}
                  </button>
                  {errors.submit ? <ErrorMessage>{errors.submit}</ErrorMessage> : null}
                  <p className={st.hero_book_demo__hint}>
                    Help us focus the demo on what matters most to your business.
                  </p>
                </div>
              </div>
            )}
          </Content>
        </Portal>
      </Root>
    </>
  );
};
