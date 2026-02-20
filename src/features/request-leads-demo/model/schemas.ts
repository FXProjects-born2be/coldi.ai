import { v } from '@/shared/lib/forms';

export const bookDemoSchema = v.object({
  name: v.pipe(v.string(), v.minLength(1, 'Name is required')),
  surname: v.pipe(v.string(), v.minLength(1, 'Surname is required')),
  phone: v.pipe(v.string(), v.minLength(1, 'Please provide a valid phone number')),
  email: v.pipe(
    v.string(),
    v.minLength(1, 'Email is required'),
    v.email('Please enter a valid email')
  ),
  sector: v.pipe(v.string(), v.minLength(1, 'Please select a sector')),
});

export type BookDemoSchema = v.InferOutput<typeof bookDemoSchema>;

export const SECTOR_OPTIONS = [
  { label: 'Technology', value: 'Technology' },
  { label: 'Finance', value: 'Finance' },
  { label: 'Healthcare', value: 'Healthcare' },
  { label: 'Retail', value: 'Retail' },
  { label: 'Manufacturing', value: 'Manufacturing' },
  { label: 'Other', value: 'Other' },
] as const;
