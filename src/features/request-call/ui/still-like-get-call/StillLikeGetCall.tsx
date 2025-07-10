'use client';

import Image from 'next/image';

import { Content, Description, Overlay, Portal, Root, Title } from '@radix-ui/react-dialog';

import { Button } from '@/shared/ui/kit/button';

import st from './StillLikeGetCall.module.scss';

export const StillLikeGetCall = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  return (
    <Root open={open} onOpenChange={onClose}>
      <Portal>
        <Overlay className={st.overlay} />
        <Content>
          <Title />
          <Description asChild>
            <section className={st.content}>
              <h3>Would you still like to get the call?</h3>
              <span className={st.divider} />
              <section className={st.content__info}>
                <div className={st.imgBlock}>
                  <Image src="/images/home/close-woman.jpg" alt="close-woman" fill unoptimized />
                </div>
                <div className={st.textBlock}>
                  <p>
                    Hey, I’m still here — ready to talk.
                    <br />
                    <br /> Let me show you what Coldi can do. Just click Call Me and I’ll take it
                    from here.
                  </p>
                </div>
              </section>
              <Button onClick={onClose} fullWidth>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                >
                  <path
                    d="M19.7291 15.76L17.1891 15.47C16.8904 15.4349 16.5877 15.468 16.3036 15.5667C16.0196 15.6654 15.7616 15.8273 15.5491 16.04L13.7091 17.88C10.8705 16.4359 8.56313 14.1286 7.11906 11.29L8.96906 9.44001C9.39906 9.01001 9.60906 8.41001 9.53906 7.80001L9.24906 5.28001C9.19258 4.7921 8.95853 4.34204 8.59153 4.01561C8.22452 3.68918 7.75023 3.50921 7.25906 3.51001H5.52906C4.39906 3.51001 3.45906 4.45001 3.52906 5.58001C4.05906 14.12 10.8891 20.94 19.4191 21.47C20.5491 21.54 21.4891 20.6 21.4891 19.47V17.74C21.4991 16.73 20.7391 15.88 19.7291 15.76Z"
                    fill="white"
                  />
                </svg>
                Call Me
              </Button>
            </section>
          </Description>
        </Content>
      </Portal>
    </Root>
  );
};
