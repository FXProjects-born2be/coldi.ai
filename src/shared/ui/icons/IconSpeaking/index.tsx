import { cn } from '@/shared/lib/helpers';

import st from './IconSpeaking.module.scss';

type IconSpeakingProps = {
  active?: boolean;
};

const BARS = [
  { x: 2.9873, y: 5.54814, height: 10.2427 },
  { x: 6.40186, y: 2.98746, height: 15.3641 },
  { x: 9.81592, y: 5.54814, height: 10.2427 },
  { x: 13.23, y: 2.98746, height: 15.3641 },
  { x: 16.6445, y: 5.54814, height: 10.2427 },
] as const;

export const IconSpeaking = ({ active = true }: IconSpeakingProps) => (
  <svg
    className={cn(st.icon_speaking, active && st.active)}
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    aria-hidden
  >
    {BARS.map((bar) => (
      <rect
        key={bar.x}
        className={st.icon_speaking__bar}
        x={bar.x}
        y={bar.y}
        width="1.70712"
        height={bar.height}
        rx="0.853561"
        fill="#F6F6F6"
      />
    ))}
  </svg>
);
