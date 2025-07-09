'use client';

import type { InputHTMLAttributes } from 'react';

import { cn } from '@/shared/lib/helpers/styles';

import st from './TextField.module.scss';

export function TextField({
  className,
  hint,
  ...args
}: InputHTMLAttributes<HTMLInputElement> & {
  hint?: string;
}) {
  const inputClasses = cn(st.textField, className);

  return (
    <label className={st.layout}>
      <input className={inputClasses} {...args} />
      {hint && <p className={st.hint}>{hint}</p>}
    </label>
  );
}
