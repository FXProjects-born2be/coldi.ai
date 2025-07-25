'use client';
import { useEffect } from 'react';

import type { ReactNode } from 'react';
import PhoneInput from 'react-phone-input-2';

import { useForm, useStore } from '@/shared/lib/forms';
import { ErrorMessage } from '@/shared/ui/components/error-message';
import { Button } from '@/shared/ui/kit/button';
import { TextField } from '@/shared/ui/kit/text-field';

import { type FirstLeadStepSchema, firstLeadStepSchema } from '../../model/schemas';
import { useRequestLeadStore } from '../../store/store';
import st from './FirstLeadStep.module.scss';

import 'react-phone-input-2/lib/style.css';

export const FirstLeadStep = ({ onSubmit }: { onSubmit: (data: FirstLeadStepSchema) => void }) => {
  const { setFirstStepData } = useRequestLeadStore();

  const { Field, Subscribe, handleSubmit, store } = useForm({
    defaultValues: {
      fullName: localStorage.getItem('LeadRequestFirstStepData')
        ? JSON.parse(localStorage.getItem('LeadRequestFirstStepData') || '{}').fullName
        : '',
      company: localStorage.getItem('LeadRequestFirstStepData')
        ? JSON.parse(localStorage.getItem('LeadRequestFirstStepData') || '{}').company
        : '',
      email: localStorage.getItem('LeadRequestFirstStepData')
        ? JSON.parse(localStorage.getItem('LeadRequestFirstStepData') || '{}').email
        : '',
      phone: localStorage.getItem('LeadRequestFirstStepData')
        ? JSON.parse(localStorage.getItem('LeadRequestFirstStepData') || '{}').phone
        : '',
    },
    validators: {
      onChange: firstLeadStepSchema,
    },
    onSubmit: (data) => {
      onSubmit(data.value);
      localStorage.setItem('LeadRequestFirstStepData', JSON.stringify(data.value));
      console.log(localStorage.getItem('LeadRequestFirstStepData'));
    },
  });
  const errors = useStore(store, (state) => state.errorMap);

  const formValues = useStore(store, (state) => state.values);

  useEffect(() => {
    console.log(formValues);
    if (formValues) {
      setFirstStepData({
        fullName: formValues.fullName,
        company: formValues.company,
        email: formValues.email,
        phone: formValues.phone,
      });
    }
  }, [formValues, setFirstStepData]);

  return (
    <section className={st.container}>
      <form
        className={st.form}
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleSubmit().catch(console.error);
        }}
      >
        <section className={st.fields}>
          <FormRow>
            <Field name="fullName">
              {(field) => (
                <TextField
                  name={field.name}
                  placeholder="Full Name"
                  value={String(field.state.value)}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  intent={field.state.meta.errors.length ? 'danger' : 'default'}
                />
              )}
            </Field>
            <Field name="company">
              {(field) => (
                <TextField
                  name={field.name}
                  placeholder="Company"
                  value={String(field.state.value)}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  intent={field.state.meta.errors.length ? 'danger' : 'default'}
                />
              )}
            </Field>
          </FormRow>
          <FormRow>
            <Field name="email">
              {(field) => (
                <TextField
                  name={field.name}
                  placeholder="Email"
                  value={String(field.state.value)}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  intent={field.state.meta.errors.length ? 'danger' : 'default'}
                />
              )}
            </Field>
            <Field name="phone">
              {(field) => (
                <div className={st.phoneInputContainer}>
                  <PhoneInput
                    country={'us'}
                    value={String(field.state.value)}
                    onChange={(phone) => field.handleChange(phone)}
                    onBlur={field.handleBlur}
                    placeholder="Phone"
                    inputClass={st.phoneInput}
                    buttonClass={st.phoneInputButton}
                    dropdownClass={st.phoneInputDropdown}
                    enableSearch={true}
                    searchPlaceholder="Search country..."
                    autoFormat={true}
                  />
                </div>
              )}
            </Field>
          </FormRow>
        </section>
        <Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button disabled={!canSubmit || isSubmitting} type="submit" fullWidth>
              {isSubmitting ? 'Loading...' : 'Next'}
            </Button>
          )}
        </Subscribe>
      </form>
      {errors.onChange?.fullName?.map((err) => (
        <ErrorMessage key={err.message}>{err.message}</ErrorMessage>
      ))}
      {errors.onChange?.company?.map((err) => (
        <ErrorMessage key={err.message}>{err.message}</ErrorMessage>
      ))}
      {errors.onChange?.email?.map((err) => (
        <ErrorMessage key={err.message}>{err.message}</ErrorMessage>
      ))}
      {errors.onChange?.phone?.map((err) => (
        <ErrorMessage key={err.message}>{err.message}</ErrorMessage>
      ))}
    </section>
  );
};

export const FormRow = ({ children }: { children: ReactNode }) => (
  <div className={st.formRow}>{children}</div>
);
