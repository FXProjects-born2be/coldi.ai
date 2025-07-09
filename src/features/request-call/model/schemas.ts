import { v } from '@/shared/lib/forms';
import { isPhoneValid } from '@/shared/lib/validation';

export const firstStepCallSchema = v.object({
  scenario: v.pipe(
    v.string(),
    v.minLength(
      1,
      'Please choose a scenario so we can tailor the call to your specific business needs.'
    )
  ),
  phone: v.pipe(
    v.string(),
    v.minLength(
      1,
      'We can’t complete your request without a valid phone number. Please provide one so we can place the test call.'
    ),
    v.custom(
      (value) => isPhoneValid(String(value)),
      'We can’t complete your request without a valid phone number. Please provide one so we can place the test call.'
    )
  ),
});

export const secondStepCallSchema = v.object({
  name: v.pipe(v.string(), v.minLength(1, 'Please introduce yourself')),
  email: v.pipe(
    v.string(),
    v.email(
      "We can't send you the call results without your email address. Please enter a valid email to proceed"
    )
  ),
  industry: v.pipe(
    v.string(),
    v.minLength(
      1,
      'Sharing your industry helps us create a more accurate and relevant call scenario. Please fill in this field'
    )
  ),
  company: v.pipe(
    v.string(),
    v.minLength(
      1,
      'Providing your company name helps us tailor the scenario with greater precision. Please fill in this field'
    )
  ),
});

export type FirstStepCallSchema = v.InferOutput<typeof firstStepCallSchema>;
export type SecondStepCallSchema = v.InferOutput<typeof secondStepCallSchema>;
