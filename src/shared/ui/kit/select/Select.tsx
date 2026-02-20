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

  // Find the selected item's label to display instead of value
  const selectedItem = items.find((item) => item.value === value);
  const displayValue = selectedItem ? selectedItem.label : value || placeholder;

  const handleItemSelect = (itemValue: string) => {
    if (itemValue === 'Other (Please specify)') {
      onChange(itemValue);
      setOtherValue(items.some((i) => i.value === value) ? '' : value);
      setShowOtherInputState(true);
    } else {
      onChange(itemValue);
      setOtherValue('');
      setShowOtherInputState(false);
      setIsOpen(false);
    }
  };

  const commitOtherValue = () => {
    const trimmed = otherValue.trim();
    onChange(trimmed ? trimmed : 'Other (Please specify)');
    setShowOtherInputState(false);
    setIsOpen(false);
  };

  return (
    <Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          if (showOtherInputState) {
            const trimmed = otherValue.trim();
            onChange(trimmed ? trimmed : 'Other (Please specify)');
          }
          setShowOtherInputState(false);
        }
        setIsOpen(open);
      }}
    >
      <Trigger asChild>
        <div className={st.trigger}>
          <section className={st.triggerContent}>{displayValue}</section>
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
            <div
              className={st.otherInputContainer}
              onPointerDown={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
            >
              <TextField
                placeholder={otherPlaceholder}
                value={otherValue}
                onChange={(e) => setOtherValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    commitOtherValue();
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
