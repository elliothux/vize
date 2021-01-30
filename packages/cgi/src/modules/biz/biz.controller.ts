import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CGICodeMap, CGIResponse } from 'utils';
import { PageService } from 'modules/page/page.service';
import { BizService } from './biz.service';
import { CreateBizParams, UpdateBizParams } from './biz.interface';

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

    console.log(await this.bizService.createBizEntity(biz), this.pageService);
    return CGIResponse.success();
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
  async queryBiz() {
    const result = await this.bizService.queryBizEntities({});
    return CGIResponse.success(
      result.map(i => ({ ...i, libs: i.libs.split(',').map(i => i.trim()) })),
    );
  }
}
