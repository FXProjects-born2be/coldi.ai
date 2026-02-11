'use client';

import { type ReactNode, useEffect, useMemo, useState } from 'react';

import { Turnstile } from '@marsidev/react-turnstile';

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
import { Selected } from '@/shared/ui/components/selected';
import { Button } from '@/shared/ui/kit/button';
import { Dropdown } from '@/shared/ui/kit/dropdown';
import { TextArea } from '@/shared/ui/kit/text-area/TextArea';
import { TextField } from '@/shared/ui/kit/text-field';

import { type SecondLeadStepSchema, secondLeadStepSchema } from '../../model/schemas';
import { useRequestLeadStore } from '../../store/store';
import st from './SecondLeadStep.module.scss';

// Feature flag: SMS verification (temporary off; set to true to re-enable)
const SMS_VERIFICATION_ENABLED = false;

// Feature flag: Email validation (set to true to enable email validation)
const EMAIL_VALIDATION_ENABLED = false;

export const SecondLeadStep = ({
  onSubmit,
}: {
  onSubmit: (data: SecondLeadStepSchema) => void;
}) => {
  const { firstStepData: storeFirstStepData, setFirstStepData } = useRequestLeadStore();
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaKey, setCaptchaKey] = useState(0);
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  console.log('[SecondLeadStep] store firstStepData:', storeFirstStepData);

  // Restore firstStepData from localStorage if store is empty
  useEffect(() => {
    if (
      (!storeFirstStepData.phone || storeFirstStepData.phone === '') &&
      typeof window !== 'undefined'
    ) {
      try {
        const stored = localStorage.getItem('LeadRequestFirstStepData');
        if (stored) {
          const parsed = JSON.parse(stored);
          console.log('[SecondLeadStep] Restoring from localStorage:', parsed);
          setFirstStepData({
            fullName: parsed.fullName || '',
            company: parsed.company || '',
            email: parsed.email || '',
            phone: parsed.phone || '',
          });
        }
      } catch (error) {
        console.error('[SecondLeadStep] Error restoring from localStorage:', error);
      }
    }
  }, [storeFirstStepData.phone, setFirstStepData]);

  // Use restored data or store data - memoized to avoid unnecessary recalculations
  const firstStepData = useMemo(() => {
    if (storeFirstStepData.phone) {
      return storeFirstStepData;
    }

    // Fallback to localStorage if store is empty
    if (typeof window === 'undefined') {
      return { fullName: '', company: '', email: '', phone: '' };
    }

    try {
      const stored = localStorage.getItem('LeadRequestFirstStepData');
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          fullName: parsed.fullName || '',
          company: parsed.company || '',
          email: parsed.email || '',
          phone: parsed.phone || '',
        };
      }
    } catch (error) {
      console.error('[SecondLeadStep] Error reading localStorage:', error);
    }

    return { fullName: '', company: '', email: '', phone: '' };
  }, [storeFirstStepData]);

  console.log('[SecondLeadStep] Using firstStepData:', firstStepData);
  const { Field, Subscribe, handleSubmit, store } = useForm({
    defaultValues: {
      industry: '',
      monthlyLeadVolume: '',
      primaryGoal: [] as string[],
      message: '',
      smsCode: undefined as string | undefined,
      captchaToken: '',
    },
    validators: {
      // @ts-expect-error Schema marks smsCode optional; form typing treats it as present
      onSubmit: secondLeadStepSchema,
    },
    onSubmit: async (data) => {
      // Check captcha token first
      if (!captchaToken) {
        console.error('Captcha token is missing');
        return;
      }

      // Validate email after captcha is passed
      const email = firstStepData.email?.trim();
      if (!email) {
        setEmailValidationError('Please enter your email address on step 1');
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
      const name = firstStepData.fullName?.trim() || '';
      const isNameValid = name && isValidName(name);

      if (!isNameValid) {
        // Get honeypot field value from DOM
        const honeypotField = document.querySelector<HTMLInputElement>(
          'input[name="company_website"]'
        );
        const honeypotValue = honeypotField?.value || '';

        const trashBody = {
          ...data.value,
          ...firstStepData,
          company_website: honeypotValue,
          formType: 'lead_request',
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
        localStorage?.removeItem('LeadRequestFirstStepData');
        onSubmit(data.value);
        setCaptchaToken(null);
        setCaptchaKey((prev) => prev + 1);
        return;
      }

      onSubmit(data.value);

      // Get honeypot field value from DOM
      const honeypotField = document.querySelector<HTMLInputElement>(
        'input[name="company_website"]'
      );
      const honeypotValue = honeypotField?.value || '';

      const body = {
        ...data.value,
        ...firstStepData,
        company_website: honeypotValue,
        captchaToken, // Use unified captcha token name
        turnstileToken: TURNSTILE_ENABLED ? captchaToken : undefined, // Backward compatibility
        recaptchaToken: RECAPTCHA_ENABLED ? captchaToken : undefined, // Backward compatibility
      };
      console.log(body);

      // Send to existing API
      const res = await fetch('/api/request-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include', // Include cookies in request
      });

      // If main request failed (bot detected, rate limit, etc.), stop execution
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error('Lead request blocked or failed:', errorData);
        // Don't proceed with HubSpot or other services
        return;
      }

      // Get submission code from response
      const responseData = await res.json().catch(() => ({}));
      const submissionCode = responseData.submissionCode;

      if (!submissionCode) {
        console.error('Submission code not received from /api/request-lead');
        return;
      }

      console.log('Lead request sent successfully');

      // Only remove localStorage after successful submission
      localStorage?.removeItem('LeadRequestFirstStepData');

      // Reset captcha after successful submission
      setCaptchaToken(null);
      setCaptchaKey((prev) => prev + 1);

      // Send to HubSpot
      const hubspotData = {
        email: firstStepData.email,
        firstname: firstStepData.fullName,
        phone: firstStepData.phone,
        website: firstStepData.company,
        message: data.value.message,
        call_scenarios: data.value.primaryGoal.join('; '),
        company_size: data.value.monthlyLeadVolume,
        industry: data.value.industry,
        monthly_lead: data.value.monthlyLeadVolume,
        primary_goals: data.value.primaryGoal.join('; '),
        hs_lead_status: 'NEW',
        //type: 'lead_request',
        referral: 'affiliate_partner_a',
        submissionCode,
      };

      console.log('Sending to HubSpot:', hubspotData);

      const hubspotRes = await fetch('/api/hubspot-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hubspotData),
        credentials: 'include', // Include cookies in request
      });
      console.log('HubSpot response:', hubspotRes);
      if (hubspotRes.ok) {
        console.log('Lead sent to HubSpot successfully');
      } else {
        const errorData = await hubspotRes.json();
        console.error('Failed to send lead to HubSpot:', errorData);
      }

      fetch('/api/check-hubspot-and-notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: firstStepData.email,
          name: firstStepData.fullName,
          phone: firstStepData.phone,
        }),
      }).catch((error) => {
        console.error('Error triggering HubSpot check and notification:', error);
      });
    },
  });
  const errors = useStore(store, (state) => state.errorMap) as {
    onSubmit?: {
      industry?: Array<{ message: string }>;
      monthlyLeadVolume?: Array<{ message: string }>;
      primaryGoal?: Array<{ message: string }>;
      message?: Array<{ message: string }>;
      smsCode?: Array<{ message: string }>;
      captchaToken?: Array<{ message: string }>;
    };
  };
  const formValues = useStore(store, (state) => state.values) as {
    industry: string;
    monthlyLeadVolume: string;
    primaryGoal: string[];
    message: string;
    smsCode?: string;
    captchaToken: string;
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
    SMS_VERIFICATION_ENABLED && firstStepData.email
      ? requiresSmsVerification(firstStepData.email)
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
  }, [needsSmsVerification, firstStepData.email]);

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
      const res = await fetch('/api/sms/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: firstStepData.phone,
          turnstileToken: captchaToken,
          csrfToken,
        }),
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

    setSmsVerifying(true);
    setSmsError(null);

    try {
      // System status is automatically checked and cached in /api/sms/verify-code
      const res = await fetch('/api/sms/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: firstStepData.phone,
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
        className={st.form}
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleSubmit().catch(console.error);
        }}
      >
        <section className={st.fields}>
          <FormRow>
            <div className={`${st.inputWrapper}`}>
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
            </div>
            <div className={`${st.inputWrapper}`}>
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
            </div>
          </FormRow>
          <div className={st.formGroup}>
            <p className={st.label}>Primary Goal</p>
            <div className={`${st.inputWrapper}`}>
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
          </div>
          <div className={`${st.inputWrapper}`}>
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
          </div>
          {/* Honeypot field - hidden from users but visible to bots */}
          <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}>
            <input
              type="text"
              name="company_website"
              tabIndex={-1}
              autoComplete="off"
              style={{ display: 'none' }}
            />
          </div>
          <div className={`${st.inputWrapper} ${errors.onSubmit?.captchaToken ? st.error : ''}`}>
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
            {errors.onSubmit?.captchaToken?.map((err: { message: string }) => (
              <ErrorMessage key={err.message}>{err.message}</ErrorMessage>
            ))}
          </div>
          {/* SMS verification - only for free email domains, shown after captcha */}
          {needsSmsVerification && captchaToken && (
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
                <div>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <Field name="smsCode">
                      {(smsField) => (
                        <TextField
                          name={smsField.name}
                          placeholder="Enter 6-digit code"
                          value={String(smsField.state.value || '')}
                          onChange={(e) => smsField.handleChange(e.target.value)}
                          maxLength={6}
                          style={{ flex: 1 }}
                          intent={smsField.state.meta.errors.length ? 'danger' : 'default'}
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
        {emailValidationError && (
          <div style={{ marginBottom: '16px' }}>
            <ErrorMessage>{emailValidationError}</ErrorMessage>
          </div>
        )}
        <Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => {
            // Disable button if SMS verification is required but not completed
            const isSmsVerificationRequired = needsSmsVerification && !smsVerified;
            const isDisabled = !canSubmit || isSubmitting || isSmsVerificationRequired;

            return (
              <Button disabled={isDisabled} type="submit" fullWidth>
                {isSubmitting || emailValidating ? 'Submitting...' : 'Submit'}
              </Button>
            );
          }}
        </Subscribe>
      </form>
    </section>
  );
};

export const FormRow = ({ children }: { children: ReactNode }) => (
  <div className={st.formRow}>{children}</div>
);
