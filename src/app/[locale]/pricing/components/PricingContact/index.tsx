'use client';

import { useState } from 'react';
import Image from 'next/image';

import { useTranslations } from 'next-intl';

import { useForm, v } from '@/shared/lib/forms';
import { cn } from '@/shared/lib/helpers';
import { ErrorMessage } from '@/shared/ui/components/error-message';

import st from './PricingContact.module.scss';

export const PricingContact = () => {
  const t = useTranslations('PricingContact');
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const contactSchema = v.object({
    email: v.pipe(v.string(), v.minLength(1), v.email()),
  });

  const { Field, Subscribe, handleSubmit, reset } = useForm({
    defaultValues: { email: '' },
    validators: { onSubmit: contactSchema },
    onSubmit: async ({ value }) => {
      setSubmitError('');

      try {
        const res = await fetch('/api/leads-book-demo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: value.email }),
          credentials: 'include',
        });

        if (!res.ok) throw new Error('submit');

        reset();
        setIsSuccess(true);
      } catch {
        setSubmitError(t('errors.submit'));
      }
    },
  });

  return (
    <section className={st.pricing_contact}>
      <div className="container">
        <div className={st.pricing_contact__row}>
          <div className={st.pricing_contact__content}>
            <p className={st.pricing_contact__eyebrow}>{t('eyebrow')}</p>
            <h2 className={st.pricing_contact__title}>{t('title')}</h2>

            {isSuccess ? (
              <p className={st.pricing_contact__success}>{t('success')}</p>
            ) : (
              <form
                className={st.pricing_contact__form}
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleSubmit().catch(console.error);
                }}
              >
                <Field name="email">
                  {(field) => (
                    <div className={st.pricing_contact__field}>
                      <input
                        className={cn(
                          st.pricing_contact__input,
                          field.state.meta.errors.length && st.pricing_contact__input_error
                        )}
                        name={field.name}
                        type="email"
                        placeholder={t('emailPlaceholder')}
                        value={String(field.state.value ?? '')}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </div>
                  )}
                </Field>

                {submitError ? <ErrorMessage>{submitError}</ErrorMessage> : null}

                <Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                  {([canSubmit, isSubmitting]) => (
                    <button
                      type="submit"
                      disabled={!canSubmit || isSubmitting}
                      className={cn('btn', 'btn-secondary', st.pricing_contact__btn)}
                    >
                      {isSubmitting ? t('sending') : t('send')}
                    </button>
                  )}
                </Subscribe>
              </form>
            )}
          </div>

          <div className={st.pricing_contact__visual} aria-hidden>
            <div className={st.pricing_contact__sphere}>
              <div className={st.pricing_contact__sphere_bg} />
            </div>
            <div className={st.pricing_contact__logo}>
              <span className={st.pricing_contact__logo_dim} />
              <Image
                src="/images/pricing/contact-logo.svg"
                alt="Icon"
                width={86}
                height={86}
                loading={'lazy'}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
