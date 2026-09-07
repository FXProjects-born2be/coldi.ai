'use client';

import { useId } from 'react';

import st from '../IconAuraTwo/IconAuraTwo.module.scss';

type IconHearAuraProps = {
  active?: boolean;
};

export const IconHearAura = ({ active }: IconHearAuraProps) => {
  const uid = useId();
  const g = (name: string) => `${uid}-${name}`;
  const shape = active ? st.icon_aura_two__shape : undefined;

  return (
    <svg
      className={st.icon_aura_two}
      xmlns="http://www.w3.org/2000/svg"
      width="223"
      height="223"
      viewBox="0 0 223 223"
      fill="none"
      aria-hidden
    >
      <g opacity="0.5">
        <g className={shape}>
          <path
            d="M30.6918 88.5867C20.4467 126.702 35.1342 173.938 77.4921 193.755C119.85 213.572 140.854 200.785 159.884 186.575C178.914 172.364 218.068 122.386 182.773 88.4704C147.478 54.5543 117.42 74.177 79.3269 69.5825C64.6078 67.8071 40.9369 50.4715 30.6918 88.5867Z"
            fill={`url(#${g('0')})`}
            fillOpacity="0.8"
          />
        </g>
        <g className={shape}>
          <path
            d="M139.054 146.08C202.046 102.837 176.975 43.2932 126.779 24.6429C103.368 15.9447 106.945 48.3819 77.8549 77.0948C48.7652 105.808 11.5098 151.531 50.3763 171.39C89.2427 191.25 112.447 164.346 139.054 146.08Z"
            fill={`url(#${g('1')})`}
          />
          <path
            d="M139.054 146.08C202.046 102.837 176.975 43.2932 126.779 24.6429C103.368 15.9447 106.945 48.3819 77.8549 77.0948C48.7652 105.808 11.5098 151.531 50.3763 171.39C89.2427 191.25 112.447 164.346 139.054 146.08Z"
            fill={`url(#${g('2')})`}
          />
          <path
            d="M139.054 146.08C202.046 102.837 176.975 43.2932 126.779 24.6429C103.368 15.9447 106.945 48.3819 77.8549 77.0948C48.7652 105.808 11.5098 151.531 50.3763 171.39C89.2427 191.25 112.447 164.346 139.054 146.08Z"
            fill={`url(#${g('3')})`}
            fillOpacity="0.2"
          />
        </g>
        <g className={shape}>
          <path
            d="M43.4119 103.574C53.5201 71.36 54.0634 24.53 90.9394 24.53C120.052 24.53 143.835 36.795 158.869 61.4215C173.903 86.0479 202.93 91.0766 202.93 109.27C202.93 142.278 144.728 159.551 109.27 156.1C73.8124 152.649 33.3036 135.787 43.4119 103.574Z"
            fill={`url(#${g('4')})`}
            fillOpacity="0.3"
            style={{ mixBlendMode: 'plus-lighter' }}
          />
          <path
            d="M43.4119 103.574C53.5201 71.36 54.0634 24.53 90.9394 24.53C120.052 24.53 143.835 36.795 158.869 61.4215C173.903 86.0479 202.93 91.0766 202.93 109.27C202.93 142.278 144.728 159.551 109.27 156.1C73.8124 152.649 33.3036 135.787 43.4119 103.574Z"
            fill={`url(#${g('5')})`}
          />
        </g>
        <g className={shape}>
          <path
            d="M116.492 173.18C124.554 208.505 181.419 195.125 156.889 163.905C132.359 132.685 133.432 134.78 113.688 111.5C112.201 134.126 108.43 137.856 116.492 173.18Z"
            fill={`url(#${g('6')})`}
          />
          <path
            d="M116.492 173.18C124.554 208.505 181.419 195.125 156.889 163.905C132.359 132.685 133.432 134.78 113.688 111.5C112.201 134.126 108.43 137.856 116.492 173.18Z"
            fill={`url(#${g('7')})`}
          />
        </g>
        <g className={shape}>
          <path
            d="M31.2197 94.775C4.7083 35.6537 122.65 -13.38 103.429 36.3317C84.2084 86.0434 132.997 166.741 167.556 105.442C197.089 53.0567 57.731 153.896 31.2197 94.775Z"
            fill="#4268FF"
            fillOpacity="0.35"
            style={{ mixBlendMode: 'screen' }}
          />
        </g>
        <g className={shape} filter={`url(#${g('blur')})`} style={{ mixBlendMode: 'plus-lighter' }}>
          <path
            d="M154.977 111.936C178.135 129.519 122.283 126.814 114.11 152.511C105.936 178.209 41.9107 136.281 73.2424 111.936C104.574 87.5914 50.0842 101.116 114.11 71.3614C178.135 41.6063 131.819 94.3539 154.977 111.936Z"
            fill={`url(#${g('9')})`}
            fillOpacity="0.6"
          />
        </g>
        <g className={shape}>
          <path
            d="M109.917 145.814C82.5099 142.72 72.4749 137.145 76.4666 112.364C80.4582 87.5824 93.8383 93.1575 109.917 78.9137C125.995 64.6699 135.383 77.1863 149.41 103.695C163.437 130.204 137.323 148.907 109.917 145.814Z"
            fill={`url(#${g('10')})`}
          />
        </g>
      </g>
      <defs>
        <filter
          id={g('blur')}
          x="61.2126"
          y="58.9826"
          width="102.805"
          height="105.035"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="1.72868" result="effect1_foregroundBlur" />
        </filter>
        <linearGradient
          id={g('0')}
          x1="47.6002"
          y1="167.427"
          x2="92.0663"
          y2="94.569"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4268FF" stopOpacity="0.53" />
          <stop offset="1" stopColor="#4268FF" stopOpacity="0" />
        </linearGradient>
        <radialGradient
          id={g('1')}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(79.7465 50.8739 -40.7968 88.7019 43.8176 103)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4268FF" />
          <stop offset="1" stopColor="#4268FF" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id={g('2')}
          x1="64.7718"
          y1="54.7299"
          x2="83.4254"
          y2="78.3396"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4268FF" />
          <stop offset="1" stopColor="#4268FF" stopOpacity="0" />
        </linearGradient>
        <radialGradient
          id={g('3')}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(-18.851 53.1105 -45.1594 -24.7621 118.992 112.689)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4268FF" />
          <stop offset="1" stopColor="#4268FF" stopOpacity="0.44" />
        </radialGradient>
        <linearGradient
          id={g('4')}
          x1="176.563"
          y1="129.147"
          x2="198.598"
          y2="86.9931"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4268FF" />
          <stop offset="0.665732" stopColor="#4268FF" />
          <stop offset="0.911525" stopColor="#4268FF" />
        </linearGradient>
        <radialGradient
          id={g('5')}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(49.0601 108.155) rotate(30.6997) scale(41.4954 50.6394)"
        >
          <stop stopColor="#4268FF" />
          <stop offset="1" stopColor="#4268FF" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id={g('6')}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(-11.15 -52.405 67.148 -14.1203 143.835 194.01)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4268FF" stopOpacity="0" />
          <stop offset="1" stopColor="#4268FF" />
        </radialGradient>
        <linearGradient
          id={g('7')}
          x1="116.588"
          y1="121.313"
          x2="119.945"
          y2="144.065"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <radialGradient
          id={g('9')}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(114.11 111.936) rotate(90) scale(40.575 40.8673)"
        >
          <stop stopColor="white" />
          <stop offset="0.165839" stopColor="white" />
          <stop offset="0.335281" stopColor="#4268FF" />
          <stop offset="1" stopColor="#4268FF" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id={g('10')}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(109.917 112.364) rotate(-180) scale(33.45 33.45)"
        >
          <stop stopColor="white" />
          <stop offset="0.165839" stopColor="white" />
          <stop offset="0.335281" stopColor="#E0E6FD" />
          <stop offset="1" stopColor="#4268FF" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
};
