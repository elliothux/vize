import { Body, Controller, Param, Query, Get, Post } from '@nestjs/common';
import {
  CGICodeMap,
  CGIResponse,
  infoRequest,
  infoResponse,
  warn,
} from '../../utils';
import { Maybe, WithKeywords } from '../../types';
import { RequestId } from '../../decorators';
import { BizService } from './biz.service';
import { CreateBizParams, UpdateBizParams } from './biz.interface';

let cgiBizServices: Maybe<BizService> = null;

@Controller('/cgi/biz')
export class BizController {
  constructor(private readonly bizService: BizService) {
    cgiBizServices = bizService;
  }

  @Get()
  async queryBiz(@RequestId() requestId, @Query() { keywords }: WithKeywords) {
    infoRequest(requestId, 'biz.controller.queryBiz', { keywords });
    const result = await this.bizService.queryBizEntities({ keywords });
    infoResponse(requestId, 'biz.controller.queryBiz', { result });
    return CGIResponse.success(requestId, result);
  }

  @Post()
  async createBiz(@RequestId() requestId, @Body() biz: CreateBizParams) {
    infoRequest(requestId, 'biz.controller.createBiz', biz);
    if (await this.bizService.checkBizExists(biz.key)) {
      warn('biz.controller.createBiz', 'Biz already exists', {
        requestId,
        biz,
      });
      return CGIResponse.failed(requestId, CGICodeMap.BizExists);
    }

    const result = await this.bizService.createBizEntity(biz);
    infoResponse(requestId, 'biz.controller.createBiz', { result });
    return CGIResponse.success(requestId, result);
  }

  @Post('/:id')
  async updateBiz(
    @RequestId() requestId,
    @Body() biz: UpdateBizParams,
    @Param('id') id: string,
  ) {
    infoRequest(requestId, 'biz.controller.updateBiz', { id, biz });
    if (!(await this.bizService.checkBizExistsById(parseInt(id)))) {
      warn('biz.controller.updateBiz', 'Biz not exists', { requestId, id });
      return CGIResponse.failed(requestId, CGICodeMap.BizNotExists);
    }

    const result = await this.bizService.updateBizEntity(parseInt(id), biz);
    infoResponse(requestId, 'biz.controller.updateBiz', { result });
    return CGIResponse.success(requestId, result);
  }
}

export function getBizService() {
  return cgiBizServices;
}
