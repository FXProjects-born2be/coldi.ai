'use client';

import { useState } from 'react';

import { Content, Description, Overlay, Portal, Root, Title } from '@radix-ui/react-dialog';
import PhoneInput from 'react-phone-input-2';

import { cn } from '@/shared/lib/helpers';
import { isPhoneValid } from '@/shared/lib/validation';
import { ErrorMessage } from '@/shared/ui/components/error-message';
import { CallMeIcon } from '@/shared/ui/icons/fill/call-me';
import { BillIcon } from '@/shared/ui/icons/outline/bill';
import { ChatIcon } from '@/shared/ui/icons/outline/chat';
import { ClipboardIcon } from '@/shared/ui/icons/outline/clipboard';
import { CloseIcon } from '@/shared/ui/icons/outline/close';
import { HeadsetIcon } from '@/shared/ui/icons/outline/headset';
import { PhoneIcon } from '@/shared/ui/icons/outline/phone';
import { SurveyIcon } from '@/shared/ui/icons/outline/survey';
import { Select } from '@/shared/ui/kit/select';
import { TextField } from '@/shared/ui/kit/text-field';

import st from './HeroBookDemo.module.scss';

import 'react-phone-input-2/lib/style.css';

const AGENT_NAME = 'Kate';

const SCENARIOS = [
  { id: 'inbound', label: 'Inbound Call Reception', icon: <PhoneIcon /> },
  { id: 'appointment', label: 'Appointment Setting', icon: <ClipboardIcon /> },
  { id: 'qualification', label: 'Lead Qualification', icon: <HeadsetIcon /> },
  { id: 'surveys', label: 'Customer Surveys', icon: <SurveyIcon /> },
  { id: 'support', label: 'Customer Support', icon: <ChatIcon /> },
  { id: 'debt', label: 'Debt Recovery Calls', icon: <BillIcon /> },
] as const;

const DEFAULT_SCENARIO = SCENARIOS[0].id;

const INDUSTRIES = [
  { label: 'Insurance', value: 'Insurance' },
  { label: 'Trading Platforms & Brokers', value: 'Trading Platforms & Brokers' },
  { label: 'Debt Collection', value: 'Debt Collection' },
  { label: 'EMIs & Payments', value: 'EMIs & Payments' },
  { label: 'Other', value: 'Other (Please specify)' },
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
  const [scenarios, setScenarios] = useState<string[]>([DEFAULT_SCENARIO]);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [industry, setIndustry] = useState('');
  const [company, setCompany] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reset = () => {
    setStep(1);
    setScenarios([DEFAULT_SCENARIO]);
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

  const toggleScenario = (id: string) => {
    setScenarios((current) => {
      if (current.includes(id)) {
        if (current.length === 1) return current;
        return current.filter((item) => item !== id);
      }
      return [...current, id];
    });
  };

  const goNext = () => {
    if (!phone || !isPhoneValid(`+${phone}`)) {
      setErrors({ phone: 'invalid' });
      return;
    }

    setErrors({});
    setStep(2);
  };

  const submit = async () => {
    const nextErrors: Record<string, string> = {};

    if (!name.trim()) nextErrors.name = 'Please introduce yourself';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "We can't send you the call results without your email address.";
    }
    if (!industry) nextErrors.industry = 'Please select your industry.';
    if (!company.trim()) nextErrors.company = 'Please enter your company size.';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length || isSubmitting) return;

    setIsSubmitting(true);
    setErrors((current) => ({ ...current, submit: '' }));

    const scenarioLabels = SCENARIOS.filter((item) => scenarios.includes(item.id))
      .map((item) => item.label)
      .join(', ');

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
          call_scenarios: scenarioLabels,
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
                Get your call from <br />
                <span>{AGENT_NAME}</span>
              </Title>

              <Description className={st.hero_book_demo__subtitle}>
                {step === 1
                  ? 'Mark the call scenarios you are interested in.'
                  : 'Fill out your data'}
              </Description>

              <div className={st.hero_book_demo__progress} aria-hidden>
                <span className={cn(st.hero_book_demo__progress_bar, step >= 1 && st.active)} />
                <span className={cn(st.hero_book_demo__progress_bar, step === 2 && st.active)} />
              </div>
            </div>

            {step === 1 ? (
              <div className={st.hero_book_demo__step}>
                <div className={st.hero_book_demo__scenarios}>
                  {SCENARIOS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={cn(
                        st.hero_book_demo__scenario,
                        scenarios.includes(item.id) && st.active
                      )}
                      onClick={() => toggleScenario(item.id)}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
                <div className={st.hero_book_demo__phone}>
                  <PhoneInput
                    country="us"
                    value={phone}
                    onChange={(value) => {
                      setPhone(value);
                      setErrors((current) => ({ ...current, phone: '' }));
                    }}
                    placeholder="Phone Number"
                    inputClass={cn(st.hero_book_demo__phone_input, errors.phone && st.error)}
                    buttonClass={st.hero_book_demo__phone_button}
                    dropdownClass={st.hero_book_demo__phone_dropdown}
                    enableSearch
                    searchPlaceholder="Search country..."
                    autoFormat
                  />
                </div>

                <button type="button" onClick={goNext} className="btn btn-primary w-max">
                  Next
                </button>
              </div>
            ) : (
              <div className={st.hero_book_demo__step}>
                <div className={st.hero_book_demo__fields}>
                  <div>
                    <TextField
                      name="name"
                      placeholder="Name"
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
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      intent={errors.email ? 'danger' : 'default'}
                      className={st.hero_book_demo__field}
                    />
                    {errors.email ? <ErrorMessage>{errors.email}</ErrorMessage> : null}
                  </div>
                  <div>
                    <Select
                      items={INDUSTRIES}
                      value={industry}
                      onChange={setIndustry}
                      placeholder="Industry"
                      showOtherInput
                    />
                    {errors.industry ? <ErrorMessage>{errors.industry}</ErrorMessage> : null}
                  </div>
                  <div>
                    <TextField
                      name="company"
                      placeholder="Company size"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      intent={errors.company ? 'danger' : 'default'}
                      className={st.hero_book_demo__field}
                    />
                    {errors.company ? <ErrorMessage>{errors.company}</ErrorMessage> : null}
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
                    <span>{AGENT_NAME}</span> will call you immediately.
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
