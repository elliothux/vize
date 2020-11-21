import { Controller, Get, Post } from '@nestjs/common';
import { CGICodeMap, CGIResponse } from 'utils';
import { PageService } from 'modules/page/page.service';
import { BizService } from './biz.service';
import { CreateBizParams } from './biz.interface';

@Controller('/cgi/biz')
export class BizController {
  constructor(
    private readonly pageService: PageService,
    private readonly bizService: BizService, // private readonly pageModule: PageModule,
  ) {}

  @Post()
  async createBiz() {
    const biz: CreateBizParams = {
      key: 'test',
      name: '测试业务',
      logo: 'https://image.flaticon.com/icons/png/128/3428/3428693.png',
    };

    if (await this.bizService.checkBizExists(biz.key)) {
      return CGIResponse.failed(CGICodeMap.BizExists);
    }

    console.log(await this.bizService.createBizEntity(biz), this.pageService);
    return CGIResponse.success();
  }

  @Get()
  async queryBiz() {
    const result = await this.bizService.queryBizEntities({});
    return CGIResponse.success(result);
  }
}
