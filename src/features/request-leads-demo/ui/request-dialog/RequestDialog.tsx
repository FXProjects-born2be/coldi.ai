'use client';

import { useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import PhoneInput from 'react-phone-input-2';

import { useForm, useStore } from '@/shared/lib/forms';
import { ErrorMessage } from '@/shared/ui/components/error-message';
import { Button } from '@/shared/ui/kit/button';
import { Select } from '@/shared/ui/kit/select';
import { TextField } from '@/shared/ui/kit/text-field';

import type { BookDemoSchema } from '../../model/schemas';
import { bookDemoSchema, SECTOR_OPTIONS } from '../../model/schemas';
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

const SUCCESS_REDIRECT_PATH = '/calendar';

export const RequestDialog = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const utmParams = useMemo(() => getUtmFromSearchParams(searchParams), [searchParams]);

  const { Field, Subscribe, handleSubmit, store, reset } = useForm({
    defaultValues: {
      name: '',
      surname: '',
      phone: '',
      email: '',
      sector: '',
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
    };
    onSubmit?: {
      name?: Array<{ message: string }>;
      surname?: Array<{ message: string }>;
      phone?: Array<{ message: string }>;
      email?: Array<{ message: string }>;
      sector?: Array<{ message: string }>;
    };
  };

  const onSubmit = (data: BookDemoSchema) => {
    fetch('/api/leads-book-demo', {
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
    }).catch((err) => console.error('Book demo request failed:', err));

    reset();
    const params = new URLSearchParams();
    if (data.name?.trim()) params.set('firstName', data.name.trim());
    if (data.surname?.trim()) params.set('lastName', data.surname.trim());
    if (data.email?.trim()) params.set('email', data.email.trim());
    const query = params.toString();
    router.push(query ? `${SUCCESS_REDIRECT_PATH}?${query}` : SUCCESS_REDIRECT_PATH);
  };

  return (
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
        <div className={`${st.inputWrapper} ${st.full} ${errors.onSubmit?.phone ? st.error : ''}`}>
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
        <div className={`${st.inputWrapper} ${st.full} ${errors.onSubmit?.email ? st.error : ''}`}>
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
        <div className={`${st.inputWrapper} ${st.full} ${errors.onSubmit?.sector ? st.error : ''}`}>
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
      </section>
      <div className={st.footer}>
        <Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button disabled={!canSubmit || isSubmitting} type="submit" fullWidth>
              {isSubmitting ? 'Sending...' : 'Book a Demo'}
            </Button>
          )}
        </Subscribe>
      </div>
    </form>
  );
};
