interface IWord {
  word: string;
  phonetic: string;
  phonetics: { text: string; audio: string }[];
  origin: string;
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      example: string;
      synonyms: string[];
      antonyms: string[];
    }[];
  }[];
  license: { name: string; url: string };
  sourceUrls: string[];
}

interface IWordError {
  title: string;
  message: string;
  resolution: string;
}

export type { IWord, IWordError };
