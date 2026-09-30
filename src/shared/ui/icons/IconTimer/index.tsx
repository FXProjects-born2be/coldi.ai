import st from './IconTimer.module.scss';

export const IconTimer = () => (
  <svg
    className={st.icon_timer}
    xmlns="http://www.w3.org/2000/svg"
    width="449"
    height="356"
    viewBox="0 0 449 356"
    fill="none"
    aria-hidden
  >
    <g filter="url(#icon-timer-shadow)">
      <path
        className={st.icon_timer__shape}
        d="M288.469 299.289C228.009 333.774 121.636 330.826 95.6771 249.025C69.7183 167.223 94.4728 91.8405 154.933 57.3553C215.394 22.8702 312.817 2.64727 348.196 104.994C367.75 178.668 348.93 264.804 288.469 299.289Z"
        fill="white"
      />
      <path
        className={st.icon_timer__shape}
        d="M358.838 180.102C358.838 250.577 304.258 343.438 221.378 326.424C138.498 309.41 85.9399 250.577 85.9399 180.102C85.9399 109.627 94.2701 24.3904 199.386 43.1061C272.159 61.8215 358.838 109.627 358.838 180.102Z"
        fill="white"
      />
      <path
        className={st.icon_timer__shape}
        d="M186.907 312.083C119.942 293.843 45.8317 216.216 83.4496 139.239C121.068 62.2617 182.606 17.102 249.571 35.3422C316.536 53.5824 408.126 117.05 363.136 215.421C326.518 282.034 253.873 330.323 186.907 312.083Z"
        fill="white"
      />
      <g className={st.icon_timer__shape} filter="url(#icon-timer-core)">
        <path
          d="M107.39 179.689C107.39 115.544 159.389 63.5449 223.534 63.5449C287.678 63.5449 339.677 115.544 339.677 179.689C339.677 243.833 287.678 295.833 223.534 295.833C159.389 295.833 107.39 243.833 107.39 179.689Z"
          fill="url(#icon-timer-fill)"
        />
      </g>
    </g>
    <defs>
      <filter
        id="icon-timer-shadow"
        x="-48.2401"
        y="-83.3783"
        width="541.079"
        height="541.079"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feMorphology
          radius="11.4515"
          operator="dilate"
          in="SourceAlpha"
          result="effect1_dropShadow"
        />
        <feOffset dy="9.16118" />
        <feGaussianBlur stdDeviation="30.919" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.259615 0 0 0 0 0.407692 0 0 0 0 1 0 0 0 1 0"
        />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
      <filter
        id="icon-timer-core"
        x="107.39"
        y="63.5449"
        width="232.288"
        height="235.364"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="3.07602" />
        <feGaussianBlur stdDeviation="7.69006" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
        <feTurbulence
          type="fractalNoise"
          baseFrequency="1.3003802299499512 1.3003802299499512"
          stitchTiles="stitch"
          numOctaves="3"
          result="noise"
          seed="7512"
        />
        <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
        <feComponentTransfer in="alphaNoise" result="coloredNoise1">
          <feFuncA
            type="discrete"
            tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 "
          />
        </feComponentTransfer>
        <feComposite
          operator="in"
          in2="effect1_innerShadow"
          in="coloredNoise1"
          result="noise1Clipped"
        />
        <feFlood floodColor="rgba(12, 16, 33, 0.25)" result="color1Flood" />
        <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
        <feMerge result="effect2_noise">
          <feMergeNode in="effect1_innerShadow" />
          <feMergeNode in="color1" />
        </feMerge>
      </filter>
      <linearGradient
        id="icon-timer-fill"
        x1="223.534"
        y1="63.5449"
        x2="223.534"
        y2="295.833"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3C7EE3" />
        <stop offset="1" stopColor="#4069EE" />
      </linearGradient>
    </defs>
  </svg>
);
