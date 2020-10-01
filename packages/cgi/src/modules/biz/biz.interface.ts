import { BizEntity } from './biz.entity';

export type CreateBizParams = Pick<BizEntity, 'key' | 'name' | 'logo'>;
