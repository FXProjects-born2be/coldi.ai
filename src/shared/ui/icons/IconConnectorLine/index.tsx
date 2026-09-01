import { type CSSProperties, useId } from 'react';

import { cn } from '@/shared/lib/helpers';

import st from './IconConnectorLine.module.scss';

type ArrowDir = 'down' | 'right';

const VARIANTS = {
  one: {
    width: 143,
    height: 26,
    d: 'M2.67 2.67 H64 C70 2.67 72 5 73.4 8.4 C73.66 12.31 74 18 79.8 20.76 C82 21.95 83.3 21.95 86.08 21.95 H141.65',
    start: { x: 2.67, y: 2.67 },
    arrow: { x: 142, y: 22.31, dir: 'right' as ArrowDir },
  },
  two: {
    width: 121,
    height: 40,
    d: 'M2.67 2.67 H46.71 C52 2.67 54 4 56.08 5.42 C60 10 62.8 15.8 63.08 19.04 C63.3 22.3 64 26 66.25 27.86 C68 31 70 33.5 76.26 35.1 C77.5 35.42 79.46 35.42 79.46 35.42 H119.8',
    start: { x: 2.67, y: 2.67 },
    arrow: { x: 120.85, y: 35.77, dir: 'right' as ArrowDir },
  },
  three: {
    width: 101,
    height: 49,
    d: 'M2.67 2.67 H31.76 C36 2.67 38 3.5 39.74 4.25 C44 7 48 10 48.31 10.83 C52 16 52.5 20 52.62 23.53 C53 28 54 32 60.78 40.08 C64 42.5 68 44.39 73.48 44.39 H98.9',
    start: { x: 2.67, y: 2.67 },
    arrow: { x: 99.93, y: 44.74, dir: 'right' as ArrowDir },
  },
  four: {
    width: 107,
    height: 49,
    d: 'M2.67 2.67 H34.74 C39 2.67 41 3.5 42.72 4.25 C47 7 51 10 51.29 10.83 C55 16 55.4 20 55.6 23.53 C56 28 57 32 63.76 40.08 C67 42.5 71 44.39 76.46 44.39 H104.9',
    start: { x: 2.67, y: 2.67 },
    arrow: { x: 105.88, y: 44.74, dir: 'right' as ArrowDir },
  },
  five: {
    width: 154,
    height: 139,
    d: 'M2.67 2.67 V47.69 C2.67 56 8 66 23.53 71.49 H125.92 C135 73 145 81 149.72 92.56 V135',
    start: { x: 2.67, y: 2.67 },
    arrow: { x: 149.56, y: 138.07, dir: 'down' as ArrowDir },
  },
  six: {
    width: 136,
    height: 139,
    d: 'M133.18 2.67 V47.69 C133.18 55 130 60 128.22 62.3 C122 68 118 70 109.18 71.69 H27.68 C18 72 8 80 5.5 86.5 C3.68 95.69 3.68 108 3.68 135',
    start: { x: 133.18, y: 2.67 },
    arrow: { x: 3.68, y: 138.07, dir: 'down' as ArrowDir },
  },
  seven: {
    width: 16,
    height: 225,
    d: 'M8 2.67 V222',
    start: { x: 8, y: 2.67 },
    arrow: { x: 8, y: 224.84, dir: 'down' as ArrowDir },
  },
  eight: {
    width: 222,
    height: 38,
    d: 'M2.67 2.67 C7 14 14 21.17 21.17 21.17 H202.17 C210 23 214 28 216.74 31.36',
    start: { x: 2.67, y: 2.67 },
    arrow: { x: 217.67, y: 37.02, dir: 'down' as ArrowDir },
  },
  nine: {
    width: 217,
    height: 61,
    d: 'M213.68 2.67 V8.67 C213.68 16 210 22 208.72 23.28 C202 30 195 32.67 189.68 32.67 H27.68 C18 33 8 40 5.5 47.48 V57',
    start: { x: 213.68, y: 2.67 },
    arrow: { x: 3.68, y: 60.02, dir: 'down' as ArrowDir },
  },
  ten: {
    width: 254,
    height: 38,
    d: 'M2.67 2.67 C7 14 14 21.17 21.17 21.17 H234.17 C242 23 246 28 248.74 31.36',
    start: { x: 2.67, y: 2.67 },
    arrow: { x: 249.67, y: 37.02, dir: 'down' as ArrowDir },
  },
  eleven: {
    width: 137,
    height: 344,
    d: 'M133.68 2.67 V150 C133.68 174 3.68 174 3.68 198 V340',
    start: { x: 133.68, y: 2.67 },
    arrow: { x: 3.68, y: 343.02, dir: 'down' as ArrowDir },
  },
  twelve: {
    width: 136,
    height: 82,
    d: 'M133.18 2.67 V19 C133.18 43 3.68 43 3.68 67 V78',
    start: { x: 133.18, y: 2.67 },
    arrow: { x: 3.68, y: 81.02, dir: 'down' as ArrowDir },
  },
  thirteen: {
    width: 155,
    height: 93,
    d: 'M2.67 2.67 V25 C2.67 49 150.67 49 150.67 73 V89',
    start: { x: 2.67, y: 2.67 },
    arrow: { x: 150.67, y: 92.02, dir: 'down' as ArrowDir },
  },
  fourteen: {
    width: 139,
    height: 240,
    d: 'M2.67 2.67 V137 C2.67 161 135.17 161 135.17 185 V236',
    start: { x: 2.67, y: 2.67 },
    arrow: { x: 135.17, y: 239.02, dir: 'down' as ArrowDir },
  },
} as const;

const arrowPath = (x: number, y: number, dir: ArrowDir) =>
  dir === 'right'
    ? `M${x - 3.89} ${y - 2.83} L${x} ${y} L${x - 3.89} ${y + 2.83}`
    : `M${x - 2.83} ${y - 3.89} L${x} ${y} L${x + 2.83} ${y - 3.89}`;

type IconConnectorLineProps = {
  variant: keyof typeof VARIANTS;
  className?: string;
  delay?: number;
  duration?: number;
};

export const IconConnectorLine = ({
  variant,
  className,
  delay = 0,
  duration = 0.8,
}: IconConnectorLineProps) => {
  const id = useId();
  const maskId = `${id}-mask`;
  const { width, height, d, start, arrow } = VARIANTS[variant];

  return (
    <svg
      className={cn(st.icon_connector_line, className)}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      aria-hidden
      style={
        {
          '--icon-connector-delay': `${delay}s`,
          '--icon-connector-duration': `${duration}s`,
        } as CSSProperties
      }
    >
      <defs>
        <mask
          id={maskId}
          maskUnits="userSpaceOnUse"
          maskContentUnits="userSpaceOnUse"
          x={-16}
          y={-16}
          width={width + 32}
          height={height + 32}
        >
          <path
            className={st.icon_connector_line__draw}
            d={d}
            pathLength={1}
            stroke="#fff"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
          />
        </mask>
      </defs>
      <circle
        className={st.icon_connector_line__dot}
        cx={start.x}
        cy={start.y}
        r="2.67"
        fill="#fff"
      />
      <g mask={`url(#${maskId})`}>
        <rect width={width} height={height} fill="none" />
        <path
          d={d}
          stroke="#fff"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="5 7"
          fill="none"
        />
      </g>
      <path
        className={st.icon_connector_line__arrow}
        d={arrowPath(arrow.x, arrow.y, arrow.dir)}
        stroke="#fff"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
};
