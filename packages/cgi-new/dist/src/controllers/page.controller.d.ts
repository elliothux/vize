import { PageService } from 'services/page.service';
export declare class PageController {
    private readonly pageService;
    constructor(pageService: PageService);
    getHello(): string;
}
