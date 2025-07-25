'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { Content, Description, Overlay, Portal, Root, Title } from '@radix-ui/react-dialog';

import { CloseIcon } from '@/shared/ui/icons/outline/close';
import { Button } from '@/shared/ui/kit/button';

import { useRequestCallStore } from '../../store/store';
import st from './StillLikeGetCall.module.scss';

export const StillLikeGetCall = () => {
  const { hasFirstStepData, setFirstStepData } = useRequestCallStore();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    console.log(hasFirstStepData, pathname);

    if (!hasFirstStepData || pathname !== '/call-request') return;

    const handlePopState = (e: PopStateEvent) => {
      e.preventDefault();
      setIsOpen(true);
      history.pushState(null, '', window.location.href);
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link && link.href && !link.href.includes('/call-request')) {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(true);
        return false;
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setIsOpen(true);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F5' ||
        (e.ctrlKey && e.key === 'r') ||
        (e.ctrlKey && e.shiftKey && e.key === 'R')
      ) {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(true);
        return false;
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('popstate', handlePopState);
    document.addEventListener('click', handleClick, true);
    window.addEventListener('keydown', handleKeyDown, true);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleClick, true);
      window.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [hasFirstStepData, pathname]);

  const confirmLeave = () => {
    setIsOpen(false);
    setFirstStepData({
      scenario: '',
      phone: '',
    });
  };

  return (
    <Root open={isOpen} onOpenChange={() => {}}>
      <Portal>
        <Overlay className={st.overlay} onClick={confirmLeave} />
        <Content>
          <Title />
          <Description asChild>
            <section className={st.content}>
              <button
                className={st.closeButton}
                onClick={confirmLeave}
                type="button"
                aria-label="Close dialog"
              >
                <CloseIcon />
              </button>
              <h3>Would you still like to get the call?</h3>
              <span className={st.divider} />
              <section className={st.content__info}>
                <div className={st.imgBlock}>
                  <Image src="/images/home/close-woman.jpg" alt="close-woman" fill unoptimized />
                </div>
                <div className={st.textBlock}>
                  <p>
                    Hey, I&apos;m still here - ready to talk.
                    <br />
                    <br /> Let me show you what Coldi can do. Just click Call Me and I&apos;ll take
                    it from here.
                  </p>
                </div>
              </section>
              <Button onClick={confirmLeave} fullWidth>
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
