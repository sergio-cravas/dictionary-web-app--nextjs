import { useContext } from 'react';

import { DictionaryContext } from '../../context';
import { IWord, IWordError } from '@/modules/domain/word';

import styles from './definition.module.scss';

const Definition = () => {
  const { word, error } = useContext(DictionaryContext);

  if (error) return <ErrorMessage error={error} />;
  else if (word) return <WordDefinition word={word} />;
  else return <></>;
};

const WordDefinition = ({ word }: { word: IWord }) => {
  return (
    <div className={styles.definition}>
      <h1>{word.word}</h1>
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

export { Definition };
