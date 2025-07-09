'use client';

import { Content, Item, Portal, Root, Trigger } from '@radix-ui/react-dropdown-menu';
import type { ReactNode } from 'react';

import { ArrowBottom } from '@/shared/ui/icons/fill/arrow-bottom';

import { Checkbox } from '../checkbox';
import st from './dropdown.module.scss';

export const Dropdown = ({
  trigger,
  items,
  selectedItems,
  onChange,
}: {
  trigger: ReactNode;
  items: { label: string; value: string }[];
  selectedItems: string[];
  onChange: (newSelected: string[]) => void;
}) => {
  const toggleItem = (value: string) => {
    if (selectedItems.includes(value)) {
      onChange(selectedItems.filter((v) => v !== value));
    } else {
      onChange([...selectedItems, value]);
    }
  };

  return (
    <Root>
      <Trigger asChild>
        <div className={st.trigger}>
          <section className={st.triggerContent}>{trigger}</section>
          <ArrowBottom />
        </div>
      </Trigger>
      <Portal>
        <Content className={st.content} sideOffset={6}>
          {items.map((item, index) => (
            <Item
              key={index}
              className={st.item}
              onSelect={(e) => e.preventDefault()}
              onClick={() => toggleItem(item.value)}
            >
              <Checkbox checked={selectedItems.includes(item.value)} />
              <p>{item.label}</p>
            </Item>
          ))}
        </Content>
      </Portal>
    </Root>
  );
};
