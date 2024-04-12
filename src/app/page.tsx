'use client';

import { Header, SearchInput, Definition } from './_shared/components';

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
