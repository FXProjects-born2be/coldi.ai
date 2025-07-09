import { v } from '@/shared/lib/forms';
import { isPhoneValid } from '@/shared/lib/validation';

export const firstLeadStepSchema = v.object({
  fullName: v.pipe(v.string(), v.minLength(1, 'Please introduce yourself')),
  company: v.pipe(v.string(), v.minLength(1, 'Please provide your company name')),
  email: v.pipe(
    v.string(),
    v.email(
      "We can't send you the call results without your email address. Please enter a valid email to proceed"
    )
  ),
  phone: v.pipe(
    v.string(),
    v.minLength(
      1,
      "We can't complete your request without a valid phone number. Please provide one so we can place the test call"
    ),
    v.custom(
      (value) => isPhoneValid(String(value)),
      "We can't complete your request without a valid phone number. Please provide one so we can place the test call"
    )
  ),
});

export const secondLeadStepSchema = v.object({
  industry: v.pipe(
    v.string(),
    v.minLength(
      1,
      'Sharing your industry helps us create a more accurate and relevant call scenario. Please fill in this field'
    )
  ),
  monthlyLeadVolume: v.pipe(
    v.string(),
    v.minLength(1, 'Please provide the number of leads you receive each month')
  ),
  primaryGoal: v.pipe(v.array(v.string()), v.minLength(1, 'Please select a primary goal')),
  message: v.pipe(v.string(), v.minLength(1, 'Please provide a message')),
});

export type FirstLeadStepSchema = v.InferOutput<typeof firstLeadStepSchema>;
export type SecondLeadStepSchema = v.InferOutput<typeof secondLeadStepSchema>;
