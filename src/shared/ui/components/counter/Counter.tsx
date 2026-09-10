'use client';
import { useEffect, useRef, useState } from 'react';

type CounterProps = {
  start: number;
  end: number;
  duration?: number;
  mobileDuration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  separator?: boolean;
  play?: boolean;
  step?: number;
};

const MOBILE_QUERY = '(max-width: 767px)';

export const Counter = ({
  start,
  end,
  duration = 2,
  mobileDuration,
  delay = 0,
  prefix = '',
  suffix = '',
  className,
  separator = false,
  play,
  step,
}: CounterProps) => {
  const [count, setCount] = useState(start);
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLSpanElement | null>(null);
  const isControlled = play !== undefined;
  const shouldPlay = isControlled ? play : isInView;

  useEffect(() => {
    if (isControlled) return;

    const element = ref.current;

    if (!element || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        setIsInView(true);
        observer.disconnect();
      },
      { threshold: 0.2 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [isControlled, isInView]);

  useEffect(() => {
    if (!shouldPlay) return;

    const isMobile = window.matchMedia(MOBILE_QUERY).matches;
    const totalMs = (isMobile && mobileDuration ? mobileDuration : duration) * 1000;
    const startTime = Date.now();
    const totalChange = end - start;
    let frame = 0;

    const animate = () => {
      const progress = Math.min((Date.now() - startTime) / totalMs, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const raw = start + totalChange * easeOut;
      const next =
        progress >= 1 || !step ? Math.round(raw) : Math.min(end, Math.floor(raw / step) * step);

      setCount(next);

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    const timer = window.setTimeout(() => {
      frame = requestAnimationFrame(animate);
    }, delay * 1000);

    return () => {
      window.clearTimeout(timer);
      window.cancelAnimationFrame(frame);
    };
  }, [shouldPlay, start, end, duration, mobileDuration, delay, step]);

  const formatted = separator ? count.toLocaleString('en-US') : count;

  return (
    <span ref={ref} className={className}>
      <span>{prefix}</span>
      {formatted}
      <span>{suffix}</span>
    </span>
  );
};
