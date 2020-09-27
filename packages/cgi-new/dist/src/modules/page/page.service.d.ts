import { Repository } from 'typeorm';
import { PageEntity } from './page.entity';
import { CreatePageParams } from './page.interface';
export declare class PageService {
    private readonly pageRepository;
    constructor(pageRepository: Repository<PageEntity>);
    createPageEntity({ key, author, layoutMode, pageMode, biz, }: CreatePageParams): Promise<import("typeorm").InsertResult>;
    checkPageExists(key: string): Promise<boolean>;
}
