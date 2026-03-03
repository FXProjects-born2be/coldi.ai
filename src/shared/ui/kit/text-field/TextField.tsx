'use client';

import type { InputHTMLAttributes } from 'react';

import { cn } from '@/shared/lib/helpers';

import st from './TextField.module.scss';

export function TextField({
  className,
  hint,
  intent = 'default',
  ...args
}: InputHTMLAttributes<HTMLInputElement> & {
  hint?: string;
  intent?: 'default' | 'danger';
}) {
  const inputClasses = cn(
    st.textField,
    {
      [st.danger]: intent === 'danger',
    },
    className
  );

  return (
    <label className={st.layout}>
      <input className={inputClasses} {...args} />
      {hint && <p className={st.hint}>{hint}</p>}
    </label>
  );
}
