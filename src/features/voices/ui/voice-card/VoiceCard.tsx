'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/shared/ui/kit/button';
import { Chip } from '@/shared/ui/kit/chip';

import st from './VoiceCard.module.scss';

const MarqueeFeatures = ({ features }: { features: string[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!containerRef.current || isDragging || isPaused) return;

    const interval = setInterval(() => {
      if (containerRef.current) {
        containerRef.current.scrollLeft += 1;

        if (containerRef.current.scrollLeft >= containerRef.current.scrollWidth / 2) {
          containerRef.current.scrollLeft = 0;
        }
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isDragging, isPaused]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setIsPaused(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsPaused(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsPaused(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <div
      ref={containerRef}
      className={st.marqueeContainer}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      <div className={st.marqueeContent}>
        {features.map((feature, index) => (
          <Chip key={`${feature}-${index}`}>{feature}</Chip>
        ))}
        {/* Duplicate features for seamless loop */}
        {features.map((feature, index) => (
          <Chip key={`${feature}-duplicate-${index}`}>{feature}</Chip>
        ))}
      </div>
    </div>
  );
};

export const VoiceCard = ({
  name,
  description,
  features,
  imgUrl,
  pageUrl = '/call-request',
  demo = false,
}: {
  name: string;
  description: string;
  features: string[];
  imgUrl: string;
  pageUrl?: string;
  demo?: boolean;
}) => (
  <article className={st.container}>
    <Image src={imgUrl} alt={name} width={509} height={484} unoptimized />
    <section className={st.container__card}>
      <div className={st.container__cardContent}>
        <h3>{name}</h3>
        <p>{description}</p>
        <h4>Voice Features:</h4>
        <MarqueeFeatures features={features} />
      </div>
      {/**<Link href={`/call-request?botName=${name}`}>
        <Button fullWidth>Receive the Call</Button>
      </Link> */}
      <Link href={`${pageUrl}${demo ? `?botName=${name}` : `?botName=${name}`}`}>
        <Button fullWidth>Receive the Call</Button>
      </Link>
    </section>
  </article>
);
