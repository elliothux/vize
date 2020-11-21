import { getCGIJSON, prefix } from './utils';
import { BizRecord } from '../types';

export function queryBiz() {
  return getCGIJSON<BizRecord[]>(prefix('biz'));
}
