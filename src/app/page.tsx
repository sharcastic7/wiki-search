"use client";

import { ShowResults } from "@/components/ShowResults";
import styles from "./page.module.css";
import { useSearch } from "@/hooks/useSearch";
import { ShowSearchHistory } from "@/components/ShowSearchHistory";

export default function Home() {
  const {
    delayedSearch,
    onSearchChange,
    searchHistoryItems,
    search,
    hasNextPage,
    loadMoreResults,
    resultItems,
    isValidating,
    isLoading,
  } = useSearch();

  return (
    <main className={styles.main}>
      <section className={styles.searchSection}>
        <div className={styles.sectionHeader}>
          <h1>Search Wiki here!</h1>
          <input
            type="text"
            value={search}
            onChange={onSearchChange}
            className={styles.textbox}
          />
        </div>
        <ShowResults
          delayedSearch={delayedSearch}
          isLoading={isLoading}
          loadMoreResults={loadMoreResults}
          resultItems={resultItems}
          hasNextPage={hasNextPage}
          isValidating={isValidating}
        />
      </section>
      <aside className={styles.aside}>
        <ShowSearchHistory items={searchHistoryItems} />
      </aside>
    </main>
  );
}
