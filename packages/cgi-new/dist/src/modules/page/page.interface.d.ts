import { PageEntity } from './page.entity';
export interface CreatePageParams extends Omit<PageEntity, 'id' | 'createdTime' | 'biz'> {
    biz: number;
}
