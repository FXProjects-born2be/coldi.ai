import { v } from '@/shared/lib/forms';

export const requestPricingSchema = v.object({
  name: v.pipe(v.string(), v.minLength(1, 'Please introduce yourself')),
  website: v.pipe(v.string(), v.minLength(1, 'Please provide your website')),
  email: v.pipe(v.string(), v.email('Please enter a valid email to proceed')),
  phone: v.pipe(v.string(), v.minLength(1, 'Please provide a valid phone number')),
  message: v.pipe(v.string()),
  plan: v.pipe(v.string()),
  captchaToken: v.pipe(v.string(), v.minLength(1, 'Please complete the security verification.')),
  smsCode: v.optional(v.string()), // SMS verification code for free email domains
});

export type RequestPricingSchema = v.InferOutput<typeof requestPricingSchema>;
