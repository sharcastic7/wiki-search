import InfiniteLoader from "react-window-infinite-loader";
import { FixedSizeList as List } from "react-window";
import { ResultItem } from "./ResultItem";
import { PageType } from "@/types";
import { useCallback } from "react";

type ResultListProps = {
  resultItems: PageType[];
  loadMoreResults: () => void;
  hasNextPage?: boolean;
};

export const ResultList = ({
  resultItems,
  loadMoreResults,
  hasNextPage,
}: ResultListProps) => {
  const isItemLoaded = useCallback(
    (index: number) => !!resultItems?.[index],
    [resultItems]
  );

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={hasNextPage ? resultItems.length + 1 : resultItems.length}
      loadMoreItems={loadMoreResults}
      threshold={3}
    >
      {({ onItemsRendered, ref }) => (
        <List
          height={700}
          itemCount={resultItems.length}
          itemSize={142}
          width="100%"
          ref={ref}
          onItemsRendered={onItemsRendered}
        >
          {({ index, style }) => (
            <ResultItem item={resultItems[index]} style={style} />
          )}
        </List>
      )}
    </InfiniteLoader>
  );
};
