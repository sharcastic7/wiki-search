import { ResponseType, PageType } from "@/types";

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const getKey = (
  pageIndex: number,
  previousPageData: ResponseType,
  key: string
) => {
  if (!key) {
    return null;
  }
  if (pageIndex === 0) {
    return `/api/getResults?search=${key}`;
  }
  if (previousPageData && previousPageData.result.continue) {
    return `/api/getResults?search=${key}&offset=${previousPageData.result.continue.gpsoffset}`;
  }
  return null;
};

export const getResultFromResponseArray = (data: ResponseType[]) => {
  return data.reduce<PageType[]>((acc, res) => {
    if (!res.result.query) {
      return acc;
    }
    const { pages } = res.result.query;
    const pageKeys = Object.keys(pages);
    pageKeys.sort((a, b) => pages[a].index - pages[b].index);
    return acc.concat(pageKeys.map((key) => pages[key]));
  }, []);
};
