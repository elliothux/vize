import { BizRecord } from './biz';
import { HistoryRecord } from './history';
import { UserRecord } from './user';

export interface PageRecord {
  id: number;
  key: string;
  createdTime: Date;
  layoutMode: string;
  pageMode: string;
  isTemplate: number;
  generator?: string;
  container: {
    lib: string;
    name: string;
  };
  url?: string;
  status: number;
  owner: UserRecord;
  biz: Pick<BizRecord, 'id'>;
}

export interface PageRecordWithHistory extends PageRecord {
  latestHistory?: HistoryRecord;
}
