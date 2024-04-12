'use client';

import { Dispatch, SetStateAction, createContext, useState } from 'react';

type ITypography = 'sans-serif' | 'serif' | 'monospace';

type DictionaryContextProps = {
  word: string;
  typography: ITypography;
  findWord: (text: string) => void;
  setTypography: Dispatch<SetStateAction<ITypography>>;
};

const INITIAL_STATE: DictionaryContextProps = {
  word: '',
  typography: 'sans-serif',
  findWord: () => {},
  setTypography: () => {},
};

const DictionaryContext = createContext<DictionaryContextProps>(INITIAL_STATE);

type Props = {
  children: React.ReactNode;
};

const DictionaryContextProvider = ({ children }: Props) => {
  const [word, setWord] = useState<string>(INITIAL_STATE.word);
  const [typography, setTypography] = useState<ITypography>(INITIAL_STATE.typography);

  const handleOnFindWord = (text: string) => {
    console.log(text);
  };

  return (
    <DictionaryContext.Provider value={{ word, findWord: handleOnFindWord, typography, setTypography }}>
      {children}
    </DictionaryContext.Provider>
  );
};

export { DictionaryContext, DictionaryContextProvider };
export type { ITypography };
