import { Controller, Get, Param, Query } from '@nestjs/common';
import { Maybe } from '../../types';
import { LogService } from './log.service';
import { RequestId } from '../../decorators';
import { CGIResponse, infoRequest, infoResponse } from '../../utils';
import { QueryLogParams } from './log.interface';

let cgiLogServices: Maybe<LogService> = null;

@Controller('/cgi/log')
export class LogController {
  constructor(private readonly logService: LogService) {
    cgiLogServices = logService;
  }

  @Get('/:type')
  async queryLogs(
    @RequestId() requestId,
    @Param('type') type: 'all' | 'error',
  ) {
    infoRequest(requestId, 'log.controller.queryLogs');
    const result = await this.logService.listLogs(type);
    infoResponse(requestId, 'log.controller.queryLogs', { result });
    return CGIResponse.success(requestId, result);
  }

  @Get('/:type/:name')
  async getLogs(
    @RequestId() requestId,
    @Param('type') type: 'all' | 'error',
    @Param('name') name: string,
    @Query() { startLine }: QueryLogParams,
  ) {
    infoRequest(requestId, 'log.controller.getLogs');
    const result = await this.logService.getLogs(
      type,
      name,
      startLine ? parseInt(startLine, 10) : undefined,
    );
    infoResponse(requestId, 'log.controller.getLogs');
    return CGIResponse.success(requestId, result);
  }
}

export function getLogService() {
  return cgiLogServices;
}
