'use client';

import type { ReactNode } from 'react';

import { useForm } from '@/shared/lib/forms';
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
  const { Field, Subscribe, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      email: '',
      industry: '',
      companySize: '',
    },
    validators: {
      onChange: secondStepCallSchema,
    },
    onSubmit: (data) => onSubmit(data.value),
  });

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
        <FormRow>
          <Field name="name">
            {(field) => (
              <TextField
                name={field.name}
                placeholder="Name"
                value={String(field.state.value)}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                hint={field.state.meta.errors.map((err) => err?.message).join(', ')}
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
                hint={field.state.meta.errors.map((err) => err?.message).join(', ')}
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
                hint={field.state.meta.errors.map((err) => err?.message).join(', ')}
              />
            )}
          </Field>
          <Field name="companySize">
            {(field) => (
              <TextField
                name={field.name}
                placeholder="Company size"
                value={String(field.state.value)}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                hint={field.state.meta.errors.map((err) => err?.message).join(', ')}
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
  );
};

export const FormRow = ({ children }: { children: ReactNode }) => (
  <div className={st.formRow}>{children}</div>
);
