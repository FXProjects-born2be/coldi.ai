import { create } from 'zustand';

type FirstStepData = {
  scenario: string;
  phone: string;
};

type RequestCallStore = {
  firstStepData: FirstStepData;
  hasFirstStepData: boolean;
  setFirstStepData: (data: Partial<FirstStepData>) => void;
  resetFirstStepData: () => void;
};

export const useRequestCallStore = create<RequestCallStore>((set, get) => ({
  firstStepData: {
    scenario: '',
    phone: '',
  },
  hasFirstStepData: false,
  setFirstStepData: (data) => {
    const newData = { ...get().firstStepData, ...data };
    const hasData = newData.scenario.trim() !== '' || newData.phone.trim() !== '';

    set({
      firstStepData: newData,
      hasFirstStepData: hasData,
    });
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
