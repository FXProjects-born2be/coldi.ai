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
      onSubmit: secondStepCallSchema,
    },
    onSubmit: async (data) => {
      onSubmit(data.value);
      localStorage?.removeItem('CallRequestFirstStepData');
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
        //type: 'call_request',
        referral: 'affiliate_partner_a',
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
        const error = await hubspotRes.json();
        console.error('Failed to send hubspot call request', error);
      }

      fetch('/api/check-hubspot-and-notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.value.email,
          name: data.value.name,
          phone: firstStepData.phone,
        }),
      }).catch((error) => {
        console.error('Error triggering HubSpot check and notification:', error);
      });
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
            <div className={`${st.inputWrapper} ${errors.onSubmit?.name ? st.error : ''}`}>
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
              {errors.onSubmit?.name?.map((err) => (
                <ErrorMessage key={err.message}>{err.message}</ErrorMessage>
              ))}
            </div>
            <div className={`${st.inputWrapper} ${errors.onSubmit?.email ? st.error : ''}`}>
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
              {errors.onSubmit?.email?.map((err) => (
                <ErrorMessage key={err.message}>{err.message}</ErrorMessage>
              ))}
            </div>
          </FormRow>
          <FormRow>
            <div className={`${st.inputWrapper} ${errors.onSubmit?.industry ? st.error : ''}`}>
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
              {errors.onSubmit?.industry?.map((err) => (
                <ErrorMessage key={err.message}>{err.message}</ErrorMessage>
              ))}
            </div>
            <div className={`${st.inputWrapper} ${errors.onSubmit?.company ? st.error : ''}`}>
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
              {errors.onSubmit?.company?.map((err) => (
                <ErrorMessage key={err.message}>{err.message}</ErrorMessage>
              ))}
            </div>
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
    </section>
  );
};

export const FormRow = ({ children }: { children: ReactNode }) => (
  <div className={st.formRow}>{children}</div>
);
