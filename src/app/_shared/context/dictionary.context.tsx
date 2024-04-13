'use client';
import { Dispatch, SetStateAction, createContext, useCallback, useMemo, useState } from 'react';

import { IWord, IWordError } from '@/modules/domain/word';
import { searchWord } from '@/modules/application/searchWord';
import { createWordRepository } from '@/modules/infraestructure/wordRESTRepository';

type ITypography = 'sans-serif' | 'serif' | 'monospace';

type DictionaryContextProps = {
  word: string | undefined;
  wordDefinition: IWord | undefined;
  error: IWordError | undefined;
  typography: ITypography;
  searchWord: (text: string) => void;
  setTypography: (value: ITypography) => void;
};

const INITIAL_STATE: DictionaryContextProps = {
  word: undefined,
  wordDefinition: undefined,
  error: undefined,
  typography: 'sans-serif',
  searchWord: () => {},
  setTypography: () => {},
};

const DictionaryContext = createContext<DictionaryContextProps>(INITIAL_STATE);

type Props = {
  children: React.ReactNode;
};

const DictionaryContextProvider = ({ children }: Props) => {
  const [word, setWord] = useState<string | undefined>(INITIAL_STATE.word);
  const [wordDefinition, setWordDefinition] = useState<IWord | undefined>(INITIAL_STATE.wordDefinition);
  const [error, setError] = useState<IWordError | undefined>(undefined);
  const [typography, setTypography] = useState<ITypography>(INITIAL_STATE.typography);

  const wordRepository = useMemo(() => createWordRepository(), []);

  const handleOnFindWord = useCallback(
    async (text: string) => {
      if (!text) {
        setWord(undefined);
        setError(undefined);
        setWordDefinition(undefined);

        return;
      }

      const { word: _word, error: _error } = await searchWord(wordRepository)({ text });

      setWord(text);
      setError(_error);
      setWordDefinition(_word);
    },
    [wordRepository]
  );

  return (
    <DictionaryContext.Provider
      value={{ word, wordDefinition, error, typography, searchWord: handleOnFindWord, setTypography }}
    >
      {children}
    </DictionaryContext.Provider>
  );
};

export { DictionaryContext, DictionaryContextProvider };
export type { ITypography, DictionaryContextProps };
