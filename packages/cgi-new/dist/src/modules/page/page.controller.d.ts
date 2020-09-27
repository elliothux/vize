import { PageService } from './page.service';
import { PagesParams, UpdatePageDto } from './page.interface';
export declare class PageController {
    private readonly pageService;
    constructor(pageService: PageService);
    createPage(): Promise<import("../../types").Response<any>>;
    getPages(query?: PagesParams): Promise<import("../../types").Response<import("./page.entity").PageEntity[]>>;
    getPageById(id: number): Promise<import("../../types").Response<any>>;
    updatePageInfo(id: number, updatePageDto: UpdatePageDto): Promise<import("../../types").Response<any>>;
    deletePage(id: any): Promise<import("../../types").Response<any>>;
}
