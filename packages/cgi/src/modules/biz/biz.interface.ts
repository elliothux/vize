import { BizEntity } from './biz.entity';

export type CreateBizParams = Pick<BizEntity, 'key' | 'name' | 'logo'>;

export interface UpdateBizParams extends Pick<BizEntity, 'name' | 'logo'> {
  libs?: string[];
}
