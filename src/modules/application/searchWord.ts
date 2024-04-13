import { IWordRepository } from '../domain/wordRepository';

export const searchWord =
  (repository: IWordRepository) =>
  ({ text, next }: { text: string; next?: NextFetchRequestConfig }) =>
    repository.searchWord({ text, next });
