import { BizEntity } from './biz.entity';

export type CreateBizParams = Pick<
  BizEntity,
  'materials' | 'key' | 'name' | 'logo'
>;

export type UpdateBizParams = Omit<CreateBizParams, 'key'>;
