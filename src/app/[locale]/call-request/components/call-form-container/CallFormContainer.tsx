'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

import type {
  FirstStepCallSchema,
  SecondStepCallSchema,
} from '@/features/request-call/model/schemas';
import type { Agent } from '@/features/request-call/store/store';
import { useRequestCallStore } from '@/features/request-call/store/store';
import { FirstStepToCall } from '@/features/request-call/ui/first-step-to-call';
import { SecondStepToCall } from '@/features/request-call/ui/second-step-to-call';
import { StillLikeGetCall } from '@/features/request-call/ui/still-like-get-call';
import { getVoices } from '@/features/voices/model/voices';

import st from './CallFormContainer.module.scss';

const ThankYouDialog = dynamic(
  () => import('@/features/request-call/ui/thank-you-dialog').then((mod) => mod.ThankYouDialog),
  { ssr: false }
);

export const CallFormContainer = ({ botName = 'Sana' }: { botName?: string }) => {
  const [step, setStep] = useState(1);
  const { setAgent } = useRequestCallStore();
  const [data, setData] = useState<FirstStepCallSchema & SecondStepCallSchema>({
    scenario: [],
    phone: '',
    name: '',
    email: '',
    industry: '',
    company: '',
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const router = useRouter();

  const activeBot = getVoices().find((bot) => bot.name === botName);

  const firstStepHandle = (diff: FirstStepCallSchema) => {
    setData({ ...data, ...diff });
    setStep(2);
  };

  const secondStepHandle = (diff: SecondStepCallSchema) => {
    setData({ ...data, ...diff });
    setIsSuccess(true);
  };

  const onContinueHandle = () => {
    setIsSuccess(false);
    router.push('/');
  };

  useEffect(() => {
    setAgent(botName as Agent);
  }, [botName, setAgent]);

  return (
    <section className={st.layout}>
      <h1>
        Get your call from <br /> <span className={st.selected}>{activeBot?.name}</span>
      </h1>
      <div className={st.lines}>
        <div className={st.activeLine} />
        <div className={step === 1 ? st.passiveLine : st.activeLine} />
      </div>
      {step === 1 && <FirstStepToCall onSubmit={(data) => firstStepHandle(data)} />}
      {step === 2 && (
        <SecondStepToCall
          botName={activeBot?.name ?? ''}
          onSubmit={(data) => secondStepHandle(data)}
        />
      )}
      <ThankYouDialog open={isSuccess} onClose={onContinueHandle} />
      <StillLikeGetCall />
    </section>
  );
};
