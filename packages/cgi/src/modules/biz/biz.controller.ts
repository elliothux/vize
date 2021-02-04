import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CGICodeMap, CGIResponse } from 'utils';
import { BizService } from './biz.service';
import { CreateBizParams, UpdateBizParams } from './biz.interface';
import { QueryParams } from '../../types';

@Controller('/cgi/biz')
export class BizController {
  constructor(private readonly bizService: BizService) {}

  @Post()
  async createBiz(@Body() biz: CreateBizParams) {
    if (await this.bizService.checkBizExists(biz.key)) {
      return CGIResponse.failed(CGICodeMap.BizExists);
    }

    const result = await this.bizService.createBizEntity(biz);
    return CGIResponse.success(result);
  }

  @Post('/:id')
  async updateBiz(@Body() biz: UpdateBizParams, @Param('id') id: string) {
    if (!(await this.bizService.checkBizExistsById(parseInt(id)))) {
      return CGIResponse.failed(CGICodeMap.BizNotExists);
    }

    const result = await this.bizService.updateBizEntity(parseInt(id), biz);
    return CGIResponse.success(result);
  }

  @Get()
  async queryBiz(@Query() query: QueryParams) {
    const result = await this.bizService.queryBizEntities(query);
    console.log('result', result);
    return CGIResponse.success(result);
  }
}
