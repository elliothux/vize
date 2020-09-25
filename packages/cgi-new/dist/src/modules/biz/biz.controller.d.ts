import { BizService } from './biz.service';
import { PageService } from '../page/page.service';
export declare class BizController {
    private readonly pageService;
    private readonly bizService;
    constructor(pageService: PageService, bizService: BizService);
    getHello(): any;
}
