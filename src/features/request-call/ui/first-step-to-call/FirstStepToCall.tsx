'use client';

import { useMemo } from 'react';

import { useForm, useStore } from '@/shared/lib/forms';
import { ErrorMessage } from '@/shared/ui/components/error-message';
import { Button } from '@/shared/ui/kit/button';
import { Option } from '@/shared/ui/kit/option';
import { TextField } from '@/shared/ui/kit/text-field';

import { getScenarios } from '../../model/data';
import { type FirstStepCallSchema, firstStepCallSchema } from '../../model/schemas';
import st from './FirstStepToCall.module.scss';

export const FirstStepToCall = ({
  onSubmit,
}: {
  onSubmit: (data: FirstStepCallSchema) => void;
}) => {
  const scenarios = useMemo(() => getScenarios(), []);

  const { Field, Subscribe, handleSubmit, store } = useForm({
    defaultValues: {
      scenario: scenarios[0],
      phone: '',
    },
    validators: {
      onChange: firstStepCallSchema,
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
        <header className={st.header}>
          <h2>Choose call scenarios</h2>
          <span className={st.divider} />
          <Field name="scenario">
            {(field) => (
              <div className={st.optionsContainer}>
                {scenarios.map((scenario) => (
                  <Option
                    key={scenario}
                    selected={field.state.value === scenario}
                    onClick={() => field.handleChange(scenario)}
                  >
                    {scenario}
                  </Option>
                ))}
              </div>
            )}
          </Field>
        </header>
        <Field name="phone">
          {(field) => (
            <TextField
              name={field.name}
              placeholder="Message"
              value={String(field.state.value)}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              intent={field.state.meta.errors.length ? 'danger' : 'default'}
            />
          )}
        </Field>
        <Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button disabled={!canSubmit || isSubmitting} type="submit" fullWidth>
              {isSubmitting ? 'Loading...' : 'Next'}
            </Button>
          )}
        </Subscribe>
      </form>
      {errors.onChange?.phone?.map((err) => (
        <ErrorMessage key={err.message}>{err.message}</ErrorMessage>
      ))}
    </section>
  );
};
