export interface HistoryRecord {
  id: number;
  createdTime: Date;
  author: string;
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
}
