'use client';

import type { ReactNode } from 'react';

import { useForm, useStore } from '@/shared/lib/forms';
import { ErrorMessage } from '@/shared/ui/components/error-message';
import { Button } from '@/shared/ui/kit/button';
import { TextField } from '@/shared/ui/kit/text-field';

import type { SecondStepCallSchema } from '../../model/schemas';
import { secondStepCallSchema } from '../../model/schemas';
import st from './SecondStepToCall.module.scss';

export const SecondStepToCall = ({
  botName,
  onSubmit,
}: {
  botName: string;
  onSubmit: (data: SecondStepCallSchema) => void;
}) => {
  const { Field, Subscribe, handleSubmit, store } = useForm({
    defaultValues: {
      name: '',
      email: '',
      industry: '',
      company: '',
    },
    validators: {
      onChange: secondStepCallSchema,
    },
    onSubmit: (data) => onSubmit(data.value),
  });
  const errors = useStore(store, (state) => state.errorMap);

  return (
    <section className={st.container}>
      <form
        className={st.layout}
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleSubmit().catch(console.error);
        }}
      >
        <section className={st.fields}>
          <FormRow>
            <Field name="name">
              {(field) => (
                <TextField
                  name={field.name}
                  placeholder="Name"
                  value={String(field.state.value)}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            </Field>
            <Field name="email">
              {(field) => (
                <TextField
                  name={field.name}
                  placeholder="Email"
                  value={String(field.state.value)}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            </Field>
          </FormRow>
          <FormRow>
            <Field name="industry">
              {(field) => (
                <TextField
                  name={field.name}
                  placeholder="Industry"
                  value={String(field.state.value)}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            </Field>
            <Field name="company">
              {(field) => (
                <TextField
                  name={field.name}
                  placeholder="Company size"
                  value={String(field.state.value)}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            </Field>
          </FormRow>
        </section>
        <footer className={st.footer}>
          <Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <Button disabled={!canSubmit || isSubmitting} type="submit" fullWidth>
                {isSubmitting ? 'Loading...' : 'Next'}
              </Button>
            )}
          </Subscribe>
          <span className={st.appendix}>
            <span className={st.name}>{botName}</span> will call you immediately.
          </span>
        </footer>
      </form>
      {errors.onChange?.name?.map((err) => (
        <ErrorMessage key={err.message}>{err.message}</ErrorMessage>
      ))}
      {errors.onChange?.email?.map((err) => (
        <ErrorMessage key={err.message}>{err.message}</ErrorMessage>
      ))}
      {errors.onChange?.industry?.map((err) => (
        <ErrorMessage key={err.message}>{err.message}</ErrorMessage>
      ))}
      {errors.onChange?.company?.map((err) => (
        <ErrorMessage key={err.message}>{err.message}</ErrorMessage>
      ))}
    </section>
  );
};

export const FormRow = ({ children }: { children: ReactNode }) => (
  <div className={st.formRow}>{children}</div>
);
