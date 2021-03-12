import { QueryParams } from '../../types';
import { PageEntity } from './page.entity';
import { HistoryEntity } from '../history/history.entity';

export interface CreatePageDTO
  extends Omit<
      PageEntity,
      'id' | 'createdTime' | 'biz' | 'status' | 'latestHistory'
    >,
    Pick<HistoryEntity, 'title' | 'desc'> {
  biz: number;
}

export interface UpdatePageDTO {
  latestHistory?: HistoryEntity;
  url?: string;
}

export type QueryPageParams = QueryParams<{
  biz?: string;
  isTemplate: string;
  keywords?: string;
}>;
