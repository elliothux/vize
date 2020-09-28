import { PageEntity } from './page.entity';
import { HistoryEntity } from '../history/history.entity';
export interface CreatePageParams extends Omit<PageEntity, 'id' | 'createdTime' | 'biz'> {
    biz: number;
}
export interface PagesParams {
    page: number;
    pageSize: number;
}
export interface UpdatePageDto {
    anthor: string;
    latestHistory?: HistoryEntity;
}
