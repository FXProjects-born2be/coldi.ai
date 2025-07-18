'use client';
import { useState } from 'react';

import { Content, Item, Portal, Root, Trigger } from '@radix-ui/react-dropdown-menu';

import { ArrowBottom } from '@/shared/ui/icons/fill/arrow-bottom';

import { TextField } from '../text-field';
import st from './Select.module.scss';

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = {
  items: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  showOtherInput?: boolean;
  otherPlaceholder?: string;
};

export const Select = ({
  items,
  value,
  onChange,
  placeholder = 'Select option',
  showOtherInput = false,
  otherPlaceholder = 'Please specify',
}: SelectProps) => {
  const [otherValue, setOtherValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [showOtherInputState, setShowOtherInputState] = useState(false);

  const handleItemSelect = (itemValue: string) => {
    if (itemValue === 'Other (Please specify)') {
      onChange(itemValue);
      setShowOtherInputState(true);
      // Не закриваємо дропдаун для "Other"
    } else {
      onChange(itemValue);
      setOtherValue('');
      setShowOtherInputState(false);
      setIsOpen(false);
    }
  };

  return (
    <Root
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          setShowOtherInputState(false);
        }
      }}
    >
      <Trigger asChild>
        <div className={st.trigger}>
          <section className={st.triggerContent}>{value || placeholder}</section>
          <ArrowBottom />
        </div>
      </Trigger>
      <Portal>
        <Content className={st.content} sideOffset={6}>
          {items.map((item, index) => (
            <Item
              key={index}
              className={st.item}
              onSelect={(e) => {
                e.preventDefault();
                handleItemSelect(item.value);
              }}
            >
              <p>{item.label}</p>
            </Item>
          ))}
          {showOtherInput && showOtherInputState && (
            <div className={st.otherInputContainer}>
              <TextField
                placeholder={otherPlaceholder}
                value={otherValue}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setOtherValue(newValue);
                  onChange(newValue);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    setIsOpen(false);
                    setShowOtherInputState(false);
                  }
                }}
                autoFocus
              />
            </div>
          )}
        </Content>
      </Portal>
    </Root>
  );
};
