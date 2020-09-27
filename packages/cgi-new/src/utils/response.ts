import { Response } from 'types';

export class CGIResponse {
  static success<T = any>(data?: T): Response<T> {
    return {
      t: Date.now(),
      status: 'success',
      data,
    };
  }

  static failed<T = any>(code: CGICodeMap, reason?: string): Response<T> {
    return {
      t: Date.now(),
      status: 'failed',
      error: {
        code,
        reason: reason || CGIReasonMap[code] || `ErrorCode: ${code}`,
      },
    };
  }
}

export enum CGICodeMap {
  BizExists,
  PageExists,
}

const CGIReasonMap: { [key in CGICodeMap]: string } = {
  [CGICodeMap.BizExists]: 'biz exists',
  [CGICodeMap.PageExists]: 'page exists',
};
