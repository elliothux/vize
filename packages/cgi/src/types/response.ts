export interface Response<T> {
  t: number;
  status: 'success' | 'failed';
  message?: string;
  data?: T;
  code: number;
}

export enum BuildStatus {
  START = 'start',
  SUCCESS = 'success',
  FAILED = 'failed',
}
