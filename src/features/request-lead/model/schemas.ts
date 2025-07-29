import { v } from '@/shared/lib/forms';

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
    )
  ),
});

export const secondLeadStepSchema = v.object({
  industry: v.optional(v.string()),
  monthlyLeadVolume: v.optional(v.string()),
  primaryGoal: v.optional(v.array(v.string())),
  message: v.optional(v.string()),
});

export type FirstLeadStepSchema = v.InferOutput<typeof firstLeadStepSchema>;
export type SecondLeadStepSchema = v.InferOutput<typeof secondLeadStepSchema>;
