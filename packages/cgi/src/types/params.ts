export type QueryParams<T extends object = {}> = T & {
  startPage?: number;
  pageSize?: number;
};

export type WithKeywords<T extends object = {}> = T & {
  keywords: string;
};
