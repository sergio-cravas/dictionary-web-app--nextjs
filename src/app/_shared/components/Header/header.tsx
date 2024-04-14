'use client';

import { useContext, useMemo } from 'react';
import { ThemeContext, ThemeContextProps, TypographyContextProps, TypographyContext } from '../../context';

import { Lora } from 'next/font/google';
import { Inter } from 'next/font/google';
import { Inconsolata } from 'next/font/google';

const serif = Lora({ subsets: ['latin'] });
const sansSerif = Inter({ subsets: ['latin'] });
const monospace = Inconsolata({ subsets: ['latin'] });

import { Menu, Switch } from '@/ui';
import { MoonIcon } from '@/assets/icons/moon';
import { BookIcon } from '@/assets/icons/book';

import styles from './header.module.scss';
import colors from '@/theme/colors.module.scss';

export default function Header() {
  const { theme, toggleTheme } = useContext<ThemeContextProps>(ThemeContext);
  const { typography, setTypography } = useContext<TypographyContextProps>(TypographyContext);

  const typografyItems = useMemo(
    () => [
      { label: 'Sans Serif', value: 'sans-serif', className: sansSerif.className, onClick: () => setTypography('sans-serif') },
      { label: 'Serif', value: 'serif', className: serif.className, onClick: () => setTypography('serif') },
      { label: 'Mono', value: 'monospace', className: monospace.className, onClick: () => setTypography('monospace') },
    ],
    [setTypography]
  );

  return (
    <div className={styles.header}>
      <BookIcon className={styles.header__logo} />

      <Menu label={typografyItems.find((item) => item.value === typography)?.label || ''} items={typografyItems} />

      <div className={styles.header__separator} />

      <div className={styles['header__theme-toggler']}>
        <Switch defaultActive={theme === 'dark'} onChange={toggleTheme} />

        <MoonIcon color={theme === 'dark' ? colors.primary : undefined} />
      </div>
    </div>
  );
}
