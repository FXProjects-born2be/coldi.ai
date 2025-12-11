'use client';

import { useEffect, useRef, useState } from 'react';

import { Content, Description, Overlay, Portal, Root, Title } from '@radix-ui/react-dialog';
import ReCAPTCHA from 'react-google-recaptcha';
import PhoneInput from 'react-phone-input-2';

import { requiresSmsVerification } from '@/shared/lib/email-verification';
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

// Feature flag: SMS verification (temporary off; set to true to re-enable)
const SMS_VERIFICATION_ENABLED = false;

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
      smsCode: undefined as string | undefined,
    },
    validators: {
      // @ts-expect-error - Schema type mismatch due to optional smsCode field
      onChange: requestPricingSchema,
    },
    onSubmit: (data) => onSubmit(data.value),
  });
  const errors = useStore(store, (state) => state.errorMap) as {
    onChange?: {
      name?: Array<{ message: string }>;
      website?: Array<{ message: string }>;
      email?: Array<{ message: string }>;
      phone?: Array<{ message: string }>;
      message?: Array<{ message: string }>;
      recaptchaToken?: Array<{ message: string }>;
      smsCode?: Array<{ message: string }>;
    };
  };
  const formValues = useStore(store, (state) => state.values) as {
    name: string;
    email: string;
    website: string;
    phone: string;
    message: string;
    plan: string;
    recaptchaToken: string;
    smsCode?: string;
  };

  // SMS verification state
  const [smsCodeSent, setSmsCodeSent] = useState(false);
  const [smsVerified, setSmsVerified] = useState(false);
  const [smsSending, setSmsSending] = useState(false);
  const [smsVerifying, setSmsVerifying] = useState(false);
  const [smsError, setSmsError] = useState<string | null>(null);

  // Check if email requires SMS verification (guarded by feature flag)
  const needsSmsVerification =
    SMS_VERIFICATION_ENABLED && formValues.email
      ? requiresSmsVerification(formValues.email)
      : false;

  // Reset SMS state when email changes
  useEffect(() => {
    if (!needsSmsVerification) {
      setSmsCodeSent(false);
      setSmsVerified(false);
      setSmsError(null);
    } else {
      // If email changed to free domain, reset verification
      setSmsVerified(false);
    }
  }, [needsSmsVerification, formValues.email]);

  const handleSendSmsCode = async () => {
    if (!formValues.phone) {
      setSmsError('Please enter your phone number first');
      return;
    }

    setSmsSending(true);
    setSmsError(null);

    try {
      const res = await fetch('/api/sms/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formValues.phone }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Show specific error message from API
        const errorMessage =
          data.message ||
          (res.status === 400
            ? 'Invalid phone number. Please check and try again.'
            : res.status === 403
              ? 'SMS is not available for this country code.'
              : res.status === 429
                ? 'Too many requests. Please wait before requesting a new code.'
                : 'Failed to send SMS code. Please try again.');
        setSmsError(errorMessage);
        setSmsSending(false);
        return;
      }

      setSmsCodeSent(true);
      setSmsVerified(false); // Reset verification status when sending new code
      setSmsError(null);
    } catch (error) {
      console.error('Error sending SMS code:', error);
      setSmsError('Failed to send SMS code. Please try again.');
    } finally {
      setSmsSending(false);
    }
  };

  const handleVerifySmsCode = async () => {
    if (!formValues.smsCode) {
      setSmsError('Please enter the verification code');
      return;
    }

    setSmsVerifying(true);
    setSmsError(null);

    try {
      const res = await fetch('/api/sms/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formValues.phone, code: formValues.smsCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        // If code not found or expired, allow resending
        if (
          data.message?.includes('No verification code found') ||
          data.message?.includes('expired') ||
          data.message?.includes('Maximum verification attempts exceeded')
        ) {
          setSmsCodeSent(false); // Allow resending
        }
        setSmsError(data.message || 'Invalid verification code');
        setSmsVerifying(false);
        return;
      }

      setSmsVerified(true);
      setSmsError(null);
    } catch (error) {
      console.error('Error verifying SMS code:', error);
      setSmsError('Failed to verify code. Please try again.');
    } finally {
      setSmsVerifying(false);
    }
  };

  const onSubmit = async (data: RequestPricingSchema) => {
    // Check SMS verification for free email domains
    if (needsSmsVerification && !smsVerified) {
      setSmsError('Please verify your phone number with SMS code');
      return;
    }

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
                    <div
                      className={`${st.inputWrapper} ${st.full} ${errors.onChange?.email ? st.error : ''}`}
                    >
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
                    <div
                      className={`${st.inputWrapper} ${st.full} ${errors.onChange?.phone ? st.error : ''}`}
                    >
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
                      {/* SMS verification for free email domains */}
                      {needsSmsVerification && (
                        <div style={{ marginTop: '8px' }}>
                          {!smsCodeSent ? (
                            <>
                              <Button
                                type="button"
                                onClick={handleSendSmsCode}
                                disabled={smsSending || !formValues.phone}
                                variant="secondary"
                              >
                                {smsSending ? 'Sending...' : 'Send SMS'}
                              </Button>
                              {smsError && (
                                <div style={{ marginTop: '8px' }}>
                                  <ErrorMessage>{smsError}</ErrorMessage>
                                </div>
                              )}
                            </>
                          ) : !smsVerified ? (
                            <div>
                              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                <Field name="smsCode">
                                  {(field) => (
                                    <TextField
                                      name={field.name}
                                      placeholder="Enter 6-digit code"
                                      value={String(field.state.value || '')}
                                      onChange={(e) => field.handleChange(e.target.value)}
                                      maxLength={6}
                                      style={{ flex: 1 }}
                                    />
                                  )}
                                </Field>
                                <Button
                                  type="button"
                                  onClick={handleSendSmsCode}
                                  disabled={smsSending || !formValues.phone}
                                  variant="secondary"
                                  style={{ whiteSpace: 'nowrap' }}
                                >
                                  {smsSending ? 'Sending...' : 'Resend Code'}
                                </Button>
                                <Button
                                  type="button"
                                  onClick={handleVerifySmsCode}
                                  disabled={smsVerifying || !formValues.smsCode}
                                >
                                  {smsVerifying ? 'Verifying...' : 'Verify'}
                                </Button>
                              </div>
                              {smsError && (
                                <div style={{ marginBottom: '8px' }}>
                                  <ErrorMessage>{smsError}</ErrorMessage>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div style={{ color: 'green', fontSize: '14px' }}>
                              ✓ Phone number verified
                            </div>
                          )}
                        </div>
                      )}
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
                      {([canSubmit, isSubmitting]) => {
                        // Disable button if SMS verification is required but not completed
                        const isSmsVerificationRequired = needsSmsVerification && !smsVerified;
                        const isDisabled = !canSubmit || isSubmitting || isSmsVerificationRequired;

                        return (
                          <Button disabled={isDisabled} type="submit" fullWidth>
                            {isSubmitting ? 'Loading...' : 'Request'}
                          </Button>
                        );
                      }}
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
