'use client';
import { createContext, useMemo, useState } from 'react';

import { sans_serif, serif, monospace } from '@/theme/fonts';
import { DictionaryContextProvider } from './dictionary.context';
import { ThemeContextProvider } from './theme.context';

type ITypography = 'sans-serif' | 'serif' | 'monospace';

type TypographyContextProps = {
  typography: ITypography;
  setTypography: (value: ITypography) => void;
};

const INITIAL_STATE: TypographyContextProps = {
  typography: 'sans-serif',
  setTypography: () => {},
};

const TypographyContext = createContext<TypographyContextProps>(INITIAL_STATE);

type Props = {
  children: React.ReactNode;
};

const TypographyContextProvider = ({ children }: Props) => {
  const [typography, setTypography] = useState<ITypography>(INITIAL_STATE.typography);

  const typographyClassname = useMemo(() => {
    if (typography === 'monospace') return monospace.className;
    else if (typography === 'serif') return serif.className;
    else return sans_serif.className;
  }, [typography]);

  return (
    <TypographyContext.Provider value={{ typography, setTypography }}>
      <body className={typographyClassname}>
        <ThemeContextProvider>
          <DictionaryContextProvider>{children}</DictionaryContextProvider>
        </ThemeContextProvider>
      </body>
    </TypographyContext.Provider>
  );
};

export { TypographyContext, TypographyContextProvider };
export type { ITypography, TypographyContextProps };
