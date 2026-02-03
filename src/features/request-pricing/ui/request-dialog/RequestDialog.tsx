'use client';

import { useEffect, useState } from 'react';

import { Turnstile } from '@marsidev/react-turnstile';
import { Content, Description, Overlay, Portal, Root, Title } from '@radix-ui/react-dialog';
import PhoneInput from 'react-phone-input-2';

import {
  HCAPTCHA_ENABLED,
  RECAPTCHA_ENABLED,
  TURNSTILE_ENABLED,
  TURNSTILE_SITE_KEY,
} from '@/shared/lib/captcha-config';
import { validateEmail } from '@/shared/lib/email-validation';
import { requiresSmsVerification } from '@/shared/lib/email-verification';
import { useForm, useStore } from '@/shared/lib/forms';
import { isValidName } from '@/shared/lib/name-validation';
import { ErrorMessage } from '@/shared/ui/components/error-message';
import { HCaptcha } from '@/shared/ui/components/HCaptcha';
import { Recaptcha } from '@/shared/ui/components/Recaptcha';
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
const SMS_VERIFICATION_ENABLED = true;

// Feature flag: Email validation (set to true to enable email validation)
const EMAIL_VALIDATION_ENABLED = false;

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
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaKey, setCaptchaKey] = useState(0);
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
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
      captchaToken: '',
      smsCode: undefined as string | undefined,
    },
    validators: {
      // @ts-expect-error - Schema type mismatch due to optional smsCode field
      onChange: requestPricingSchema,
    },
    onSubmit: (data) => {
      // Map captchaToken from form values
      const formData = {
        ...data.value,
        captchaToken: (data.value as unknown as { captchaToken: string }).captchaToken || '',
      } as RequestPricingSchema;
      onSubmit(formData);
    },
  });
  const errors = useStore(store, (state) => state.errorMap) as {
    onChange?: {
      name?: Array<{ message: string }>;
      website?: Array<{ message: string }>;
      email?: Array<{ message: string }>;
      phone?: Array<{ message: string }>;
      message?: Array<{ message: string }>;
      captchaToken?: Array<{ message: string }>;
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
    captchaToken: string;
    smsCode?: string;
  };

  // SMS verification state
  const [smsCodeSent, setSmsCodeSent] = useState(false);
  const [smsVerified, setSmsVerified] = useState(false);
  const [smsSending, setSmsSending] = useState(false);
  const [smsVerifying, setSmsVerifying] = useState(false);
  const [smsError, setSmsError] = useState<string | null>(null);

  // Email validation state
  const [emailValidating, setEmailValidating] = useState(false);
  const [emailValidationError, setEmailValidationError] = useState<string | null>(null);

  // Check if email requires SMS verification (guarded by feature flag)
  const needsSmsVerification =
    SMS_VERIFICATION_ENABLED && formValues.email
      ? requiresSmsVerification(formValues.email)
      : false;

  // Reset SMS state when email changes or captcha expires
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

  // Get CSRF token on mount
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const res = await fetch('/api/csrf-token');
        const data = await res.json();
        if (data.token) {
          setCsrfToken(data.token);
        }
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };
    fetchCsrfToken();
  }, []);

  // Reset SMS verification when captcha expires or is cleared
  useEffect(() => {
    if (!captchaToken) {
      setSmsCodeSent(false);
      setSmsVerified(false);
      setSmsError(null);
    }
  }, [captchaToken]);

  const handleSendSmsCode = async () => {
    if (!formValues.phone) {
      setSmsError('Please enter your phone number first');
      return;
    }

    if (!csrfToken) {
      setSmsError('Security token is missing. Please refresh the page and try again.');
      return;
    }

    setSmsSending(true);
    setSmsError(null);

    try {
      // System status is automatically checked and cached in /api/sms/send-code
      const res = await fetch('/api/sms/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formValues.phone, turnstileToken: captchaToken, csrfToken }),
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
      // System status is automatically checked and cached in /api/sms/verify-code
      const res = await fetch('/api/sms/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: formValues.phone,
          code: formValues.smsCode,
          turnstileToken: captchaToken,
        }),
      });

      const data = await res.json();

      // New API returns { verified: boolean, message?: string }
      if (!res.ok || !data.verified) {
        // If code not found or expired, allow resending
        if (
          data.message?.includes('not found') ||
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
    // Check captcha token first
    if (!captchaToken) {
      setSmsError('Please complete the security verification');
      return;
    }

    // Validate email after captcha is passed
    const email = formValues.email?.trim();
    if (!email) {
      setEmailValidationError('Please enter your email address');
      // Reset captcha on failed validation
      setCaptchaToken(null);
      setCaptchaKey((prev) => prev + 1);
      return;
    }

    // Basic email format check
    if (!email.includes('@')) {
      setEmailValidationError('Please enter a valid email address');
      // Reset captcha on failed validation
      setCaptchaToken(null);
      setCaptchaKey((prev) => prev + 1);
      return;
    }

    // Validate email (if enabled)
    if (EMAIL_VALIDATION_ENABLED) {
      setEmailValidating(true);
      setEmailValidationError(null);
      const result = await validateEmail(email);
      console.log('result', result);

      if (!result.isValid) {
        setEmailValidationError(
          result.message || 'Email is not valid. Please use another email address.'
        );
        setEmailValidating(false);
        // Reset captcha on failed validation
        setCaptchaToken(null);
        setCaptchaKey((prev) => prev + 1);
        return;
      }
      setEmailValidationError(null);
      setEmailValidating(false);
    }

    // Check SMS verification for free email domains
    if (needsSmsVerification && !smsVerified) {
      setSmsError('Please verify your phone number with SMS code');
      return;
    }

    // Validate name - if invalid, send to trash route and show success to user
    const name = data.name?.trim() || '';
    const isNameValid = name && isValidName(name);

    if (!isNameValid) {
      // Get honeypot field value from DOM
      const honeypotField = document.querySelector<HTMLInputElement>('input[name="business_url"]');
      const honeypotValue = honeypotField?.value || '';

      const trashBody = {
        ...data,
        business_url: honeypotValue,
        formType: 'pricing_request',
        plan: planTitle,
      };

      // Send to trash route (user won't know)
      await fetch('/api/trash-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trashBody),
        credentials: 'include',
      }).catch(() => {
        // Silently fail - user shouldn't know
      });

      // Show success to user (they think form was submitted successfully)
      setOpen(false);
      setIsThankYouDialogOpen(true);
      setCaptchaToken(null);
      setCaptchaKey((prev) => prev + 1);
      reset();
      return;
    }

    console.log('Form submitted:', data);

    // Get honeypot field value from DOM
    const honeypotField = document.querySelector<HTMLInputElement>('input[name="business_url"]');
    const honeypotValue = honeypotField?.value || '';

    const res = await fetch('/api/request-pricing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        business_url: honeypotValue,
        captchaToken, // Use unified captcha token name
        turnstileToken: TURNSTILE_ENABLED ? captchaToken : undefined, // Backward compatibility
        recaptchaToken: RECAPTCHA_ENABLED ? captchaToken : undefined, // Backward compatibility
      }),
      credentials: 'include', // Include cookies in request
    });

    // If main request failed (bot detected, rate limit, etc.), stop execution
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error('Pricing request blocked or failed:', errorData);
      // Don't close dialog, don't proceed with HubSpot
      return;
    }

    // Get submission code from response
    const responseData = await res.json().catch(() => ({}));
    const submissionCode = responseData.submissionCode;

    if (!submissionCode) {
      console.error('Submission code not received from /api/request-pricing');
      return;
    }

    setOpen(false);
    setIsThankYouDialogOpen(true);
    setCaptchaToken(null);
    setCaptchaKey((prev) => prev + 1); // Reset captcha widget
    reset();

    // Send to HubSpot
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
                      className={`${st.inputWrapper} ${st.full} ${errors.onChange?.email || emailValidationError ? st.error : ''}`}
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
                      {emailValidationError && <ErrorMessage>{emailValidationError}</ErrorMessage>}
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
                      className={`${st.inputWrapper} ${st.full} ${errors.onChange?.captchaToken ? st.error : ''}`}
                    >
                      <Field name="captchaToken">
                        {(field) => (
                          <>
                            {TURNSTILE_ENABLED ? (
                              <Turnstile
                                key={captchaKey}
                                siteKey={TURNSTILE_SITE_KEY}
                                onSuccess={(token) => {
                                  setCaptchaToken(token);
                                  field.handleChange(token);
                                }}
                                onError={() => {
                                  setCaptchaToken(null);
                                  field.handleChange('');
                                }}
                                onExpire={() => {
                                  setCaptchaToken(null);
                                  field.handleChange('');
                                }}
                              />
                            ) : HCAPTCHA_ENABLED ? (
                              <HCaptcha
                                resetKey={captchaKey}
                                onSuccess={(token) => {
                                  setCaptchaToken(token);
                                  field.handleChange(token);
                                }}
                                onError={() => {
                                  setCaptchaToken(null);
                                  field.handleChange('');
                                }}
                                onExpire={() => {
                                  setCaptchaToken(null);
                                  field.handleChange('');
                                }}
                              />
                            ) : RECAPTCHA_ENABLED ? (
                              <Recaptcha
                                resetKey={captchaKey}
                                onSuccess={(token) => {
                                  setCaptchaToken(token);
                                  field.handleChange(token);
                                }}
                                onError={() => {
                                  setCaptchaToken(null);
                                  field.handleChange('');
                                }}
                                onExpire={() => {
                                  setCaptchaToken(null);
                                  field.handleChange('');
                                }}
                              />
                            ) : null}
                          </>
                        )}
                      </Field>
                      {errors.onChange?.captchaToken?.map((err: { message: string }) => (
                        <ErrorMessage key={err.message}>{err.message}</ErrorMessage>
                      ))}
                    </div>
                    {/* SMS verification - only for free email domains, shown after captcha */}
                    {needsSmsVerification && captchaToken && (
                      <div className={`${st.inputWrapper} ${st.full}`}>
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
                  </section>
                  <footer className={st.footer}>
                    <Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                      {([canSubmit, isSubmitting]) => {
                        // Disable button if SMS verification is required but not completed
                        const isSmsVerificationRequired = needsSmsVerification && !smsVerified;
                        const isDisabled = !canSubmit || isSubmitting || isSmsVerificationRequired;

                        return (
                          <Button disabled={isDisabled} type="submit" fullWidth>
                            {isSubmitting || emailValidating ? 'Loading...' : 'Request'}
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
