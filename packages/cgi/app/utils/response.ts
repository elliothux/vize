import { Response } from 'types';

export class CGIResponse {
  static success<T = any>(data?: T): Response<T> {
    return {
      t: Date.now(),
      status: 'success',
      data,
    };
  }

  static failed<T = any>(code: number, reason: string): Response<T> {
    return {
      t: Date.now(),
      status: 'failed',
      error: {
        code,
        reason,
      },
    };
  }
}
