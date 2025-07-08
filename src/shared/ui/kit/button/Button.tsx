'use client';

import type { ButtonHTMLAttributes } from 'react';

import { cn } from '@/shared/lib/helpers/styles';

import st from './Button.module.scss';

export type ButtonVariants = 'primary' | 'secondary' | 'success';

export const Button = ({
  children,
  className,
  variant = 'primary',
  fullWidth = false,
  size = 'sm',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariants;
  fullWidth?: boolean;
  size?: 'sm' | 'md';
}) => {
  return (
    <button
      className={cn(
        st.button,
        st[variant],
        st[size],
        fullWidth ? st.fullWidth : st.defaultWidth,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
