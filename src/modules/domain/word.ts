interface IWord {
  word: string;
  phonetic: string;
  phonetics: { text: string; audio: string }[];
  origin: string;
  meanings: IMeaning[];
  license: { name: string; url: string };
  sourceUrls: string[];
}

interface IMeaning {
  partOfSpeech: string;
  definitions: IDefinition[];
  synonyms: string[];
  antonyms: string[];
}

interface IDefinition {
  definition: string;
  example: string;
  synonyms: string[];
  antonyms: string[];
}

interface IWordError {
  title: string;
  message: string;
  resolution: string;
}

export type { IWord, IWordError, IMeaning, IDefinition };
