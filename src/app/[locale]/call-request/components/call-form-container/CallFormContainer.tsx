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

const UnsupportedCountryDialog = dynamic(
  () =>
    import('@/features/request-call/ui/unsupported-country-dialog').then(
      (mod) => mod.UnsupportedCountryDialog
    ),
  { ssr: false }
);

export const CallFormContainer = ({ botName = 'Sophie' }: { botName?: string }) => {
  const [step, setStep] = useState(1);
  const { agent, setAgent } = useRequestCallStore();
  const [data, setData] = useState<FirstStepCallSchema & SecondStepCallSchema>({
    scenario: [],
    phone: '',
    countryCode: '',
    name: '',
    email: '',
    industry: '',
    company: '',
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isUnsupportedCountry, setIsUnsupportedCountry] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const bots = getVoices().map((bot) => bot.name as Agent);

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
    setIsUnsupportedCountry(false);
    router.push('/');
  };

  const handleBotSelect = (bot: Agent) => {
    setAgent(bot);
    setDropdownOpen(false);
  };

  useEffect(() => {
    setAgent(botName as Agent);
  }, [botName, setAgent]);

  return (
    <section className={st.layout}>
      <h1>
        Get your call from <br />
        <span
          className={st.selected}
          style={{ cursor: 'pointer', position: 'relative', display: 'inline-block' }}
          onClick={() => setDropdownOpen((v) => !v)}
        >
          {agent} <span className={st.arrow}>▼</span>
          {dropdownOpen && (
            <ul
              style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#fff',
                border: '1px solid #eee',
                borderRadius: '8px',
                zIndex: 10,
                minWidth: 120,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                listStyle: 'none',
                margin: 0,
                padding: 0,
              }}
            >
              {bots.map((bot) => (
                <li
                  key={bot}
                  style={{
                    padding: '8px 16px',
                    background: bot === agent ? '#f0f0f0' : undefined,
                    fontWeight: bot === agent ? 'bold' : undefined,
                    cursor: 'pointer',
                    fontSize: '18px',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBotSelect(bot);
                  }}
                >
                  {bot}
                </li>
              ))}
            </ul>
          )}
        </span>
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
          onUnsupportedCountry={() => setIsUnsupportedCountry(true)}
        />
      )}
      <ThankYouDialog open={isSuccess} onClose={onContinueHandle} />
      <UnsupportedCountryDialog open={isUnsupportedCountry} onClose={onContinueHandle} />
      <StillLikeGetCall />
    </section>
  );
};
