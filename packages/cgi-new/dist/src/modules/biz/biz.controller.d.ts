import { PageService } from 'modules/page/page.service';
import { BizService } from './biz.service';
export declare class BizController {
    private readonly pageService;
    private readonly bizService;
    constructor(pageService: PageService, bizService: BizService);
    createBiz(): Promise<import("../../types").Response<any>>;
}
