'use client';
import { useEffect, useState } from 'react';

import type { ReactNode } from 'react';
import PhoneInput from 'react-phone-input-2';

import { validateEmail } from '@/shared/lib/email-validation';
import { useForm, useStore } from '@/shared/lib/forms';
import { ErrorMessage } from '@/shared/ui/components/error-message';
import { Button } from '@/shared/ui/kit/button';
import { TextField } from '@/shared/ui/kit/text-field';

import { type FirstLeadStepSchema, firstLeadStepSchema } from '../../model/schemas';
import { useRequestLeadStore } from '../../store/store';
import st from './FirstLeadStep.module.scss';

import 'react-phone-input-2/lib/style.css';

// Feature flag: Email validation (set to true to enable email validation)
const EMAIL_VALIDATION_ENABLED = false;

export const FirstLeadStep = ({ onSubmit }: { onSubmit: (data: FirstLeadStepSchema) => void }) => {
  const { setFirstStepData } = useRequestLeadStore();

  const { Field, Subscribe, handleSubmit, store } = useForm({
    defaultValues: {
      fullName: localStorage?.getItem('LeadRequestFirstStepData')
        ? JSON.parse(localStorage.getItem('LeadRequestFirstStepData') || '{}').fullName
        : '',
      company: localStorage?.getItem('LeadRequestFirstStepData')
        ? JSON.parse(localStorage.getItem('LeadRequestFirstStepData') || '{}').company
        : '',
      email: localStorage?.getItem('LeadRequestFirstStepData')
        ? JSON.parse(localStorage.getItem('LeadRequestFirstStepData') || '{}').email
        : '',
      phone: localStorage?.getItem('LeadRequestFirstStepData')
        ? JSON.parse(localStorage.getItem('LeadRequestFirstStepData') || '{}').phone
        : '',
    },
    validators: {
      onSubmit: firstLeadStepSchema,
    },
    onSubmit: async (data) => {
      // Validate email on submit
      const email = formValues.email?.trim();
      if (!email) {
        setEmailValidationError('Please enter your email address');
        return;
      }

      // Basic email format check
      if (!email.includes('@')) {
        setEmailValidationError('Please enter a valid email address');
        return;
      }

      // Validate email (if enabled)
      if (EMAIL_VALIDATION_ENABLED) {
        setEmailValidating(true);
        setEmailValidationError(null);
        const result = await validateEmail(email);

        if (!result.isValid) {
          setEmailValidationError(
            result.message || 'Email is not valid. Please use another email address.'
          );
          setEmailValidating(false);
          return;
        }
        setEmailValidationError(null);
        setEmailValidating(false);
      }

      onSubmit(data.value);
      localStorage?.setItem('LeadRequestFirstStepData', JSON.stringify(data.value));
      console.log(localStorage?.getItem('LeadRequestFirstStepData'));
      // HubSpot lead creation happens in second step after all validations and captcha
    },
  });
  const errors = useStore(store, (state) => state.errorMap);

  const formValues = useStore(store, (state) => state.values);

  // Email validation state
  const [emailValidating, setEmailValidating] = useState(false);
  const [emailValidationError, setEmailValidationError] = useState<string | null>(null);

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
            <div className={`${st.inputWrapper} ${errors.onSubmit?.fullName ? st.error : ''}`}>
              <Field name="fullName">
                {(field) => (
                  <TextField
                    name={field.name}
                    placeholder="Full Name"
                    value={String(field.state.value)}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    intent={errors.onSubmit?.fullName?.length ? 'danger' : 'default'}
                  />
                )}
              </Field>
              {errors.onSubmit?.fullName?.map((err) => (
                <ErrorMessage key={err.message}>{err.message}</ErrorMessage>
              ))}
            </div>
            <div className={`${st.inputWrapper} ${errors.onSubmit?.company ? st.error : ''}`}>
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
              {errors.onSubmit?.company?.map((err) => (
                <ErrorMessage key={err.message}>{err.message}</ErrorMessage>
              ))}
            </div>
          </FormRow>
          <FormRow>
            <div
              className={`${st.inputWrapper} ${errors.onSubmit?.email || emailValidationError ? st.error : ''}`}
            >
              <Field name="email">
                {(field) => (
                  <TextField
                    name={field.name}
                    placeholder="Email"
                    value={String(field.state.value)}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    intent={
                      field.state.meta.errors.length || emailValidationError ? 'danger' : 'default'
                    }
                  />
                )}
              </Field>
              {errors.onSubmit?.email?.map((err) => (
                <ErrorMessage key={err.message}>{err.message}</ErrorMessage>
              ))}
              {emailValidationError && <ErrorMessage>{emailValidationError}</ErrorMessage>}
            </div>
            <div className={`${st.inputWrapper} ${errors.onSubmit?.phone ? st.error : ''}`}>
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
              {errors.onSubmit?.phone?.map((err) => (
                <ErrorMessage key={err.message}>{err.message}</ErrorMessage>
              ))}
            </div>
          </FormRow>
        </section>
        <Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => {
            return (
              <Button disabled={!canSubmit || isSubmitting} type="submit" fullWidth>
                {isSubmitting || emailValidating ? 'Loading...' : 'Next'}
              </Button>
            );
          }}
        </Subscribe>
      </form>
    </section>
  );
};

export const FormRow = ({ children }: { children: ReactNode }) => (
  <div className={st.formRow}>{children}</div>
);
