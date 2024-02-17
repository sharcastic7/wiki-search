import { PageType } from "@/types";
import styles from "../app/page.module.css";
import { ResultList } from "./ResultList";

type ShowResultsProps = {
  resultItems?: PageType[];
  loadMoreResults: () => void;
  hasNextPage?: boolean;
  isLoading: boolean;
  delayedSearch: string;
  isValidating: boolean;
};

export const ShowResults = ({
  resultItems,
  loadMoreResults,
  hasNextPage,
  isLoading,
  delayedSearch,
  isValidating,
}: ShowResultsProps) => {
  if (!delayedSearch) {
    return <h3 className={styles.subHeader}>Search Wiki for information!</h3>;
  }
  if (!resultItems) {
    if (isLoading) {
      return <h3 className={styles.subHeader}>Loading</h3>;
    }
    return <h3 className={styles.subHeader}>No results</h3>;
  }
  return (
    <>
      <h3>Search result for {delayedSearch}</h3>
      <div className={styles.resultContainer}>
        <ResultList
          resultItems={resultItems}
          loadMoreResults={loadMoreResults}
          hasNextPage={hasNextPage}
        />
        {isValidating && (
          <h3 className={styles.subHeader}>Loading more results...</h3>
        )}
      </div>
    </>
  );
};
