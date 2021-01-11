export type QueryParams<T extends object = {}> = T & {
  startPage?: number;
  pageSize?: number;
};
