import { Controller, Get } from '@nestjs/common';
import { HistoryService } from './history.service';

@Controller('/cgi/history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  getHello(): string {
    return this.historyService.getHello();
  }
}
