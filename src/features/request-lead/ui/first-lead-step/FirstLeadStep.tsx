'use client';

import type { ReactNode } from 'react';

import { useForm, useStore } from '@/shared/lib/forms';
import { ErrorMessage } from '@/shared/ui/components/error-message';
import { Button } from '@/shared/ui/kit/button';
import { TextField } from '@/shared/ui/kit/text-field';

import { type FirstLeadStepSchema, firstLeadStepSchema } from '../../model/schemas';
import st from './FirstLeadStep.module.scss';

export const FirstLeadStep = ({ onSubmit }: { onSubmit: (data: FirstLeadStepSchema) => void }) => {
  const { Field, Subscribe, handleSubmit, store } = useForm({
    defaultValues: {
      fullName: '',
      company: '',
      email: '',
      phone: '',
    },
    validators: {
      onChange: firstLeadStepSchema,
    },
    onSubmit: (data) => onSubmit(data.value),
  });
  const errors = useStore(store, (state) => state.errorMap);

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
                <TextField
                  name={field.name}
                  placeholder="Phone"
                  value={String(field.state.value)}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  intent={field.state.meta.errors.length ? 'danger' : 'default'}
                />
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
