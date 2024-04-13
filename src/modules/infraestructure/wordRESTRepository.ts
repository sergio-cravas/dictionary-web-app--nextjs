import { IWordRepository } from '../domain/wordRepository';

const API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/es' || process.env.API_URL;
const HEADERS = new Headers({
  'Content-Type': 'application/json',
});

const createWordRepository = (): IWordRepository => ({
  searchWord,
});

const searchWord = async ({ text, next }: { text: string; next?: NextFetchRequestConfig }) => {
  const ENDPOINT = `${API_URL}/${text}`;

  return fetch(ENDPOINT, { headers: HEADERS, next })
    .then((response) => response.json())
    .then((data) => {
      if (data?.title === 'No Definitions Found') return { error: data };
      return { word: data[0] };
    });
};

export { createWordRepository };
