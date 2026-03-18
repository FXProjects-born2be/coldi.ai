'use client';

import { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Content, Description, Overlay, Portal, Root, Title } from '@radix-ui/react-dialog';
import PhoneInput from 'react-phone-input-2';

import type { BookDemoSchema } from '@/features/request-leads-demo/model/schemas';
import { bookDemoSchema, SECTOR_OPTIONS } from '@/features/request-leads-demo/model/schemas';
import { SectorSelect } from '@/features/request-leads-demo/ui/sector-select';

import { useForm } from '@/shared/lib/forms';
import { ErrorMessage } from '@/shared/ui/components/error-message';
import { CloseIcon } from '@/shared/ui/icons/outline/close';
import { Button } from '@/shared/ui/kit/button';
import { TextField } from '@/shared/ui/kit/text-field';

import { useRequestPricingStore } from '../../store/store';
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
const REDIRECT_DELAY_MS = 1000;

export const RequestDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const plan = useRequestPricingStore((state) => state.plan);
  const router = useRouter();
  const searchParams = useSearchParams();
  const utmParams = useMemo(() => getUtmFromSearchParams(searchParams), [searchParams]);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isSectorOpen, setIsSectorOpen] = useState(false);

  const { Field, Subscribe, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      surname: '',
      phone: '',
      email: '',
      sector: '',
    },
    validators: {
      onSubmit: bookDemoSchema,
    },
    onSubmit: (data) => onSubmit(data.value),
  });

  const getErrorMessage = (err: unknown) =>
    typeof err === 'string' ? err : ((err as { message?: string })?.message ?? '');

  const onSubmit = (data: BookDemoSchema) => {
    setIsRedirecting(true);
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
    setOpen(false);
    const params = new URLSearchParams();
    if (data.name?.trim()) params.set('firstName', data.name.trim());
    if (data.surname?.trim()) params.set('lastName', data.surname.trim());
    if (data.email?.trim()) params.set('email', data.email.trim());
    const query = params.toString();
    const redirectUrl = query ? `${SUCCESS_REDIRECT_PATH}?${query}` : SUCCESS_REDIRECT_PATH;
    setTimeout(() => router.push(redirectUrl), REDIRECT_DELAY_MS);
  };

  return (
    <Root open={open} onOpenChange={setOpen}>
      <Portal>
        <Overlay className={st.overlay} />
        <Content className={st.content}>
          <Title />
          <Description asChild>
            <section>
              <button
                className={st.closeButton}
                onClick={() => setOpen(false)}
                type="button"
                aria-label="Close dialog"
              >
                <CloseIcon />
              </button>

              <h3>
                Start with Coldi <span>{plan.title}</span>
              </h3>

              <h4>Fill out your data</h4>

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
                    <div className={st.inputWrapper}>
                      <Field name="name">
                        {(field) => (
                          <>
                            <TextField
                              name={field.name}
                              placeholder="Name"
                              value={String(field.state.value ?? '')}
                              onBlur={field.handleBlur}
                              onChange={(e) => field.handleChange(e.target.value)}
                              intent={field.state.meta.errors.length ? 'danger' : 'default'}
                            />
                            {field.state.meta.errors?.map((err, i) => (
                              <ErrorMessage key={i}>{getErrorMessage(err)}</ErrorMessage>
                            ))}
                          </>
                        )}
                      </Field>
                    </div>
                    <div className={st.inputWrapper}>
                      <Field name="surname">
                        {(field) => (
                          <>
                            <TextField
                              name={field.name}
                              placeholder="Surname"
                              value={String(field.state.value ?? '')}
                              onBlur={field.handleBlur}
                              onChange={(e) => field.handleChange(e.target.value)}
                              intent={field.state.meta.errors.length ? 'danger' : 'default'}
                            />
                            {field.state.meta.errors?.map((err, i) => (
                              <ErrorMessage key={i}>{getErrorMessage(err)}</ErrorMessage>
                            ))}
                          </>
                        )}
                      </Field>
                    </div>
                  </div>
                  <div className={`${st.inputWrapper} ${st.full}`}>
                    <Field name="phone">
                      {(field) => (
                        <>
                          <div className={st.phoneInputContainer}>
                            <PhoneInput
                              country="gb"
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
                          {field.state.meta.errors?.map((err, i) => (
                            <ErrorMessage key={i}>{getErrorMessage(err)}</ErrorMessage>
                          ))}
                        </>
                      )}
                    </Field>
                  </div>
                  <div className={`${st.inputWrapper} ${st.full}`}>
                    <Field name="email">
                      {(field) => (
                        <>
                          <TextField
                            name={field.name}
                            type="email"
                            placeholder="Work email"
                            value={String(field.state.value ?? '')}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            intent={field.state.meta.errors.length ? 'danger' : 'default'}
                          />
                          {field.state.meta.errors?.map((err, i) => (
                            <ErrorMessage key={i}>{getErrorMessage(err)}</ErrorMessage>
                          ))}
                        </>
                      )}
                    </Field>
                  </div>
                  <div
                    className={`${st.inputWrapper} ${st.sector} ${st.full} ${isSectorOpen ? st.sectorOpen : ''}`}
                  >
                    <Field name="sector">
                      {(field) => (
                        <>
                          <SectorSelect
                            items={SECTOR_OPTIONS}
                            value={field.state.value}
                            onChange={field.handleChange}
                            placeholder="Industry"
                            onOpenChange={setIsSectorOpen}
                          />
                          {field.state.meta.errors?.map((err, i) => (
                            <ErrorMessage key={i}>{getErrorMessage(err)}</ErrorMessage>
                          ))}
                        </>
                      )}
                    </Field>
                  </div>
                </section>
                <div className={st.footer}>
                  <Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                    {([canSubmit, isSubmitting]) => {
                      const pending = isSubmitting || isRedirecting;
                      return (
                        <Button disabled={!canSubmit || pending} type="submit" fullWidth>
                          {pending ? 'Sending...' : 'Book a Demo'}
                        </Button>
                      );
                    }}
                  </Subscribe>
                </div>
              </form>
            </section>
          </Description>
        </Content>
      </Portal>
    </Root>
  );
};
