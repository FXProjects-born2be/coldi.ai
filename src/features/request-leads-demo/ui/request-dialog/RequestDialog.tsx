'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { Turnstile } from '@marsidev/react-turnstile';
import PhoneInput from 'react-phone-input-2';

import {
  HCAPTCHA_ENABLED,
  RECAPTCHA_ENABLED,
  TURNSTILE_ENABLED,
  TURNSTILE_SITE_KEY,
} from '@/shared/lib/captcha-config';
import { useForm, useStore } from '@/shared/lib/forms';
import { ErrorMessage } from '@/shared/ui/components/error-message';
import { HCaptcha } from '@/shared/ui/components/HCaptcha';
import { Recaptcha } from '@/shared/ui/components/Recaptcha';
import { Button } from '@/shared/ui/kit/button';
import { Select } from '@/shared/ui/kit/select';
import { TextField } from '@/shared/ui/kit/text-field';

import type { BookDemoSchema } from '../../model/schemas';
import { bookDemoSchema, SECTOR_OPTIONS } from '../../model/schemas';
import { ThankYouDialog } from '../thank-you-dialog/ThankYouDialog';
import st from './RequestDialog.module.scss';

import 'react-phone-input-2/lib/style.css';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const;

function getUtmFromSearchParams(searchParams: ReturnType<typeof useSearchParams>) {
  const utm: Record<string, string> = {};
  UTM_KEYS.forEach((key) => {
    const v = searchParams.get(key);
    if (v) utm[key] = v;
  });
  return utm;
}

