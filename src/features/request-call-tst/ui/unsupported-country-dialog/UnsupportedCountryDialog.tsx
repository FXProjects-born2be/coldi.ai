'use client';

import { Content, Description, Overlay, Portal, Root, Title } from '@radix-ui/react-dialog';

import { Button } from '@/shared/ui/kit/button';

import st from './UnsupportedCountryDialog.module.scss';

export const UnsupportedCountryDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <Root open={open} onOpenChange={onClose}>
      <Portal>
        <Overlay className={st.overlay} />
        <Content>
          <Title />
          <Description asChild>
            <section className={st.content}>
              <section className={st.content__info}>
                <h3>Your country code is not supported</h3>
                <p>Our support will contact you shortly to provide relevant demo</p>
              </section>
              <Button onClick={onClose} fullWidth>
                Continue
              </Button>
            </section>
          </Description>
        </Content>
      </Portal>
    </Root>
  );
};
