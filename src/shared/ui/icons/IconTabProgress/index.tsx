'use client';

import { useLayoutEffect, useRef, useState } from 'react';

import { cn } from '@/shared/lib/helpers';

import st from './IconTabProgress.module.scss';

const RADIUS = 16;
const INSET = 1;

type IconTabProgressProps = {
  durationMs: number;
};

const roundedRectPath = (width: number, height: number, radius: number, inset: number) => {
  const w = width - inset * 2;
  const h = height - inset * 2;
  const r = Math.min(radius, w / 2, h / 2);
  const x = inset;
  const y = inset;
  const midX = x + w / 2;

  return [
    `M ${midX} ${y}`,
    `H ${x + w - r}`,
    `A ${r} ${r} 0 0 1 ${x + w} ${y + r}`,
    `V ${y + h - r}`,
    `A ${r} ${r} 0 0 1 ${x + w - r} ${y + h}`,
    `H ${x + r}`,
    `A ${r} ${r} 0 0 1 ${x} ${y + h - r}`,
    `V ${y + r}`,
    `A ${r} ${r} 0 0 1 ${x + r} ${y}`,
    `H ${midX}`,
  ].join(' ');
};

export const IconTabProgress = ({ durationMs }: IconTabProgressProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const svg = svgRef.current;
    const parent = svg?.parentElement;
    if (!parent) return;

    const update = () => {
      const width = parent.offsetWidth;
      const height = parent.offsetHeight;
      setSize((prev) =>
        prev.width === width && prev.height === height ? prev : { width, height }
      );
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(parent);
    return () => observer.disconnect();
  }, []);

  const path =
    size.width > 0 ? roundedRectPath(size.width, size.height, RADIUS - INSET, INSET) : '';

  return (
    <svg
      ref={svgRef}
      className={st.icon_tab_progress}
      viewBox={size.width > 0 ? `0 0 ${size.width} ${size.height}` : undefined}
      fill="none"
      aria-hidden
    >
      {path ? (
        <>
          <path
            d={path}
            pathLength={100}
            className={cn(st.icon_tab_progress__line, st.icon_tab_progress__line_cw)}
            style={{ animationDuration: `${durationMs}ms` }}
          />
          <path
            d={path}
            pathLength={100}
            className={cn(st.icon_tab_progress__line, st.icon_tab_progress__line_ccw)}
            style={{ animationDuration: `${durationMs}ms` }}
          />
        </>
      ) : null}
    </svg>
  );
};
