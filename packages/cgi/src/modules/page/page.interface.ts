import { PageEntity } from './page.entity';
import { HistoryEntity } from '../history/history.entity';

export interface CreatePageDTO
  extends Omit<PageEntity, 'id' | 'createdTime' | 'biz'> {
  biz: number;
}

export interface UpdatePageDTO {
  author?: string;
  latestHistory?: HistoryEntity;
}
