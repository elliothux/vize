import { Controller, Get, Param } from '@nestjs/common';
import { HistoryService } from './history.service';

@Controller('/cgi/history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  getHistory(@Param('pageId') pageId: number) {
    return this.historyService.getHistoryById(pageId);
  }
}
