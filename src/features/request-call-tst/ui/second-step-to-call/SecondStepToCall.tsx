'use client';

import { type ReactNode, useState } from 'react';

import { Turnstile } from '@marsidev/react-turnstile';

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

// List of supported country codes
/*const SUPPORTED_COUNTRY_CODES = [
  '+52',
  '+1',
  '+44',
  '+54',
  '+55',
  '+56',
  '+43',
  '+32',
  '+359',
  '+385',
  '+357',
  '+420',
  '+45',
  '+372',
  '+33',
  '+49',
  '+30',
  '+36',
  '+354',
  '+353',
  '+39',
  '+371',
  '+370',
  '+352',
  '+377',
  '+31',
  '+47',
  '+48',
  '+351',
  '+34',
  '+46',
  '+41',
  '+972',
  '+965',
  '+974',
  '+966',
  '+65',
  '+886',
  '+66',
  '+90',
  '+971',
  '+61',
  '+91',
];*/

// Use env variable for Cloudflare Turnstile site key
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';

export const SecondStepToCall = ({
  botName,
  onSubmit,
  onUnsupportedCountry,
}: {
  botName: string;
  onSubmit: (data: SecondStepCallSchema) => void;
  onUnsupportedCountry: () => void;
}) => {
  const { agent, firstStepData } = useRequestCallStore();
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileKey, setTurnstileKey] = useState(0);
  console.log('botName', botName);
  const { Field, Subscribe, handleSubmit, store } = useForm({
    defaultValues: {
      name: '',
      email: '',
      industry: '',
      company: '',
      turnstileToken: '',
    },
    validators: {
      onSubmit: secondStepCallSchema,
    },
    onSubmit: async (data) => {
      // Check Turnstile token
      if (!turnstileToken) {
        console.error('Turnstile token is missing');
        return;
      }

      // Reset Turnstile after submission
      setTurnstileToken(null);
      setTurnstileKey((prev) => prev + 1);

      // Check if country code is supported
      //const countryCode = firstStepData.countryCode || '';
      const isSupported = true; //SUPPORTED_COUNTRY_CODES.includes(countryCode);

      // Prepare HubSpot payload (used for both supported and unsupported countries)
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

      // Common flow for both supported and unsupported countries
      localStorage?.removeItem('CallRequestFirstStepData');

      // Get honeypot field value from DOM
      const honeypotField = document.querySelector<HTMLInputElement>('input[name="website_url"]');
      const honeypotValue = honeypotField?.value || '';

      const body = { ...data.value, ...firstStepData, agent, website_url: honeypotValue };
      console.log(body);
      const res = await fetch('/api/request-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      // If main request failed (bot detected, rate limit, etc.), stop execution
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error('Call request blocked or failed:', errorData);
        // Don't proceed with Retell, HubSpot, or show success dialog
        return;
      }

      console.log('Call request sent successfully');

      const retellPayload = {
        name: data.value.name,
        email: data.value.email,
        phone: firstStepData.phone,
        industry: data.value.industry,
        company: data.value.company,
        agent,
        countryCode: firstStepData.countryCode,
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

      // Show different dialog based on country code support
      if (!isSupported) {
        // Show unsupported country dialog
        onUnsupportedCountry();
      } else {
        // Show success dialog for supported countries
        onSubmit(data.value);
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
          {/* Honeypot field - hidden from users but visible to bots */}
          <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}>
            <input
              type="text"
              name="website_url"
              tabIndex={-1}
              autoComplete="off"
              style={{ display: 'none' }}
            />
          </div>
          <div className={`${st.inputWrapper} ${errors.onSubmit?.turnstileToken ? st.error : ''}`}>
            <Field name="turnstileToken">
              {(field) => (
                <Turnstile
                  key={turnstileKey}
                  siteKey={TURNSTILE_SITE_KEY}
                  onSuccess={(token) => {
                    setTurnstileToken(token);
                    field.handleChange(token);
                  }}
                  onError={() => {
                    setTurnstileToken(null);
                    field.handleChange('');
                  }}
                  onExpire={() => {
                    setTurnstileToken(null);
                    field.handleChange('');
                  }}
                />
              )}
            </Field>
            {errors.onSubmit?.turnstileToken?.map((err) => (
              <ErrorMessage key={err.message}>{err.message}</ErrorMessage>
            ))}
          </div>
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
            <span className={st.name}>Agent</span> will call you immediately.
          </span>
        </footer>
      </form>
    </section>
  );
};

export const FormRow = ({ children }: { children: ReactNode }) => (
  <div className={st.formRow}>{children}</div>
);
