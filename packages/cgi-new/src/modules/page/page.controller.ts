import { Controller, Get, Post } from '@nestjs/common';
import { PageService } from './page.service';
import { CreatePageParams, PagesParams } from './page.interface';
import { CGICodeMap, CGIResponse } from '../../utils';

@Controller('/cgi/page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Post()
  async createPage() {
    const page: CreatePageParams = {
      key: 'test2',
      author: 'qy',
      layoutMode: 'stream',
      pageMode: 'multi',
      biz: 3,
    };

    if (await this.pageService.checkPageExists(page.key)) {
      return CGIResponse.failed(CGICodeMap.BizExists);
    }

    console.log(await this.pageService.createPageEntity(page));
    return CGIResponse.success();
  }

  @Get()
  async getPages() {
    const params: PagesParams = {
      page: 0,
      pageSize: 20,
    };

    const pages = this.pageService.queryPageEntity(params);
    return CGIResponse.success(pages);
  }
  @Get()
  async getPageById(id: number) {
    if (!id) {
      return CGIResponse.failed(CGICodeMap.PageNotExists);
    }

    const page = this.pageService.getPageById(id);
    return CGIResponse.success(page);
  }
}
