import { Body, Controller, Post } from '@nestjs/common';
import { Maybe } from '../../types';
import { CGIResponse } from '../../utils';
import { HistoryService } from './history.service';
import { CreateHistoryDTO } from './history.interface';
import { PageService } from '../page/page.service';
import { VizeUserName } from '../../decorators';

let cgiHistoryServices: Maybe<HistoryService> = null;

@Controller('/cgi/history')
export class HistoryController {
  constructor(
    private readonly historyService: HistoryService,
    private readonly pageService: PageService,
  ) {
    cgiHistoryServices = historyService;
  }

  @Post()
  async createHistory(@VizeUserName() username, @Body() dsl: CreateHistoryDTO) {
    const {
      identifiers: [{ id: historyId }],
    } = await this.historyService.createHistory(username, dsl);
    const result = await this.pageService.updateLatestHistory(
      dsl.pageKey,
      historyId,
    );
    return CGIResponse.success(result);
  }
}

export function getHistoryService() {
  return cgiHistoryServices;
}
