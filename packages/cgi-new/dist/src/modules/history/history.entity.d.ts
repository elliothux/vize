import { PageEntity } from '../page/page.entity';
export declare class HistoryEntity {
    id: number;
    page: PageEntity;
    createdTime: Date;
    author: string;
    title: string;
    desc: string;
    startTime: Date;
    endTime: Date;
    expiredJump: string;
    globalProps: string;
    globalStyle: string;
    pageInstances: string;
    pluginInstances: string;
    editInfo: string;
}
