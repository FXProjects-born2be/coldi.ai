import { create } from 'zustand';

type FirstStepData = {
  scenario: string;
  phone: string;
};

export type Agent = 'Sophie' | 'Monica' | 'Victoria';

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
  },
  agent: 'Sophie',
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
  },
  resetFirstStepData: () => {
    set({
      firstStepData: {
        scenario: '',
        phone: '',
      },
      hasFirstStepData: false,
    });
  },
}));
