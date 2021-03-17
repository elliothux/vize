import { Response } from '../types';

export class CGIResponse {
  static success<T = any>(data?: T, msg?: string): Response<T> {
    return {
      t: Date.now(),
      status: 'success',
      message: msg,
      code: 0,
      data,
    };
  }

  static failed<T = any>(
    codeOrReason: CGICodeMap | string,
    reason?: string,
  ): Response<T> {
    if (typeof codeOrReason === 'string') {
      return {
        t: Date.now(),
        status: 'failed',
        message: codeOrReason,
        code: -1,
      };
    }
    return {
      t: Date.now(),
      status: 'failed',
      message:
        reason || CGIReasonMap[codeOrReason] || `ErrorCode: ${codeOrReason}`,
      code: codeOrReason,
    };
  }
}

export enum CGICodeMap {
  BizExists = 300001,
  BizNotExists = 300002,
  PageExists = 400001,
  PageNotExists = 400002,
  PageUpdateFailed = 400003,
  MaterialsNotExists = 500001,
  BuildFailed = 600001,
  UserExists = 700001,
  UserNotExists = 700002,
  UploadResourceCallbackError = 80001,
  DeleteResourceCallbackError = 80002,
}

const CGIReasonMap: { [key in CGICodeMap]: string } = {
  [CGICodeMap.BizExists]: 'biz exists',
  [CGICodeMap.BizNotExists]: 'biz not exists',
  [CGICodeMap.PageExists]: 'page exists',
  [CGICodeMap.PageNotExists]: 'page not exists',
  [CGICodeMap.PageUpdateFailed]: 'page update failed',
  [CGICodeMap.MaterialsNotExists]: 'materials lib not exist',
  [CGICodeMap.BuildFailed]: 'page build failed',
  [CGICodeMap.UserExists]: 'user exists',
  [CGICodeMap.UserNotExists]: 'user not exists',
  [CGICodeMap.UploadResourceCallbackError]:
    'upload resource callback occurred error',
  [CGICodeMap.DeleteResourceCallbackError]:
    'delete resource callback occurred error',
};

export type PromiseResult<T> = Promise<[null, T] | [Error, null]>;

export function promiseWrapper<T>(p: Promise<T>): PromiseResult<T> {
  return new Promise(resolve => {
    try {
      p.then(i => resolve([null, i as T])).catch(e => resolve([e, null]));
    } catch (e) {
      resolve([e, null]);
    }
  });
}
