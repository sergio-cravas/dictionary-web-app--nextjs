import { useCallback, useEffect, useState } from 'react';

import styles from './switch.module.scss';

type Props = {
  defaultActive?: boolean;
  isDisabled?: boolean;
  onChange: (value: boolean) => void;
};

export const Switch = ({ defaultActive = false, isDisabled = false, onChange }: Props) => {
  const [isActive, setIsActive] = useState<boolean>(defaultActive);

  useEffect(() => {
    setIsActive(Boolean(defaultActive));
  }, [defaultActive]);

  const handleOnChange = useCallback(
    (value: boolean) => {
      onChange(value);
      setIsActive(value);
    },
    [onChange]
  );

  return (
    <button
      className={[styles.switch, isActive && styles['switch--active'], isDisabled && styles['switch--disabled']].join(' ')}
      onClick={() => handleOnChange(!isActive)}
    >
      <div className={[styles.switch__pebble, isActive && styles['switch__pebble--active']].join(' ')} />
    </button>
  );
};
