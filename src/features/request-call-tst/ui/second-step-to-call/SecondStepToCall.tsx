'use client';

import { type ReactNode, useEffect, useState } from 'react';

import { Turnstile } from '@marsidev/react-turnstile';

import { validateEmail } from '@/shared/lib/email-validation';
import { requiresSmsVerification } from '@/shared/lib/email-verification';
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

// Feature flag: SMS verification (temporary off; set to true to re-enable)
const SMS_VERIFICATION_ENABLED = true;

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
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  console.log('botName', botName);
  const { Field, Subscribe, handleSubmit, store } = useForm({
    defaultValues: {
      name: '',
      email: '',
      industry: '',
      company: '',
      turnstileToken: '',
      smsCode: undefined as string | undefined,
    },
    validators: {
      // @ts-expect-error Schema marks smsCode optional; form typing treats it as present
      onSubmit: secondStepCallSchema,
    },
    onSubmit: async (data) => {
      // Check email validation
      if (isEmailValid === false || emailValidating) {
        if (emailValidating) {
          setEmailValidationError('Please wait while we validate your email...');
        }
        return;
      }

      // If email validation hasn't completed yet, validate it now
      if (isEmailValid === null && formValues.email) {
        setEmailValidating(true);
        const result = await validateEmail(formValues.email);
        setIsEmailValid(result.isValid);
        if (!result.isValid) {
          setEmailValidationError(
            result.message || 'Email is not valid. Please use another email address.'
          );
          setEmailValidating(false);
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

      // Check Turnstile token
      if (!turnstileToken) {
        console.error('Turnstile token is missing');
        return;
      }

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
        credentials: 'include', // Include cookies in request
      });

      // If main request failed (bot detected, rate limit, etc.), stop execution
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error('Call request blocked or failed:', errorData);
        // Don't proceed with Retell, HubSpot, or show success dialog
        return;
      }

      // Get submission code from response
      const responseData = await res.json().catch(() => ({}));
      const submissionCode = responseData.submissionCode;

      if (!submissionCode) {
        console.error('Submission code not received from /api/request-call');
        return;
      }

      console.log('Call request sent successfully');

      // Send to Retell (phone number will be determined automatically based on system status)
      const retellPayload = {
        name: data.value.name,
        email: data.value.email,
        phone: firstStepData.phone,
        industry: data.value.industry,
        company: data.value.company,
        agent,
        countryCode: firstStepData.countryCode,
        submissionCode,
      };
      console.log('Retell payload:', retellPayload);

      const retellRes = await fetch('/api/retell-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(retellPayload),
        credentials: 'include', // Include cookies in request
      });
      console.log('Retell response:', retellRes);
      if (retellRes.ok) {
        console.log('Retell call request sent successfully');
      } else {
        console.error('Failed to send retell call request');
      }

      // Send to HubSpot
      console.log('Hubspot payload:', hubspotPayload);

      const hubspotRes = await fetch('/api/hubspot-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...hubspotPayload,
          submissionCode,
          email: data.value.email,
          phone: firstStepData.phone,
        }),
        credentials: 'include', // Include cookies in request
      });
      console.log('Hubspot response:', hubspotRes);
      if (hubspotRes.ok) {
        console.log('Hubspot call request sent successfully');
      } else {
        const error = await hubspotRes.json();
        console.error('Failed to send hubspot call request', error);
      }

      // Show success dialog
      if (!isSupported) {
        // Show unsupported country dialog
        onUnsupportedCountry();
      } else {
        // Show success dialog for supported countries
        onSubmit(data.value);
      }

      // Reset Turnstile after successful submission
      setTurnstileToken(null);
      setTurnstileKey((prev) => prev + 1);
    },
  });
  const errors = useStore(store, (state) => state.errorMap) as {
    onSubmit?: {
      name?: Array<{ message: string }>;
      email?: Array<{ message: string }>;
      smsCode?: Array<{ message: string }>;
      industry?: Array<{ message: string }>;
      company?: Array<{ message: string }>;
      turnstileToken?: Array<{ message: string }>;
    };
  };
  const formValues = useStore(store, (state) => state.values) as {
    name: string;
    email: string;
    smsCode?: string;
    industry: string;
    company: string;
    turnstileToken: string;
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
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);

  // Check if email requires SMS verification (guarded by feature flag)
  const needsSmsVerification =
    SMS_VERIFICATION_ENABLED && formValues.email
      ? requiresSmsVerification(formValues.email)
      : false;

  // Validate email when it changes
  useEffect(() => {
    const email = formValues.email?.trim();

    // Reset validation state if email is empty
    if (!email) {
      setIsEmailValid(null);
      setEmailValidationError(null);
      return;
    }

    // Basic email format check
    if (!email.includes('@')) {
      setIsEmailValid(false);
      setEmailValidationError('Please enter a valid email address');
      return;
    }

    // Debounce email validation
    const timeoutId = setTimeout(async () => {
      setEmailValidating(true);
      setEmailValidationError(null);

      const result = await validateEmail(email);

      setIsEmailValid(result.isValid);
      if (!result.isValid) {
        setEmailValidationError(
          result.message || 'Email is not valid. Please use another email address.'
        );
      } else {
        setEmailValidationError(null);
      }

      setEmailValidating(false);
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(timeoutId);
  }, [formValues.email]);

  // Reset SMS state when email changes or captcha expires
  useEffect(() => {
    if (!needsSmsVerification) {
      setSmsCodeSent(false);
      setSmsVerified(false);
      setSmsError(null);
    } else {
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
    if (!turnstileToken) {
      setSmsCodeSent(false);
      setSmsVerified(false);
      setSmsError(null);
    }
  }, [turnstileToken]);

  const handleSendSmsCode = async () => {
    if (!firstStepData.phone) {
      setSmsError('Please enter your phone number on step 1');
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
      console.log('[SMS Send] Using phone:', firstStepData.phone);
      const res = await fetch('/api/sms/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: firstStepData.phone, turnstileToken, csrfToken }),
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
      setSmsVerified(false);
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

    if (!firstStepData.phone) {
      setSmsError('Phone number is missing. Please go back to step 1 and enter your phone number.');
      return;
    }

    setSmsVerifying(true);
    setSmsError(null);

    try {
      // System status is automatically checked and cached in /api/sms/verify-code
      console.log('[SMS Verify] Using phone:', firstStepData.phone);
      const res = await fetch('/api/sms/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: firstStepData.phone,
          code: formValues.smsCode,
          turnstileToken,
        }),
      });

      const data = await res.json();

      // New API returns { verified: boolean, message?: string }
      if (!res.ok || !data.verified) {
        if (
          data.message?.includes('not found') ||
          data.message?.includes('expired') ||
          data.message?.includes('Maximum verification attempts exceeded')
        ) {
          setSmsCodeSent(false);
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
            <div
              className={`${st.inputWrapper} ${errors.onSubmit?.email || emailValidationError ? st.error : ''}`}
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
              {errors.onSubmit?.email?.map((err) => (
                <ErrorMessage key={err.message}>{err.message}</ErrorMessage>
              ))}
              {emailValidating && (
                <div style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>
                  Validating email...
                </div>
              )}
              {emailValidationError && !emailValidating && (
                <ErrorMessage>{emailValidationError}</ErrorMessage>
              )}
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
          {/* SMS verification - only for free email domains, shown after captcha */}
          {needsSmsVerification && turnstileToken && (
            <div className={st.inputWrapper}>
              {!smsCodeSent ? (
                <>
                  <Button
                    type="button"
                    onClick={handleSendSmsCode}
                    disabled={smsSending || !firstStepData.phone}
                    variant="secondary"
                  >
                    {smsSending ? 'Sending...' : 'Send SMS'}
                  </Button>
                  {smsError && (
                    <div style={{ marginBottom: '8px' }}>
                      <ErrorMessage>{smsError}</ErrorMessage>
                    </div>
                  )}
                </>
              ) : !smsVerified ? (
                <div style={{ width: '100%' }}>
                  <div className={st.smsCodeInputWrapper}>
                    <Field name="smsCode">
                      {(smsField) => (
                        <TextField
                          name={smsField.name}
                          placeholder="Enter 6-digit code"
                          value={String(smsField.state.value || '')}
                          onChange={(e) => smsField.handleChange(e.target.value)}
                          maxLength={6}
                          style={{ flex: 1 }}
                        />
                      )}
                    </Field>
                    <Button
                      type="button"
                      onClick={handleSendSmsCode}
                      disabled={smsSending || !firstStepData.phone}
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
                <div style={{ color: 'green', fontSize: '14px' }}>✓ Phone number verified</div>
              )}
            </div>
          )}
        </section>
        <footer className={st.footer}>
          <Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) => {
              // Disable button if SMS verification is required but not completed
              const isSmsVerificationRequired = needsSmsVerification && !smsVerified;
              // Disable button if email is invalid or validating
              const isEmailInvalid = isEmailValid === false || emailValidating;
              const isDisabled =
                !canSubmit || isSubmitting || isSmsVerificationRequired || isEmailInvalid;
              return (
                <Button disabled={isDisabled} type="submit" fullWidth>
                  {isSubmitting ? 'Loading...' : 'Next'}
                </Button>
              );
            }}
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
