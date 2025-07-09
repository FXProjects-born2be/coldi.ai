import { v } from '@/shared/lib/forms';
import { isPhoneValid } from '@/shared/lib/validation';

export const firstStepCallSchema = v.object({
  scenario: v.pipe(v.string(), v.minLength(1, 'Please select a scenario')),
  phone: v.pipe(
    v.string(),
    v.minLength(1, 'Please provide your phone number'),
    v.custom((value) => isPhoneValid(String(value)), 'Please enter a valid phone number')
  ),
});

export const secondStepCallSchema = v.object({
  name: v.pipe(v.string(), v.minLength(1, 'Please provide your name')),
  email: v.pipe(v.string(), v.email('Please enter a valid email address')),
  industry: v.pipe(v.string(), v.minLength(1, 'Please select an industry')),
  companySize: v.pipe(v.string(), v.minLength(1, 'Please select a company size')),
});

export type FirstStepCallSchema = v.InferOutput<typeof firstStepCallSchema>;
export type SecondStepCallSchema = v.InferOutput<typeof secondStepCallSchema>;
