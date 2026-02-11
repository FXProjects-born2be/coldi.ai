'use client';

import { useEffect, useMemo } from 'react';

import PhoneInput from 'react-phone-input-2';

import { useForm, useStore } from '@/shared/lib/forms';
import { ErrorMessage } from '@/shared/ui/components/error-message';
import { Button } from '@/shared/ui/kit/button';
import { Option } from '@/shared/ui/kit/option';

import { getScenarios } from '../../model/data';
import { type FirstStepCallSchema, firstStepCallSchema } from '../../model/schemas';
import { useRequestCallStore } from '../../store/store';
import st from './FirstStepToCall.module.scss';

import 'react-phone-input-2/lib/style.css';

export const FirstStepToCall = ({
  onSubmit,
}: {
  onSubmit: (data: FirstStepCallSchema) => void;
}) => {
  const scenarios = useMemo(() => getScenarios(), []);
  const { setFirstStepData } = useRequestCallStore();

  // Safe localStorage access - only on client side
  const getStoredData = () => {
    if (typeof window === 'undefined') {
      return {
        scenario: [scenarios[0]],
        phone: '',
        countryCode: '',
      };
    }
    try {
      const stored = localStorage.getItem('CallRequestFirstStepData');
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          scenario: parsed.scenario || [scenarios[0]],
          phone: parsed.phone || '',
          countryCode: parsed.countryCode || '',
        };
      }
    } catch (error) {
      console.error('Error parsing stored data:', error);
    }
    return {
      scenario: [scenarios[0]],
      phone: '',
      countryCode: '',
    };
  };

  const { Field, Subscribe, handleSubmit, store } = useForm({
    defaultValues: getStoredData(),
    validators: {
      onSubmit: firstStepCallSchema,
    },
    onSubmit: (data) => {
      onSubmit(data.value);
      localStorage?.setItem('CallRequestFirstStepData', JSON.stringify(data.value));
      console.log(localStorage?.getItem('CallRequestFirstStepData'));
    },
  });
  const errors = useStore(store, (state) => state.errorMap);

  const formValues = useStore(store, (state) => state.values);

  useEffect(() => {
    console.log(formValues);
    if (formValues) {
      setFirstStepData({
        scenario: Array.isArray(formValues.scenario)
          ? formValues.scenario.join(', ')
          : formValues.scenario,
        phone: formValues.phone,
        countryCode: formValues.countryCode || '',
      });
    }
  }, [formValues, setFirstStepData]);

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
        <header className={st.header}>
          <h2>Mark the call scenarios that you are interested in</h2>
          <span className={st.divider} />
          <Field name="scenario">
            {(field) => (
              <div className={st.optionsContainer}>
                {scenarios.map((scenario) => (
                  <Option
                    key={scenario}
                    selected={field.state.value.includes(scenario)}
                    onClick={() => {
                      const currentValue = field.state.value;
                      if (currentValue.includes(scenario)) {
                        field.handleChange(currentValue.filter((s: string) => s !== scenario));
                      } else {
                        field.handleChange([...currentValue, scenario]);
                      }
                    }}
                  >
                    {scenario}
                  </Option>
                ))}
              </div>
            )}
          </Field>
        </header>
        <Field name="phone">
          {(field) => (
            <Field name="countryCode">
              {(countryCodeField) => (
                <div className={st.phoneInputContainer}>
                  <PhoneInput
                    country={'us'}
                    value={String(field.state.value)}
                    onChange={(phone, country) => {
                      field.handleChange(phone);
                      if (country && typeof country === 'object' && 'dialCode' in country) {
                        const dialCode = `+${country.dialCode}`;
                        countryCodeField.handleChange(dialCode);
                      }
                    }}
                    onBlur={field.handleBlur}
                    placeholder="Phone Number"
                    inputClass={`${st.phoneInput} ${errors.onSubmit?.phone ? st.error : ''}`}
                    buttonClass={st.phoneInputButton}
                    dropdownClass={st.phoneInputDropdown}
                    enableSearch={true}
                    searchPlaceholder="Search country..."
                    autoFormat={true}
                  />
                  {errors.onSubmit?.phone?.map((err) => (
                    <ErrorMessage key={err.message}>{err.message}</ErrorMessage>
                  ))}
                </div>
              )}
            </Field>
          )}
        </Field>

        <Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button disabled={!canSubmit || isSubmitting} type="submit" fullWidth>
              {isSubmitting ? 'Loading...' : 'Next'}
            </Button>
          )}
        </Subscribe>
      </form>
    </section>
  );
};
