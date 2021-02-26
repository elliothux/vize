import { BizRecord } from 'types';
import { getCGIJSON, postCGIJSON, prefix } from './utils';

export function queryBiz() {
  return getCGIJSON<BizRecord[]>(prefix('biz'));
}

export type CreateBizParams = Pick<BizRecord, 'key' | 'name' | 'logo' | 'materials'>;

export function createBiz(biz: CreateBizParams) {
  return postCGIJSON(prefix('biz'), biz);
}

export type UpdateBizParams = Omit<CreateBizParams, 'key'>;

export function updateBiz(id: number, biz: UpdateBizParams) {
  return postCGIJSON(prefix(`biz/${id}`), biz);
}
