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

export interface TemplatePageRecord extends PageRecord {
  isTemplate: true;
}
