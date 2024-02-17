import { fetcher, getKey, getResultFromResponseArray } from "@/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import useSWRInfinite from "swr/infinite";
import { useDebounce } from "use-debounce";
import { ResponseType } from "@/types";

export const useSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchHistoryItems, setSearchHistoryItems] = useState<string[]>([]);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [delayedSearch] = useDebounce(search, 500);

  const { data, setSize, isValidating, isLoading } =
    useSWRInfinite<ResponseType>(
      (...args) => getKey(...args, delayedSearch),
      fetcher,
      { revalidateOnFocus: false, revalidateFirstPage: false }
    );

  const [resultItems, hasNextPage] = useMemo(
    () => [
      data ? getResultFromResponseArray(data) : undefined,
      data ? !!data[data.length - 1].result.continue : undefined,
    ],
    [data]
  );

  const onSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
    []
  );

  const addToHistory = useCallback(
    (search: string) =>
      setSearchHistoryItems((prev) => {
        const index = prev.indexOf(search);
        if (index !== -1) {
          const arr = [...prev];
          arr.splice(index, 1);
          return [...arr, search];
        }
        return [...prev, search];
      }),
    []
  );

  const loadMoreResults = useCallback(() => {
    if (!isValidating) {
      setSize((size) => size + 1);
    }
  }, [isValidating]);

  useEffect(() => {
    if (delayedSearch) {
      addToHistory(delayedSearch);
      router.push(`/?search=${delayedSearch}`);
    }
  }, [delayedSearch, addToHistory, router]);

  return {
    onSearchChange,
    searchHistoryItems,
    delayedSearch,
    search,
    hasNextPage,
    resultItems,
    isValidating,
    loadMoreResults,
    isLoading,
  };
};
