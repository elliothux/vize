import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CGICodeMap, CGIResponse } from 'utils';
import { PageService } from 'modules/page/page.service';
import { BizService } from './biz.service';
import { CreateBizParams, UpdateBizParams } from './biz.interface';
import { QueryParams } from '../../types';

@Controller('/cgi/biz')
export class BizController {
  constructor(
    private readonly pageService: PageService,
    private readonly bizService: BizService,
  ) {}

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

    console.log(
      await this.bizService.updateBizEntity(parseInt(id), biz),
      this.pageService,
    );
    return CGIResponse.success();
  }

  @Get()
  async queryBiz(@Query() query: QueryParams<{ withMaterials?: string }>) {
    const result = await this.bizService.queryBizEntities(query);
    return CGIResponse.success(result);
  }
}
