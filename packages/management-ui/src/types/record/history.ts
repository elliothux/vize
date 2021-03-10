import { UserRecord } from './user';

export interface HistoryRecord {
  id: number;
  createdTime: Date;
  title: string;
  desc: string;
  startTime?: Date;
  endTime?: Date;
  expiredJump?: string;
  globalProps: string;
  globalStyle: string;
  pageInstances: string;
  pluginInstances?: string;
  sharedComponentInstances?: string;
  maxKeys?: string;
  creator?: UserRecord;
}
