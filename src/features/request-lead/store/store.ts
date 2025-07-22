import { create } from 'zustand';

type FirstStepData = {
  fullName: string;
  company: string;
  email: string;
  phone: string;
};

type RequestLeadStore = {
  firstStepData: FirstStepData;
  hasFirstStepData: boolean;
  setFirstStepData: (data: Partial<FirstStepData>) => void;
  resetFirstStepData: () => void;
};

export const useRequestLeadStore = create<RequestLeadStore>((set, get) => ({
  firstStepData: {
    fullName: '',
    company: '',
    email: '',
    phone: '',
  },
  hasFirstStepData: false,
  setFirstStepData: (data) => {
    const newData = { ...get().firstStepData, ...data };
    const hasData =
      newData.fullName.trim() !== '' ||
      newData.company.trim() !== '' ||
      newData.email.trim() !== '' ||
      newData.phone.trim() !== '';

    set({
      firstStepData: newData,
      hasFirstStepData: hasData,
    });
  },
  resetFirstStepData: () => {
    set({
      firstStepData: {
        fullName: '',
        company: '',
        email: '',
        phone: '',
      },
      hasFirstStepData: false,
    });
  },
}));
