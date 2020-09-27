import { BizEntity } from 'modules/biz/biz.entity';
export declare class PageEntity {
    id: number;
    key: string;
    createdTime: Date;
    author: string;
    layoutMode: string;
    pageMode: string;
    biz: BizEntity;
}
