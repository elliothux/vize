import { fetchCGIJSON, prefix } from './utils';
import { BizRecord } from '../types';

export function queryBiz() {
  return fetchCGIJSON<BizRecord[]>(prefix('biz'));
}
