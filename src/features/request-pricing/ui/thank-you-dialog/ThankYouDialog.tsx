'use client';

import { Content, Description, Overlay, Portal, Root, Title } from '@radix-ui/react-dialog';

import { Button } from '@/shared/ui/kit/button';

import st from './ThankYouDialog.module.scss';

export const ThankYouDialog = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  console.log('ThankYouDialog rendered, open:', open);
  return (
    <Root
      open={open}
      onOpenChange={(v) => {
        console.log('ThankYouDialog onOpenChange', v);
        if (!v) onClose();
      }}
    >
      <Portal>
        <Overlay className={st.overlay} />
        <Content>
          <Title />
          <Description asChild>
            <section className={st.content}>
              <section className={st.content__info}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 64 64"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.4462 16.1796C6.50264 19.0353 4.94865 22.8956 2.92809 24.9124C1.05317 26.789 0 29.3332 0 31.9859C0 34.6386 1.05317 37.1828 2.92809 39.0594C4.92231 41.046 6.38976 44.4925 6.4462 47.3069C6.49887 49.7976 7.47341 52.2734 9.37356 54.1697C11.1267 55.9263 13.4718 56.966 15.9507 57.0857C18.927 57.2362 22.8252 58.9669 24.9323 61.0739C26.8088 62.9476 29.3523 64 32.0042 64C34.6561 64 37.1996 62.9476 39.0762 61.0739C41.1833 58.9669 45.0814 57.2362 48.0577 57.0857C50.5366 56.966 52.8818 55.9263 54.6349 54.1697C56.4625 52.3447 57.5106 49.8817 57.5585 47.2993C57.6149 44.4925 59.0635 41.0686 61.054 39.082C62.936 37.206 63.9958 34.6592 64 32.0019C64.0042 29.3445 62.9526 26.7944 61.0766 24.9124C59.0598 22.8994 57.502 19.0353 57.5622 16.1833C57.5906 14.8368 57.3458 13.4984 56.8427 12.2491C56.3395 10.9997 55.5885 9.86526 54.6349 8.91413C53.6465 7.92323 52.4606 7.15149 51.1544 6.6491C49.8481 6.14671 48.4507 5.92493 47.0531 5.99818C44.3665 6.13363 40.9763 4.8318 39.0762 2.92796C37.1994 1.05312 34.6551 0 32.0023 0C29.3495 0 26.8052 1.05312 24.9285 2.92796C23.0321 4.82803 19.6382 6.13363 16.9516 5.99818C15.5546 5.92546 14.1579 6.14751 12.8523 6.64988C11.5467 7.15226 10.3615 7.92372 9.37356 8.91413C8.42039 9.86482 7.66962 10.9987 7.16651 12.2473C6.6634 13.496 6.41837 14.8336 6.4462 16.1796ZM43.4258 19.2874C43.858 19.5272 44.2387 19.8498 44.5462 20.2368C44.8537 20.6237 45.0819 21.0675 45.2178 21.5427C45.3538 22.0179 45.3947 22.5152 45.3384 23.0062C45.2821 23.4972 45.1295 23.9724 44.8895 24.4044L34.4744 43.1493C34.2046 43.6598 33.821 44.1014 33.3531 44.4398C32.6733 44.9317 31.8485 45.1822 31.0099 45.1515C30.1714 45.1208 29.3671 44.8107 28.725 44.2705L18.3438 35.9666C17.9579 35.6578 17.6366 35.276 17.3982 34.843C17.1599 34.4101 17.0091 33.9344 16.9546 33.4431C16.9001 32.9519 16.9429 32.4548 17.0806 31.9801C17.2182 31.5054 17.448 31.0624 17.7568 30.6765C18.0656 30.2906 18.4475 29.9694 18.8805 29.731C19.3135 29.4927 19.7892 29.3419 20.2804 29.2874C20.7717 29.2329 21.2688 29.2757 21.7436 29.4134C22.2183 29.551 22.6612 29.7808 23.0471 30.0896L30.0194 35.6694L38.3086 20.7472C38.5487 20.3154 38.8716 19.9351 39.2587 19.628C39.6458 19.3209 40.0896 19.0931 40.5648 18.9575C41.04 18.8219 41.5373 18.7813 42.0281 18.8379C42.519 18.8945 42.994 19.0472 43.4258 19.2874Z"
                    fill="#16B46B"
                  />
                </svg>
                <h3>Your request has been received.</h3>
                <p>
                  A Coldi specialist will review your submission and get back to you shortly with
                  the optimal solution for your goals.
                </p>
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
