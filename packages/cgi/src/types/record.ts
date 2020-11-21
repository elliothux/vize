export type WithId<T> = {
  id: number;
} & T;

export enum RecordStatus {
  CREATED = 1,
  PUBLISHED = 2,
  DELETED = -1,
}
