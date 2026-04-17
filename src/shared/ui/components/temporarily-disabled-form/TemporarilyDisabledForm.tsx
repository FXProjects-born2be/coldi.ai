import type { ReactNode } from 'react';

import { TEMPORARILY_DISABLED_FORM_MESSAGE } from '@/shared/lib/system/request-forms';

import st from './TemporarilyDisabledForm.module.scss';

export const TemporarilyDisabledForm = ({
  disabled,
  children,
  message = TEMPORARILY_DISABLED_FORM_MESSAGE,
}: {
  disabled: boolean;
  children: ReactNode;
  message?: string;
}) => {
  if (!disabled) {
    return <>{children}</>;
  }

  return (
    <div className={st.root}>
      <div className={st.notice} role="status" aria-live="polite">
        {message}
      </div>
      <div className={st.content} aria-disabled="true">
        <fieldset className={st.fieldset} disabled>
          {children}
        </fieldset>
      </div>
    </div>
  );
};
