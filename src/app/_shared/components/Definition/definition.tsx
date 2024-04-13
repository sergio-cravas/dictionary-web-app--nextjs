import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import { PlayIcon } from '@/assets/icons/play';
import { NewWindowIcon } from '@/assets/icons/new-window';
import { IMeaning, IWord, IWordError } from '@/modules/domain/word';
import { DictionaryContext } from '../../context';

import styles from './definition.module.scss';
import colors from '@/theme/colors.module.scss';

const WordDefinition = ({ word }: { word: IWord }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { wordDefinition, searchWord } = useContext(DictionaryContext);

  const [phoneticAudio, setPhoneticAudio] = useState<{ text: string; audio: string } | undefined>();

  useEffect(() => {
    setPhoneticAudio(wordDefinition?.phonetics?.find((phonetic) => phonetic.audio));
  }, [wordDefinition?.phonetics]);

  const handleOnClickWord = useCallback(
    (text: string) => {
      searchWord(text);
    },
    [searchWord]
  );

  const handleOnPlay = useCallback(() => {
    if (audioRef?.current) audioRef.current.play();
  }, []);

  return (
    <div className={styles.definition}>
      <div className={styles['definition__heading']}>
        <div className={styles['definition__heading__content']}>
          <h1 className={styles['definition__heading__content__title']}>{word.word}</h1>
          <span className={styles['definition__heading__content__phonetic']}>{phoneticAudio?.text || word.phonetic}</span>
        </div>

        <button
          disabled={!phoneticAudio}
          className={[
            styles['definition__heading__play-button'],
            !phoneticAudio && styles['definition__heading__play-button--disabled'],
          ].join(' ')}
          onClick={handleOnPlay}
        >
          <PlayIcon color={!phoneticAudio ? colors.dark05 : undefined} />

          <audio ref={audioRef} src={phoneticAudio?.audio} />
        </button>
      </div>

      {word.meanings.map((meaning: IMeaning) => (
        <MeaningBlock key={'meaning-' + meaning.partOfSpeech} meaning={meaning} onSearch={handleOnClickWord} />
      ))}

      <div className={styles['definition__source']}>
        <div className={styles['definition__separator']} />

        <div className={styles['definition__source__content']}>
          <span className={styles['definition__source__content__title']}>Source</span>

          <div className={styles['definition__source__content__links']}>
            {word.sourceUrls.map((source) => (
              <Link className={styles['definition__source__content__links__item']} key={source} href={source} target="_blank">
                <span>{source}</span>

                <NewWindowIcon />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const MeaningBlock = ({ meaning, onSearch }: { meaning: IMeaning; onSearch: (text: string) => void }) => {
  return (
    <div className={styles['definition__meaning']}>
      <div className={styles['definition__meaning__head']}>
        <span className={styles['definition__meaning__head__title']}>{meaning.partOfSpeech}</span>

        <div className={styles['definition__separator']} />
      </div>

      <div className={styles['definition__meaning__definitions']}>
        <span className={styles['definition__meaning__definitions__title']}>Meaning</span>

        <ul className={styles['definition__meaning__definitions__content']}>
          {meaning.definitions.map((def, index) => (
            <li key={index}>
              <p>{def.definition}</p>
              {def.example && <p className={styles['definition__meaning__definitions__content__example']}>{def.example}</p>}
            </li>
          ))}
        </ul>
      </div>

      {Boolean(meaning.synonyms.length) && (
        <div className={styles['definition__meaning__synonyms']}>
          <span className={styles['definition__meaning__synonyms__title']}>Synonyms</span>

          <div className={styles['definition__meaning__synonyms__list']}>
            {meaning.synonyms.map((text) => (
              <span key={'synonym-' + text} onClick={() => onSearch(text)}>
                {text}
              </span>
            ))}
          </div>
        </div>
      )}

      {Boolean(meaning.antonyms.length) && (
        <div className={styles['definition__meaning__antonyms']}>
          <span className={styles['definition__meaning__antonyms__title']}>Antonyms</span>

          <div className={styles['definition__meaning__antonyms__list']}>
            {meaning.antonyms.map((text) => (
              <span key={'antonym-' + text} onClick={() => onSearch(text)}>
                {text}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ErrorMessage = ({ error }: { error: IWordError }) => {
  return (
    <div className={styles['error-message']}>
      <span className={styles['error-message__emoji']}>😕</span>

      <span className={styles['error-message__title']}>{error.title}</span>

      <p className={styles['error-message__resolution']}>
        {error.message} {error.resolution}
      </p>
    </div>
  );
};

export default function Definition() {
  const { wordDefinition, error } = useContext(DictionaryContext);

  if (error) return <ErrorMessage error={error} />;
  else if (wordDefinition) return <WordDefinition word={wordDefinition} />;
  else return <></>;
}
