import { create } from 'zustand';

type FirstStepData = {
  scenario: string;
  phone: string;
  countryCode: string;
};

export type Agent = 'Sophie' | 'George' | 'Kate';

type RequestCallStore = {
  firstStepData: FirstStepData;
  hasFirstStepData: boolean;
  setFirstStepData: (data: Partial<FirstStepData>) => void;
  resetFirstStepData: () => void;
  agent: Agent;
  setAgent: (agent: Agent) => void;
};

export const useRequestCallStore = create<RequestCallStore>((set, get) => ({
  firstStepData: {
    scenario: '',
    phone: '',
    countryCode: '',
  },
  agent: 'Kate',
  hasFirstStepData: false,
  setFirstStepData: (data) => {
    const newData = { ...get().firstStepData, ...data };
    const hasData = newData.scenario.trim() !== '' || newData.phone.trim() !== '';

    set({
      firstStepData: newData,
      hasFirstStepData: hasData,
    });
  },
  setAgent: (agent: Agent) => {
    set({ agent });
    console.log(agent);
  },
  resetFirstStepData: () => {
    set({
      firstStepData: {
        scenario: '',
        phone: '',
        countryCode: '',
      },
      hasFirstStepData: false,
    });
  },
}));
