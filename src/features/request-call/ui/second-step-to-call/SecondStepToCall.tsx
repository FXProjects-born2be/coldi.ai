'use client';

import type { ReactNode } from 'react';

import { useForm, useStore } from '@/shared/lib/forms';
import { ErrorMessage } from '@/shared/ui/components/error-message';
import { Button } from '@/shared/ui/kit/button';
import { Select } from '@/shared/ui/kit/select';
import { TextField } from '@/shared/ui/kit/text-field';

import type { SecondStepCallSchema } from '../../model/schemas';
import { secondStepCallSchema } from '../../model/schemas';
import { useRequestCallStore } from '../../store/store';
import st from './SecondStepToCall.module.scss';

const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'E-commerce',
  'Real Estate',
  'Education',
  'Retail',
  'Telecommunications',
  'Manufacturing',
  'Hospitality',
  'Consulting',
  'Entertainment',
  'Non-profit',
  'Other (Please specify)',
];

const companySizes = [
  'Up to 10',
  '10-50',
  '50-200',
  '200-500',
  '500-1,000',
  '1,000-5,000',
  '5,000+',
];

export const SecondStepToCall = ({
  botName,
  onSubmit,
}: {
  botName: string;
  onSubmit: (data: SecondStepCallSchema) => void;
}) => {
  const { agent, firstStepData } = useRequestCallStore();

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
    onSubmit: async (data) => {
      onSubmit(data.value);
      const body = { ...data.value, ...firstStepData, agent };
      console.log(body);
      const res = await fetch('/api/request-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        console.log('Call request sent successfully');
      } else {
        console.error('Failed to send call request');
      }

      const retellPayload = {
        name: data.value.name,
        email: data.value.email,
        phone: firstStepData.phone,
        industry: data.value.industry,
        company: data.value.company,
        agent,
      };
      console.log('Retell payload:', retellPayload);

      const retellRes = await fetch('/api/retell-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(retellPayload),
      });
      console.log('Retell response:', retellRes);
      if (retellRes.ok) {
        console.log('Retell call request sent successfully');
      } else {
        console.error('Failed to send retell call request');
      }

      const hubspotPayload = {
        email: data.value.email,
        firstname: data.value.name,
        phone: firstStepData.phone,
        call_scenarios: firstStepData.scenario,
        industry: data.value.industry,
        company_size: data.value.company,
        hs_lead_status: 'NEW',
        type: 'call_request',
      };

      console.log('Hubspot payload:', hubspotPayload);

      const hubspotRes = await fetch('/api/hubspot-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hubspotPayload),
      });
      console.log('Hubspot response:', hubspotRes);
      if (hubspotRes.ok) {
        console.log('Hubspot call request sent successfully');
      } else {
        console.error('Failed to send hubspot call request');
      }
    },
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
                <Select
                  items={industries.map((industry) => ({ label: industry, value: industry }))}
                  value={field.state.value}
                  onChange={field.handleChange}
                  placeholder="Industry"
                  showOtherInput={true}
                  otherPlaceholder="Please specify your industry"
                />
              )}
            </Field>
            <Field name="company">
              {(field) => (
                <Select
                  items={companySizes.map((size) => ({ label: size, value: size }))}
                  value={field.state.value}
                  onChange={field.handleChange}
                  placeholder="Company size"
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
