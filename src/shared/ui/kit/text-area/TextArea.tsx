'use client';

import type { TextareaHTMLAttributes } from 'react';

import { cn } from '@/shared/lib/helpers/styles';

import st from './TextArea.module.scss';

export function TextArea({
  className,
  hint,
  intent,
  ...args
}: TextareaHTMLAttributes<HTMLTextAreaElement> & {
  hint?: string;
  intent?: 'default' | 'danger';
}) {
  const textAreaClasses = cn(
    st.textArea,
    {
      [st.danger]: intent === 'danger',
    },
    className
  );

  return (
    <label className={st.layout}>
      <textarea className={textAreaClasses} {...args} />
      {hint && <p className={st.hint}>{hint}</p>}
    </label>
  );
}
