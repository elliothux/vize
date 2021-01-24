import { Response } from 'types';

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

  static failed<T = any>(code: CGICodeMap, reason?: string): Response<T> {
    return {
      t: Date.now(),
      status: 'failed',
      message: reason || CGIReasonMap[code] || `ErrorCode: ${code}`,
      code,
    };
  }
}

export enum CGICodeMap {
  BizExists = 300001,
  PageExists = 400001,
  PageNotExists = 400002,
  PageUpdateFailed = 400003,
  MaterialsNotExists = 500001,
}

const CGIReasonMap: { [key in CGICodeMap]: string } = {
  [CGICodeMap.BizExists]: 'biz exists',
  [CGICodeMap.PageExists]: 'page exists',
  [CGICodeMap.PageNotExists]: 'page not exists',
  [CGICodeMap.PageUpdateFailed]: 'page update failed',
  [CGICodeMap.MaterialsNotExists]: 'materials lib not exist',
};
