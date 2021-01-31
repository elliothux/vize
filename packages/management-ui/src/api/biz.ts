import { BizRecord } from 'types';
import { getCGIJSON, postCGIJSON, prefix } from './utils';

export function queryBiz() {
  return getCGIJSON<BizRecord[]>(prefix('biz', { withMaterials: '1' }));
}

export type CreateBizParams = Pick<BizRecord, 'key' | 'name' | 'logo'>;

export function createBiz(biz: CreateBizParams) {
  return postCGIJSON(prefix('biz'), biz);
}

export interface UpdateBizParams extends Pick<BizRecord, 'name' | 'logo'> {
  materials?: string[];
}

export function updateBiz(id: number, biz: UpdateBizParams) {
  return postCGIJSON(prefix(`biz/${id}`), biz);
}
