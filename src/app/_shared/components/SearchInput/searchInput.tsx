import { useCallback, useContext, useState } from 'react';

import debounce from 'lodash.debounce';
import { DictionaryContext } from '../../context';

import { SearchIcon } from '@/assets/images/icon-search';

import styles from './searchInput.module.scss';

const SearchInput = () => {
  const { findWord } = useContext(DictionaryContext);

  const [value, setValue] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  const handleOnUpdateContext = debounce((text: string) => {
    findWord(text);

    if (!Boolean(text)) setIsError(true);
  }, 500);

  const handleOnChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;

    if (Boolean(text)) setIsError(false);

    setValue(text);
    handleOnUpdateContext(text);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={[styles['search-input'], isError && styles['search-input--error']].join(' ')}>
      <input value={value} placeholder="Search for any word..." onChange={handleOnChange} />
      <SearchIcon className={styles['search-input__search-icon']} />

      {isError && <span className={styles['search-input__error-message']}>Whoops, can&apos;t be empty</span>}
    </div>
  );
};

export { SearchInput };
