import { ArrowDownIcon } from '@/assets/icons/arrow-down';

import styles from './menu.module.scss';
import { useState } from 'react';

type Props = {
  label: string;
  className?: string;
  items: { label: string; value: string; className?: string; onClick: () => void }[];
};

export const Menu = ({ label, className, items = [] }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={[styles.menu, className].join(' ')}>
      <div className={styles.menu__label} onClick={() => setIsOpen(true)}>
        <span>{label}</span>

        <ArrowDownIcon />
      </div>

      {isOpen && (
        <div className={styles.menu__items}>
          {items.map((item) => (
            <div
              key={item.label}
              className={[styles.menu__items__item, className].join(' ')}
              onClick={() => {
                setIsOpen(false);
                item.onClick();
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
