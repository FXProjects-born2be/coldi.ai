import { v } from '@/shared/lib/forms';

export const requestPricingSchema = v.object({
  phone: v.pipe(v.string(), v.minLength(1, 'Please provide a valid phone number')),
  turnstileToken: v.pipe(v.string(), v.minLength(1, 'Please complete the security verification.')),
});

export type RequestPricingSchema = v.InferOutput<typeof requestPricingSchema>;
