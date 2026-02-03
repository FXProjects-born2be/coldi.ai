import { v } from '@/shared/lib/forms';
import { isPhoneValid } from '@/shared/lib/validation';

export const firstStepCallSchema = v.object({
  scenario: v.pipe(
    v.array(v.string()),
    v.minLength(
      1,
      'Please choose at least one scenario so we can tailor the call to your specific business needs.'
    )
  ),
  phone: v.pipe(
    v.string(),
    v.minLength(1, "We can't complete your request without a valid phone number."),
    v.custom(
      (value) => isPhoneValid(String(`+${value}`)),
      "We can't complete your request without a valid phone number."
    )
  ),
  countryCode: v.string(),
});

export const secondStepCallSchema = v.object({
  name: v.pipe(v.string(), v.minLength(1, 'Please introduce yourself')),
  email: v.pipe(
    v.string(),
    v.email("We can't send you the call results without your email address.")
  ),
  smsCode: v.optional(v.string()),
  industry: v.pipe(
    v.string(),
    v.minLength(
      1,
      'Sharing your industry helps us create a more accurate and relevant call scenario.'
    )
  ),
  company: v.pipe(
    v.string(),
    v.minLength(
      1,
      'Providing your company size helps us tailor the scenario with greater precision.'
    )
  ),
  captchaToken: v.pipe(v.string(), v.minLength(1, 'Please complete the security verification.')),
});

export type FirstStepCallSchema = v.InferOutput<typeof firstStepCallSchema>;
export type SecondStepCallSchema = v.InferOutput<typeof secondStepCallSchema>;
