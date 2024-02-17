export type PageType = {
  pageid: number;
  ns: number;
  title: string;
  index: number;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
  description?: string;
  descriptionsource?: string;
};

export type ResponseType = {
  result: WikiResponseType;
};

export type WikiResponseType = {
  batchcomplete?: string;
  continue?: {
    gpsoffset: number;
    continue: string;
  };
  query?: {
    pages: Record<string, PageType>;
  };
};
