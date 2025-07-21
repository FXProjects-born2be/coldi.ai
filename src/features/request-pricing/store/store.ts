import { create } from 'zustand';

type RequestPricingStore = {
  plan: string;
  setPlan: (plan: string) => void;
};

export const useRequestPricingStore = create<RequestPricingStore>((set) => ({
  plan: '',
  setPlan: (plan) => {
    set({ plan });
  },
}));
