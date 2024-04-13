'use client';

import { createContext, useCallback, useEffect, useState } from 'react';

type ITheme = 'light' | 'dark';

type ThemeContextProps = {
  theme: ITheme;
  toggleTheme: () => void;
};

const INITIAL_STATE: ThemeContextProps = {
  theme: 'light',
  toggleTheme: () => {},
};

const ThemeContext = createContext<ThemeContextProps>(INITIAL_STATE);

type Props = {
  children: React.ReactNode;
};

const ThemeContextProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<ITheme>(INITIAL_STATE.theme);

  useEffect(() => {
    const root = document.documentElement;

    root.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export { ThemeContext, ThemeContextProvider };
export type { ITheme, ThemeContextProps };
