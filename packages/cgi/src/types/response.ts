export interface Response<T> {
  t: number;
  status: 'success' | 'failed';
  message?: string;
  data?: T;
  code: number;
}

export enum PublishStatus {
  START = 'start',
  BUILD_SUCCESS = 'build_success',
  SUCCESS = 'success',
  FAILED = 'failed',
}
