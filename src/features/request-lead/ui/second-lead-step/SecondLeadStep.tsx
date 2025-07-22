'use client';

import type { ReactNode } from 'react';

import { useForm, useStore } from '@/shared/lib/forms';
import { ErrorMessage } from '@/shared/ui/components/error-message';
import { Selected } from '@/shared/ui/components/selected';
import { Button } from '@/shared/ui/kit/button';
import { Dropdown } from '@/shared/ui/kit/dropdown';
import { TextArea } from '@/shared/ui/kit/text-area/TextArea';
import { TextField } from '@/shared/ui/kit/text-field';

import { type SecondLeadStepSchema, secondLeadStepSchema } from '../../model/schemas';
import { useRequestLeadStore } from '../../store/store';
import st from './SecondLeadStep.module.scss';

export const SecondLeadStep = ({
  onSubmit,
}: {
  onSubmit: (data: SecondLeadStepSchema) => void;
}) => {
  const { firstStepData } = useRequestLeadStore();
  const { Field, Subscribe, handleSubmit, store } = useForm({
    defaultValues: {
      industry: '',
      monthlyLeadVolume: '',
      primaryGoal: [] as string[],
      message: '',
    },
    validators: {
      onChange: secondLeadStepSchema,
    },
    onSubmit: async (data) => {
      onSubmit(data.value);
      const body = { ...data.value, ...firstStepData };
      console.log(body);
      const res = await fetch('/api/request-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        console.log('Lead request sent successfully');
      } else {
        console.error('Failed to send lead request');
      }
    },
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
            <Field name="industry">
              {(field) => (
                <TextField
                  name={field.name}
                  placeholder="Industry"
                  value={String(field.state.value)}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  intent={field.state.meta.errors.length ? 'danger' : 'default'}
                />
              )}
            </Field>
            <Field name="monthlyLeadVolume">
              {(field) => (
                <TextField
                  name={field.name}
                  placeholder="Monthly Lead Volume"
                  value={String(field.state.value)}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  intent={field.state.meta.errors.length ? 'danger' : 'default'}
                />
              )}
            </Field>
          </FormRow>
          <div className={st.formGroup}>
            <p className={st.label}>Primary Goal</p>
            <Field name="primaryGoal">
              {(field) => (
                <Dropdown
                  trigger={
                    <>
                      {field.state.value.map((item) => (
                        <Selected key={item}>{item}</Selected>
                      ))}
                    </>
                  }
                  items={[
                    { label: 'Lead Generation', value: 'Lead Generation' },
                    { label: 'Appointment Setting', value: 'Appointment Setting' },
                    { label: 'Cost Reduction', value: 'Cost Reduction' },
                    { label: 'Inbound Call Handling', value: 'Inbound Call Handling' },
                    { label: 'Missed Call Recovery', value: 'Missed Call Recovery' },
                    { label: 'Lead Qualification', value: 'Lead Qualification' },
                    { label: 'Cold Outreach', value: 'Cold Outreach' },
                    { label: 'Customer Re-engagement', value: 'Customer Re-engagement' },
                    {
                      label: 'Survey & Feedback Collection',
                      value: 'Survey & Feedback Collection',
                    },
                    { label: 'Objection Handling', value: 'Objection Handling' },
                    { label: 'Pre-Sales Screening', value: 'Pre-Sales Screening' },
                    { label: 'Database Reactivation', value: 'Database Reactivation' },
                    { label: 'Order Confirmation', value: 'Order Confirmation' },
                    { label: 'Payment Collection', value: 'Payment Collection' },
                    { label: 'Support Call Deflection', value: 'Support Call Deflection' },
                    { label: 'Upselling / Cross-selling', value: 'Upselling / Cross-selling' },
                    { label: 'Product/Service Promotion', value: 'Product/Service Promotion' },
                    { label: 'Callback Scheduling', value: 'Callback Scheduling' },
                  ]}
                  selectedItems={field.state.value}
                  onChange={(newSelected) => field.handleChange(newSelected)}
                />
              )}
            </Field>
          </div>
          <Field name="message">
            {(field) => (
              <TextArea
                name={field.name}
                placeholder="Message"
                value={String(field.state.value)}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                intent={field.state.meta.errors.length ? 'danger' : 'default'}
              />
            )}
          </Field>
        </section>
        <Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button disabled={!canSubmit || isSubmitting} type="submit" fullWidth>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          )}
        </Subscribe>
      </form>
      {errors.onChange?.industry?.map((err) => (
        <ErrorMessage key={err.message}>{err.message}</ErrorMessage>
      ))}
      {errors.onChange?.monthlyLeadVolume?.map((err) => (
        <ErrorMessage key={err.message}>{err.message}</ErrorMessage>
      ))}
      {errors.onChange?.primaryGoal?.map((err) => (
        <ErrorMessage key={err.message}>{err.message}</ErrorMessage>
      ))}
      {errors.onChange?.message?.map((err) => (
        <ErrorMessage key={err.message}>{err.message}</ErrorMessage>
      ))}
    </section>
  );
};

export const FormRow = ({ children }: { children: ReactNode }) => (
  <div className={st.formRow}>{children}</div>
);
