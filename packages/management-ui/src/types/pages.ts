import { BizRecord } from './biz';

export interface PageRecord {
  id: number;
  key: string;
  createdTime: Date;
  author: string;
  layoutMode: string;
  pageMode: string;
  status: number;
  biz: BizRecord;
}
