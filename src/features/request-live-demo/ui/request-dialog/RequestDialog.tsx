'use client';

import { useState } from 'react';

import { Turnstile } from '@marsidev/react-turnstile';
import PhoneInput from 'react-phone-input-2';

import { useForm, useStore } from '@/shared/lib/forms';
import { ErrorMessage } from '@/shared/ui/components/error-message';
import { Button } from '@/shared/ui/kit/button';

import type { RequestPricingSchema } from '../../model/schemas';
import { requestPricingSchema } from '../../model/schemas';
import { useRequestPricingStore } from '../../store/store';
import { ThankYouDialog } from '../thank-you-dialog/ThankYouDialog';
import st from './RequestDialog.module.scss';

import 'react-phone-input-2/lib/style.css';

// Use env variable for Cloudflare Turnstile site key
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';

export const RequestDialog = () => {
  const plan = useRequestPricingStore((state) => state.plan);
  const [isThankYouDialogOpen, setIsThankYouDialogOpen] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileKey, setTurnstileKey] = useState(0);
  console.log('plan', plan);
  const planPrice = plan.price.replace('<span>', '').replace('</span>', '');
  const planTitle = `${plan.label}: ${plan.title} - ${planPrice}`;
  console.log('planTitle', planTitle);

  const { Field, Subscribe, handleSubmit, store, reset } = useForm({
    defaultValues: {
      phone: '',
      turnstileToken: '',
    },
    validators: {
      onChange: requestPricingSchema,
    },
    onSubmit: (data) => onSubmit(data.value),
  });
  const errors = useStore(store, (state) => state.errorMap) as {
    onChange?: {
      phone?: Array<{ message: string }>;
      turnstileToken?: Array<{ message: string }>;
    };
  };

  const onSubmit = async (data: RequestPricingSchema) => {
    // Check Turnstile token
    if (!turnstileToken) {
      return;
    }

    console.log('Form submitted:', data);

    const res = await fetch('/api/retell-demo-call', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: data.phone }),
      credentials: 'include', // Include cookies in request
    });

    // If main request failed (bot detected, rate limit, etc.), stop execution
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error('Demo call request blocked or failed:', errorData);
      // Don't close dialog, don't proceed with HubSpot
      return;
    }

    setIsThankYouDialogOpen(true);
    setTurnstileToken(null);
    setTurnstileKey((prev) => prev + 1); // Reset Turnstile widget
    reset();

    // Send to HubSpot with phone and generated email for live-demo
    // Use phone-based email since HubSpot requires email field
    /*const liveDemoEmail = `phone-${data.phone}@live-demo.coldi.ai`;
    const hubspotPayload = {
      email: liveDemoEmail,
      phone: data.phone,
      hs_lead_status: 'NEW',
      pricing: planTitle,
      referral: 'affiliate_partner_a',
      submissionCode,
    };

    const hubspotRes = await fetch('/api/hubspot-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(hubspotPayload),
      credentials: 'include', // Include cookies in request
    });
    console.log('Hubspot response:', hubspotRes);
    if (hubspotRes.ok) {
      console.log('Hubspot call request sent successfully');
    } else {
      const errorData = await hubspotRes.json();
      console.error('Failed to send lead to HubSpot:', errorData);
    }*/
  };

  return (
    <>
      <form
        className={st.layout}
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log('Form submit event');
          handleSubmit().catch(console.error);
        }}
      >
        <section className={st.fields}>
          <div
            className={`${st.inputWrapper} ${st.full} ${errors.onChange?.phone ? st.error : ''}`}
          >
            {errors.onChange?.phone?.map((err) => (
              <ErrorMessage key={err.message}>{err.message}</ErrorMessage>
            ))}
            <Field name="phone">
              {(field) => (
                <div className={st.phoneInputContainer}>
                  <PhoneInput
                    country={'us'}
                    value={String(field.state.value)}
                    onChange={(phone) => field.handleChange(phone)}
                    onBlur={field.handleBlur}
                    placeholder="Phone Number"
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
          </div>
          {/* Honeypot field - hidden from users but visible to bots */}
          <div
            style={{
              position: 'absolute',
              left: '-9999px',
              opacity: 0,
              pointerEvents: 'none',
            }}
          >
            <input
              type="text"
              name="business_url"
              tabIndex={-1}
              autoComplete="off"
              style={{ display: 'none' }}
            />
          </div>
          <div
            className={`${st.inputWrapper} ${st.full} ${errors.onChange?.turnstileToken ? st.error : ''}`}
          >
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
            {errors.onChange?.turnstileToken?.map((err: { message: string }) => (
              <ErrorMessage key={err.message}>{err.message}</ErrorMessage>
            ))}
          </div>
        </section>
        <footer className={st.footer}>
          <Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) => {
              return (
                <Button disabled={!canSubmit || isSubmitting} type="submit" fullWidth>
                  {isSubmitting ? 'Loading...' : 'Start Demo'}
                </Button>
              );
            }}
          </Subscribe>
        </footer>
      </form>
      <ThankYouDialog open={isThankYouDialogOpen} onClose={() => setIsThankYouDialogOpen(false)} />
    </>
  );
};
