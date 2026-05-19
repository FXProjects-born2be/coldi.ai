'use client';
import { useEffect, useRef, useState } from 'react';

type CounterProps = {
  start: number;
  end: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

export const Counter = ({
  start,
  end,
  duration = 2,
  delay = 0,
  prefix = '',
  suffix = '',
  className,
}: CounterProps) => {
  const [count, setCount] = useState(start);
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
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
  }, [isInView]);

  useEffect(() => {
    if (isInView) {
      const startTime = Date.now();
      const totalChange = end - start;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);

        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentCount = Math.round(start + totalChange * easeOut);

        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      const timer = setTimeout(() => {
        requestAnimationFrame(animate);
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [isInView, start, end, duration, delay]);

  return (
    <span ref={ref} className={className}>
      <span>{prefix}</span>
      {count}
      <span>{suffix}</span>
    </span>
  );
};