export const RequestDialog = () => {
  const [isThankYouOpen, setIsThankYouOpen] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaKey, setCaptchaKey] = useState(0);
  const searchParams = useSearchParams();
  const utmParams = useMemo(() => getUtmFromSearchParams(searchParams), [searchParams]);

  const { Field, Subscribe, handleSubmit, store, reset } = useForm({
    defaultValues: {
      name: '',
      surname: '',
      phone: '',
      email: '',
      sector: '',
      captchaToken: '',
    },
    validators: {
      onChange: bookDemoSchema,
      onSubmit: bookDemoSchema,
    },
    onSubmit: (data) => onSubmit(data.value),
  });

  const errors = useStore(store, (state) => state.errorMap) as {
    onChange?: {
      name?: Array<{ message: string }>;
      surname?: Array<{ message: string }>;
      phone?: Array<{ message: string }>;
      email?: Array<{ message: string }>;
      sector?: Array<{ message: string }>;
      captchaToken?: Array<{ message: string }>;
    };
    onSubmit?: {
      name?: Array<{ message: string }>;
      surname?: Array<{ message: string }>;
      phone?: Array<{ message: string }>;
      email?: Array<{ message: string }>;
      sector?: Array<{ message: string }>;
      captchaToken?: Array<{ message: string }>;
    };
  };

  const onSubmit = async (data: BookDemoSchema) => {
    if (!captchaToken) {
      return;
    }
    const res = await fetch('/api/leads-book-demo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.name,
        surname: data.surname,
        phone: data.phone,
        email: data.email,
        sector: data.sector,
        ...utmParams,
      }),
      credentials: 'include',
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error('Book demo failed:', err);
      setCaptchaToken(null);
      setCaptchaKey((k) => k + 1);
      return;
    }

    setCaptchaToken(null);
    setCaptchaKey((k) => k + 1);
    reset();
    setIsThankYouOpen(true);
  };

  return (
    <>
      <form
        className={st.layout}
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleSubmit().catch(console.error);
        }}
      >
        <section className={st.fields}>
          <div className={st.formRow}>
            <div className={`${st.inputWrapper} ${errors.onSubmit?.name ? st.error : ''}`}>
              <Field name="name">
                {(field) => (
                  <TextField
                    name={field.name}
                    placeholder="Name"
                    value={String(field.state.value ?? '')}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    intent={field.state.meta.errors.length ? 'danger' : 'default'}
                  />
                )}
              </Field>
              {errors.onSubmit?.name?.map((err) => (
                <ErrorMessage key={err.message}>{err.message}</ErrorMessage>
              ))}
            </div>
            <div className={`${st.inputWrapper} ${errors.onSubmit?.surname ? st.error : ''}`}>
              <Field name="surname">
                {(field) => (
                  <TextField
                    name={field.name}
                    placeholder="Surname"
                    value={String(field.state.value ?? '')}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    intent={field.state.meta.errors.length ? 'danger' : 'default'}
                  />
                )}
              </Field>
              {errors.onSubmit?.surname?.map((err) => (
                <ErrorMessage key={err.message}>{err.message}</ErrorMessage>
              ))}
            </div>
          </div>
          <div
            className={`${st.inputWrapper} ${st.full} ${errors.onSubmit?.phone ? st.error : ''}`}
          >
            <Field name="phone">
              {(field) => (
                <div className={st.phoneInputContainer}>
                  <PhoneInput
                    country="us"
                    value={String(field.state.value)}
                    onChange={(phone) => field.handleChange(phone)}
                    onBlur={field.handleBlur}
                    placeholder="Phone Number"
                    inputClass={st.phoneInput}
                    buttonClass={st.phoneInputButton}
                    dropdownClass={st.phoneInputDropdown}
                    enableSearch
                    searchPlaceholder="Search country..."
                    autoFormat
                  />
                </div>
              )}
            </Field>
            {errors.onSubmit?.phone?.map((err) => (
              <ErrorMessage key={err.message}>{err.message}</ErrorMessage>
            ))}
          </div>
          <div
            className={`${st.inputWrapper} ${st.full} ${errors.onSubmit?.email ? st.error : ''}`}
          >
            <Field name="email">
              {(field) => (
                <TextField
                  name={field.name}
                  type="email"
                  placeholder="Email"
                  value={String(field.state.value ?? '')}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  intent={field.state.meta.errors.length ? 'danger' : 'default'}
                />
              )}
            </Field>
            {errors.onSubmit?.email?.map((err) => (
              <ErrorMessage key={err.message}>{err.message}</ErrorMessage>
            ))}
          </div>
          <div
            className={`${st.inputWrapper} ${st.full} ${errors.onSubmit?.sector ? st.error : ''}`}
          >
            <Field name="sector">
              {(field) => (
                <Select
                  items={SECTOR_OPTIONS.map((o) => ({ label: o.label, value: o.value }))}
                  value={field.state.value}
                  onChange={field.handleChange}
                  placeholder="Sector"
                  showOtherInput={true}
                  otherPlaceholder="Please specify your sector"
                />
              )}
            </Field>
            {errors.onSubmit?.sector?.map((err) => (
              <ErrorMessage key={err.message}>{err.message}</ErrorMessage>
            ))}
          </div>
          <div
            className={`${st.inputWrapper} ${st.full} ${errors.onSubmit?.captchaToken ? st.error : ''}`}
          >
            <Field name="captchaToken">
              {(field) => (
                <>
                  {TURNSTILE_ENABLED ? (
                    <Turnstile
                      key={captchaKey}
                      siteKey={TURNSTILE_SITE_KEY}
                      onSuccess={(token) => {
                        setCaptchaToken(token);
                        field.handleChange(token);
                      }}
                      onError={() => {
                        setCaptchaToken(null);
                        field.handleChange('');
                      }}
                      onExpire={() => {
                        setCaptchaToken(null);
                        field.handleChange('');
                      }}
                    />
                  ) : HCAPTCHA_ENABLED ? (
                    <HCaptcha
                      resetKey={captchaKey}
                      onSuccess={(token) => {
                        setCaptchaToken(token);
                        field.handleChange(token);
                      }}
                      onError={() => {
                        setCaptchaToken(null);
                        field.handleChange('');
                      }}
                      onExpire={() => {
                        setCaptchaToken(null);
                        field.handleChange('');
                      }}
                    />
                  ) : RECAPTCHA_ENABLED ? (
                    <Recaptcha
                      resetKey={captchaKey}
                      onSuccess={(token) => {
                        setCaptchaToken(token);
                        field.handleChange(token);
                      }}
                      onError={() => {
                        setCaptchaToken(null);
                        field.handleChange('');
                      }}
                      onExpire={() => {
                        setCaptchaToken(null);
                        field.handleChange('');
                      }}
                    />
                  ) : null}
                </>
              )}
            </Field>
            {errors.onSubmit?.captchaToken?.map((err: { message: string }) => (
              <ErrorMessage key={err.message}>{err.message}</ErrorMessage>
            ))}
          </div>
        </section>
        <div className={st.footer}>
          <Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <Button
                disabled={!canSubmit || isSubmitting || !captchaToken}
                type="submit"
                fullWidth
              >
                {isSubmitting ? 'Sending...' : 'Book a Demo'}
              </Button>
            )}
          </Subscribe>
        </div>
      </form>
      <ThankYouDialog open={isThankYouOpen} onClose={() => setIsThankYouOpen(false)} />
    </>
  );
};
