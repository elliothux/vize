import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Query,
} from '@nestjs/common';
import { PageService } from './page.service';
import { CreatePageParams, PagesParams, UpdatePageDto } from './page.interface';
import { CGICodeMap, CGIResponse } from '../../utils';

@Controller('/cgi/page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Post()
  async createPage() {
    const page: CreatePageParams = {
      key: '2222',
      author: 'xunzhi',
      layoutMode: 'stream',
      pageMode: 'multi',
      biz: 1,
      status: 1,
    };

    if (await this.pageService.checkPageExists(page.key)) {
      return CGIResponse.failed(CGICodeMap.PageExists);
    }

    console.log(await this.pageService.createPageEntity(page));
    return CGIResponse.success();
  }

  @Get()
  async getPages(@Query() query: PagesParams = { page: 0, pageSize: 20 }) {
    const pages = await this.pageService.queryPageEntity(query);
    return CGIResponse.success(pages);
  }
  @Get(':id')
  async getPageById(@Param('id') id: number) {
    if (!id) {
      return CGIResponse.failed(CGICodeMap.PageNotExists);
    }

    const page = await this.pageService.getPageById(id);
    if (!page) {
      return CGIResponse.success(page, 'the page id is not found!');
    }
    return CGIResponse.success(page);
  }
  @Put(':id')
  async updatePageInfo(
    @Param('id') id: number,
    @Body() updatePageDto: UpdatePageDto,
  ) {
    const res = await this.pageService.updatePage(id, updatePageDto);
    if (!res) {
      return CGIResponse.failed(
        CGICodeMap.PageUpdateFailed,
        'the page update failed!',
      );
    }
    return CGIResponse.success();
  }

  @Delete(':id')
  async deletePage(@Param('id') id) {
    const res = await this.pageService.deletePage(id);

    if (!res) {
      return CGIResponse.failed(
        CGICodeMap.PageUpdateFailed,
        'the page update failed!',
      );
    }
    return CGIResponse.success();
  }
}
