import { Body, Controller, Post } from '@nestjs/common';
import { CGIResponse } from 'utils';
import { HistoryService } from './history.service';
import { CreateHistoryDTO } from './history.interface';
import { PageService } from '../page/page.service';

@Controller('/cgi/history')
export class HistoryController {
  constructor(
    private readonly historyService: HistoryService,
    private readonly pageService: PageService,
  ) {}

  @Post()
  async createHistory(@Body() dsl: CreateHistoryDTO) {
    const {
      identifiers: [{ id: historyId }],
    } = await this.historyService.createHistory(dsl);
    const result = this.pageService.updateLatestHistory(dsl.pageKey, historyId);
    return CGIResponse.success(result);
  }
}
