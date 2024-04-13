import { IWord, IWordError } from './word';

interface IWordRepository {
  searchWord: ({
    text,
    next,
  }: {
    text: string;
    next?: NextFetchRequestConfig;
  }) => Promise<{ word?: IWord; error?: IWordError }>;
}

export type { IWordRepository };
