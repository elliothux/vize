import { HistoryService } from './history.service';
export declare class HistoryController {
    private readonly pageService;
    constructor(pageService: HistoryService);
    getHello(): string;
}
