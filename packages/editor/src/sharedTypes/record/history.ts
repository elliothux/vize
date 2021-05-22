import { UserRecord } from './user';

export interface HistoryRecord {
  id: number;
  pageKey: string;
  createdTime: Date;
  title: string;
  desc: string;
  pageCount: number;
  dsl: string;
  creator?: UserRecord;
}
