import { v } from '@/shared/lib/forms';

export const requestPricingSchema = v.object({
  name: v.string(), // optional for user; sent to Retell as first_name
  phone: v.pipe(v.string(), v.minLength(1, 'Please provide a valid phone number')),
  turnstileToken: v.pipe(v.string(), v.minLength(1, 'Please complete the security verification.')),
  agentId: v.pipe(v.string(), v.minLength(1, 'Please select an agent')),
});

export type RequestPricingSchema = v.InferOutput<typeof requestPricingSchema>;

// Available agents for live demo
export const DEMO_AGENTS = [
  {
    label: 'FX Operations Script',
    value: 'agent_02d29daf81b35cb25407224ab6',
  },
  {
    label: 'FX Withdrawal Script',
    value: 'agent_9ab288f249e9a4bcac7dd013ee',
  },
  {
    label: 'Outbound Lead Warm-Up Script - English',
    value: 'agent_ec5d779caaf4f2ba5e5dc74f25',
  },
  {
    label: 'Outbound Lead Warm-Up Script - Arabic',
    value: 'agent_b2385fff265239b19ea60ce4d8',
  },
  {
    label: 'Outbound Lead Warm-Up Script - Spanish',
    value: 'agent_721eed0feb10e331509f4cdf8a',
  },
] as const;
