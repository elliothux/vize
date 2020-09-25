import { Biz } from '../../types';
export declare type WithId<T> = {
    id: number;
} & T;
export interface BizRecord extends Biz {
    createdTime: Date;
    modifiedTime?: Date;
}
export interface HistoryRecord {
    page: number;
    createdTime: Date;
    author: string;
    title: string;
    desc: string;
    startTime?: Date;
    endTime?: Date;
    expiredJump?: string;
    globalProps: string;
    globalStyle: string;
    pageInstances: string;
    pluginInstances?: string;
    editInfo: string;
}
export interface PageRecord {
    key: string;
    createdTime: Date;
    author: string;
    biz: number;
    layoutMode: string;
    pageMode: string;
    latestHistory?: number;
}
