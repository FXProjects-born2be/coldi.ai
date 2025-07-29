import { create } from 'zustand';

type RequestPricingStore = {
  plan: { label: string; title: string; price: string };
  setPlan: (plan: { label: string; title: string; price: string }) => void;
};

export const useRequestPricingStore = create<RequestPricingStore>((set) => ({
  plan: { label: '', title: '', price: '' },
  setPlan: (plan) => {
    set({ plan });
  },
}));
