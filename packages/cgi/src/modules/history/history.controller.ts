import { Body, Controller, Post } from '@nestjs/common';
import { Maybe } from '../../types';
import { CGIResponse, infoRequest, infoResponse } from '../../utils';
import { RequestId, UserName } from '../../decorators';
import { PageService } from '../page/page.service';
import { HistoryService } from './history.service';
import { CreateHistoryDTO } from './history.interface';

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
  async createHistory(
    @UserName() username,
    @RequestId() requestId,
    @Body() dsl: CreateHistoryDTO,
  ) {
    infoRequest(requestId, 'history.controller.createHistory', {
      username,
    });
    const {
      identifiers: [{ id: historyId }],
    } = await this.historyService.createHistory(username, dsl);
    const result = await this.pageService.updateLatestHistory(
      dsl.pageKey,
      historyId,
    );
    infoResponse(requestId, 'history.controller.createHistory', { result });
    return CGIResponse.success(requestId, result);
  }
}

export function getHistoryService() {
  return cgiHistoryServices;
}
