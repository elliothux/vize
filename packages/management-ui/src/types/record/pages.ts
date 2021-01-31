import { BizRecord } from './biz';
import { HistoryRecord } from './history';

export interface PageRecord {
  id: number;
  key: string;
  createdTime: Date;
  author: string;
  layoutMode: string;
  pageMode: string;
  generator?: string;
  isTemplate: number;
  container: {
    lib: string;
    name: string;
  };
  status: number;
  biz: Pick<BizRecord, 'id'>;
  latestHistory: Pick<HistoryRecord, 'id' | 'title' | 'desc' | 'author' | 'createdTime'>;
}

export interface PageRecordWithHistory extends PageRecord {
  latestHistory: HistoryRecord;
}
