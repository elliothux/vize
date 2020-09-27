import { Repository } from 'typeorm';
import { PageEntity } from './page.entity';
import { CreatePageParams, PagesParams, UpdatePageDto } from './page.interface';
export declare class PageService {
    private readonly pageRepository;
    constructor(pageRepository: Repository<PageEntity>);
    createPageEntity({ key, author, layoutMode, pageMode, biz, }: CreatePageParams): Promise<import("typeorm").InsertResult>;
    queryPageEntity({ page, pageSize }: PagesParams): Promise<PageEntity[]>;
    getPageById(id: number): Promise<PageEntity>;
    updatePage(id: number, updatePageDto: UpdatePageDto): Promise<import("typeorm").UpdateResult>;
    deletePage(id: number): Promise<import("typeorm").UpdateResult>;
    checkPageExists(key: string): Promise<boolean>;
}
