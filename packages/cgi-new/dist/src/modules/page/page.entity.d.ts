import { BizEntity } from 'modules/biz/biz.entity';
import { HistoryEntity } from '../history/history.entity';
export declare class PageEntity {
    id: number;
    key: string;
    createdTime: Date;
    author: string;
    layoutMode: string;
    pageMode: string;
    status: number;
    biz: BizEntity;
    latestHistory?: HistoryEntity;
}
