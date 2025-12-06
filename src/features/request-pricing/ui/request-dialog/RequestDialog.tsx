'use client';

import { useRef, useState } from 'react';

import { Content, Description, Overlay, Portal, Root, Title } from '@radix-ui/react-dialog';
import ReCAPTCHA from 'react-google-recaptcha';
import PhoneInput from 'react-phone-input-2';

import { useForm, useStore } from '@/shared/lib/forms';
import { ErrorMessage } from '@/shared/ui/components/error-message';
import { CloseIcon } from '@/shared/ui/icons/outline/close';
import { Button } from '@/shared/ui/kit/button';
import { TextArea } from '@/shared/ui/kit/text-area/TextArea';
import { TextField } from '@/shared/ui/kit/text-field';

import type { RequestPricingSchema } from '../../model/schemas';
import { requestPricingSchema } from '../../model/schemas';
import { useRequestPricingStore } from '../../store/store';
import { ThankYouDialog } from '../thank-you-dialog/ThankYouDialog';
import st from './RequestDialog.module.scss';

import 'react-phone-input-2/lib/style.css';

// Use env variable, otherwise use key from RetellWidget (same key used in the project)
const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6Ldzfc0rAAAAAECsL-e1IGCcwDiDmRkM8EaPB03h';

export const RequestDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  console.log('RequestDialog rendered, open:', open);
  const plan = useRequestPricingStore((state) => state.plan);
  const [isThankYouDialogOpen, setIsThankYouDialogOpen] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  console.log('plan', plan);
  const planPrice = plan.price.replace('<span>', '').replace('</span>', '');
  const planTitle = `${plan.label}: ${plan.title} - ${planPrice}`;
  console.log('planTitle', planTitle);

  const { Field, Subscribe, handleSubmit, store, reset } = useForm({
    defaultValues: {
      name: '',
      email: '',
      website: '',
      phone: '',
      message: '',
      plan: plan.title,
      recaptchaToken: '',
    },
    validators: {
      onChange: requestPricingSchema,
    },
    onSubmit: (data) => onSubmit(data.value),
  });
  const errors = useStore(store, (state) => state.errorMap);

  const onSubmit = async (data: RequestPricingSchema) => {
    // Reset reCAPTCHA after submission
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }

    console.log('Form submitted:', data);

    // Get honeypot field value from DOM
    const honeypotField = document.querySelector<HTMLInputElement>('input[name="business_url"]');
    const honeypotValue = honeypotField?.value || '';

    const res = await fetch('/api/request-pricing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, business_url: honeypotValue }),
    });

    // If main request failed (bot detected, rate limit, etc.), stop execution
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error('Pricing request blocked or failed:', errorData);
      // Don't close dialog, don't proceed with HubSpot
      return;
    }

    setOpen(false);
    setIsThankYouDialogOpen(true);
    reset();

    const hubspotPayload = {
      email: data.email,
      firstname: data.name,
      phone: data.phone,
      website: data.website,
      message: data.message,
      hs_lead_status: 'NEW',
      //type: 'pricing_request',
      pricing: planTitle,
      referral: 'affiliate_partner_a',
    };

    const hubspotRes = await fetch('/api/hubspot-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(hubspotPayload),
    });
    console.log('Hubspot response:', hubspotRes);
    if (hubspotRes.ok) {
      console.log('Hubspot call request sent successfully');
    } else {
      const errorData = await hubspotRes.json();
      console.error('Failed to send lead to HubSpot:', errorData);
    }

    // Trigger background check on server (30 second delay is handled on server)
    // Fire and forget - don't wait for response
    fetch('/api/check-hubspot-and-notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: data.email,
        name: data.name,
        phone: data.phone,
      }),
    }).catch((error) => {
      console.error('Error triggering HubSpot check and notification:', error);
    });
  };

  return (
    <>
      <Root open={open} onOpenChange={setOpen}>
        <Portal>
          <Overlay className={st.overlay} onClick={() => console.log('Overlay clicked')} />
          <Content className={st.content}>
            <Title />
            <Description asChild>
              <section>
                <button
                  className={st.closeButton}
                  onClick={() => {
                    console.log('Close button clicked');
                    setOpen(false);
                  }}
                  type="button"
                  aria-label="Close dialog"
                >
                  <CloseIcon />
                </button>

                <h3>
                  Start with Coldi <span>{plan.title}</span>
                </h3>

                <h4>Fill out your data</h4>

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
                    <div className={`${st.inputWrapper} ${errors.onChange?.name ? st.error : ''}`}>
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
                      {errors.onChange?.name?.map((err) => (
                        <ErrorMessage key={err.message}>{err.message}</ErrorMessage>
                      ))}
                    </div>
                    <div
                      className={`${st.inputWrapper} ${errors.onChange?.website ? st.error : ''}`}
                    >
                      <Field name="website">
                        {(field) => (
                          <TextField
                            name={field.name}
                            placeholder="Website"
                            value={String(field.state.value)}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                          />
                        )}
                      </Field>
                      {errors.onChange?.website?.map((err) => (
                        <ErrorMessage key={err.message}>{err.message}</ErrorMessage>
                      ))}
                    </div>
                    <div className={`${st.inputWrapper} ${errors.onChange?.email ? st.error : ''}`}>
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
                      {errors.onChange?.email?.map((err) => (
                        <ErrorMessage key={err.message}>{err.message}</ErrorMessage>
                      ))}
                    </div>
                    <div className={`${st.inputWrapper} ${errors.onChange?.phone ? st.error : ''}`}>
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
                      {errors.onChange?.phone?.map((err) => (
                        <ErrorMessage key={err.message}>{err.message}</ErrorMessage>
                      ))}
                    </div>
                    <div
                      className={`${st.inputWrapper} ${st.full} ${errors.onChange?.message ? st.error : ''}`}
                    >
                      <Field name="message">
                        {(field) => (
                          <TextArea
                            name={field.name}
                            placeholder="Message"
                            value={String(field.state.value)}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                          />
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
                      className={`${st.inputWrapper} ${st.full} ${errors.onChange?.recaptchaToken ? st.error : ''}`}
                    >
                      <Field name="recaptchaToken">
                        {(field) => (
                          <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={RECAPTCHA_SITE_KEY}
                            onChange={(token) => {
                              field.handleChange(token || '');
                            }}
                            onExpired={() => {
                              field.handleChange('');
                            }}
                            onError={() => {
                              field.handleChange('');
                            }}
                          />
                        )}
                      </Field>
                      {errors.onChange?.recaptchaToken?.map((err: { message: string }) => (
                        <ErrorMessage key={err.message}>{err.message}</ErrorMessage>
                      ))}
                    </div>
                  </section>
                  <footer className={st.footer}>
                    <Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                      {([canSubmit, isSubmitting]) => (
                        <Button disabled={!canSubmit || isSubmitting} type="submit" fullWidth>
                          {isSubmitting ? 'Loading...' : 'Request'}
                        </Button>
                      )}
                    </Subscribe>
                  </footer>
                </form>
              </section>
            </Description>
          </Content>
        </Portal>
      </Root>
      <ThankYouDialog open={isThankYouDialogOpen} onClose={() => setIsThankYouDialogOpen(false)} />
    </>
  );
};
