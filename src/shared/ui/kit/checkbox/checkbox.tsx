import { useId } from 'react';

import { Indicator, Root } from '@radix-ui/react-checkbox';
import type { ReactNode } from 'react';

import { Check } from '@/shared/ui/icons/fill/check';

import st from './checkbox.module.scss';

export const Checkbox = ({
  label,
  onCheckedChange,
  checked = false,
  id,
}: {
  label?: ReactNode;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  id?: string;
}) => {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;

  return (
    <div className={st.layout}>
      <Root
        className={st.checkboxRoot}
        id={checkboxId}
        checked={checked}
        onCheckedChange={onCheckedChange}
      >
        <Indicator className={st.checkboxIndicator}>
          <Check />
        </Indicator>
      </Root>
      <label htmlFor={checkboxId}>{label}</label>
    </div>
  );
};
