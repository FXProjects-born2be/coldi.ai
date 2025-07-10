'use client';
import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

type TypingTextProps = {
  text: string | string[];
  speed?: number;
  delay?: number;
  className?: string;
};

export const TypingText = ({ text, speed = 100, delay = 0, className }: TypingTextProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const textArray = Array.isArray(text) ? text : [text];

  useEffect(() => {
    if (!hasStarted) {
      const startTimer = setTimeout(() => {
        setHasStarted(true);
      }, delay);

      return () => clearTimeout(startTimer);
    }
  }, [delay, hasStarted]);

  useEffect(() => {
    if (hasStarted && currentIndex < textArray[currentTextIndex].length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + textArray[currentTextIndex][currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (
      hasStarted &&
      currentIndex === textArray[currentTextIndex].length &&
      !isTypingComplete
    ) {
      // Wait before moving to next text or hiding cursor
      const nextTextTimer = setTimeout(() => {
        if (currentTextIndex < textArray.length - 1) {
          // Move to next text
          setCurrentTextIndex((prev) => prev + 1);
          setCurrentIndex(0);
          setDisplayedText('');
        } else {
          // Hide cursor after all texts are complete
          setIsTypingComplete(true);
        }
      }, 2000); // Wait 2 seconds before next text or hiding cursor

      return () => clearTimeout(nextTextTimer);
    }
  }, [hasStarted, currentIndex, textArray, currentTextIndex, speed, isTypingComplete]);

  return (
    <span className={className}>
      {displayedText}
      {!isTypingComplete && hasStarted && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          style={{ display: 'inline-block' }}
        >
          |
        </motion.span>
      )}
    </span>
  );
};
