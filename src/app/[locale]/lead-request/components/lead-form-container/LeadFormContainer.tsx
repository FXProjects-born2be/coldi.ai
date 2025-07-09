'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import type {
  FirstLeadStepSchema,
  SecondLeadStepSchema,
} from '@/features/request-lead/model/schemas';
import { FirstLeadStep } from '@/features/request-lead/ui/first-lead-step';
import { SecondLeadStep } from '@/features/request-lead/ui/second-lead-step';
import { ThankYouDialog } from '@/features/request-lead/ui/thank-you-dialog';

import st from './LeadFormContainer.module.scss';

export const LeadFormContainer = () => {
  const [step, setStep] = useState(2);
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState<FirstLeadStepSchema & SecondLeadStepSchema>({
    company: '',
    email: '',
    fullName: '',
    phone: '',
    industry: '',
    monthlyLeadVolume: '',
    primaryGoal: [],
    message: '',
  });

  const router = useRouter();

  const firstStepHandle = (diff: FirstLeadStepSchema) => {
    setStep(2);
    setData({ ...data, ...diff });
  };

  const secondStepHandle = (diff: SecondLeadStepSchema) => {
    setData({ ...data, ...diff });
    setIsSuccess(true);
  };

  const onCloseHandle = () => {
    setIsSuccess(false);
    router.push('/');
  };

  return (
    <section className={st.layout}>
      <h2>Request Your Custom Coldi Solution</h2>
      <div className={st.lines}>
        <span className={st.activeLine}></span>
        <span className={step === 2 ? st.activeLine : st.passiveLine}></span>
      </div>
      {step === 1 && <FirstLeadStep onSubmit={firstStepHandle} />}
      {step === 2 && <SecondLeadStep onSubmit={secondStepHandle} />}
      <ThankYouDialog open={isSuccess} onClose={onCloseHandle} />
    </section>
  );
};
