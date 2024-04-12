import { Dispatch, SetStateAction, createContext, useState } from 'react';

type ITypography = 'sans-serif' | 'serif' | 'monospace';

type DictionaryContextProps = {
  word: string;
  typography: ITypography;
  setWord: Dispatch<SetStateAction<string>>;
  setTypography: Dispatch<SetStateAction<ITypography>>;
};

const INITIAL_STATE: DictionaryContextProps = {
  word: '',
  typography: 'sans-serif',
  setWord: () => {},
  setTypography: () => {},
};

const DictionaryContext = createContext<DictionaryContextProps>(INITIAL_STATE);

type Props = {
  children: React.ReactNode;
};

const DictionaryContextProvider = ({ children }: Props) => {
  const [word, setWord] = useState<string>(INITIAL_STATE.word);
  const [typography, setTypography] = useState<ITypography>(INITIAL_STATE.typography);

  return (
    <DictionaryContext.Provider value={{ word, setWord, typography, setTypography }}>{children}</DictionaryContext.Provider>
  );
};

export { DictionaryContextProvider };
export type { ITypography };
