import styles from "../app/page.module.css";

type SearchHistoryProps = {
  items: string[];
};

export const ShowSearchHistory = ({ items }: SearchHistoryProps) => {
  return (
    <>
      <h3 className={styles.subHeader}>Search History</h3>
      {items.length ? (
        <ul className={styles.historyList}>
          {items.map((search) => (
            <li key={search}>{search}</li>
          ))}
        </ul>
      ) : (
        <p>No history</p>
      )}
    </>
  );
};
