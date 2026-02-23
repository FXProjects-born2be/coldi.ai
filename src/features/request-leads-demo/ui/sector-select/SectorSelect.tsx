'use client';

import { useEffect, useRef, useState } from 'react';

import { ArrowBottom } from '@/shared/ui/icons/fill/arrow-bottom';

import st from './SectorSelect.module.scss';

const OTHER_VALUE = 'Other';

type SectorSelectProps = {
  items: readonly { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const SectorSelect = ({
  items,
  value,
  onChange,
  placeholder = 'Sector',
}: SectorSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherText, setOtherText] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const otherInputRef = useRef<HTMLInputElement>(null);

  const isKnownValue = items.some((item) => item.value === value);
  const isCustomOther = !!value && !isKnownValue;

  const displayValue = isCustomOther
    ? value
    : (items.find((item) => item.value === value)?.label ?? (value || placeholder));
  const isPlaceholder = !value;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        if (showOtherInput && otherText.trim()) {
          onChange(otherText.trim());
        }
        setShowOtherInput(false);
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, showOtherInput, otherText, onChange]);

  useEffect(() => {
    if (showOtherInput) otherInputRef.current?.focus();
  }, [showOtherInput]);

  const handleOptionClick = (itemValue: string) => {
    if (itemValue === OTHER_VALUE) {
      setShowOtherInput(true);
      setOtherText(isCustomOther ? value : '');
    } else {
      onChange(itemValue);
      setShowOtherInput(false);
      setOtherText('');
      setIsOpen(false);
    }
  };

  const commitOther = () => {
    const trimmed = otherText.trim();
    onChange(trimmed || OTHER_VALUE);
    setShowOtherInput(false);
    setIsOpen(false);
  };

  return (
    <div className={st.wrapper} ref={containerRef}>
      <button
        type="button"
        className={`${st.trigger} ${isOpen ? st.open : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={isPlaceholder ? st.placeholder : st.selectedLabel}>{displayValue}</span>
        <ArrowBottom />
      </button>

      {isOpen && (
        <div className={st.dropdown}>
          <div className={st.grid}>
            {items.map((item) => {
              const isActive =
                item.value === OTHER_VALUE
                  ? isCustomOther || value === OTHER_VALUE
                  : value === item.value;
              return (
                <button
                  key={item.value}
                  type="button"
                  className={`${st.option} ${isActive ? st.active : ''}`}
                  onClick={() => handleOptionClick(item.value)}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          {showOtherInput && (
            <div className={st.otherInput}>
              <input
                ref={otherInputRef}
                type="text"
                placeholder="Please specify your sector"
                value={otherText}
                onChange={(e) => setOtherText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    commitOther();
                  }
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
