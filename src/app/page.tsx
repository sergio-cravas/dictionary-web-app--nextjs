'use client';

import Header from './_shared/components/Header/header';
import Definition from './_shared/components/Definition/definition';
import SearchInput from './_shared/components/SearchInput/searchInput';

import styles from './page.module.scss';

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />

      <SearchInput />

      <Definition />
    </main>
  );
}
