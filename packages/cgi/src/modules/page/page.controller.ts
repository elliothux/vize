import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PageService } from './page.service';
import { CreatePageDTO, UpdatePageDTO } from './page.interface';
import { CGICodeMap, CGIResponse } from '../../utils';
import { QueryParams, Maybe } from '../../types';

let cgiPageService: Maybe<PageService> = null;

@Controller('/cgi/page')
export class PageController {
  constructor(private readonly pageService: PageService) {
    cgiPageService = pageService;
  }

  @Post()
  async createPage(@Body() page: CreatePageDTO) {
    if (await this.pageService.checkPageExists(page.key)) {
      return CGIResponse.failed(CGICodeMap.PageExists);
    }

    const {
      identifiers: [{ id: pageId }],
    } = await this.pageService.createPageEntity(page);
    const result = await this.pageService.getPageById(pageId);
    return CGIResponse.success(result);
  }

  @Get()
  async getPages(
    @Query() query: QueryParams<{ biz?: string; isTemplate: string }>,
  ) {
    const { pages, total } = await this.pageService.queryPageEntity(query);
    return CGIResponse.success({
      total,
      data: pages.map(page => {
        const {
          latestHistory: { id, title, desc, author, createdTime },
          biz: { id: bizID },
          container,
        } = page;
        return {
          ...page,
          latestHistory: { id, title, desc, author, createdTime },
          biz: { id: bizID },
          container: JSON.parse(container),
        };
      }),
    });
  }

  @Get(':key')
  async getPage(@Param('key') key: string) {
    if (!key) {
      return CGIResponse.failed(CGICodeMap.PageNotExists);
    }

    const result = await this.pageService.getPageByKey(key);
    return CGIResponse.success(result);
  }

  @Put(':id')
  async updatePageInfo(
    @Param('id') id: number,
    @Body() updatePageDto: UpdatePageDTO,
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

  @Get('/preview/:key')
  async previewPage(@Param('key') key) {
    const result = await this.pageService.buildPage(key, true);
    return result.error
      ? CGIResponse.failed(CGICodeMap.BuildFailed, JSON.stringify(result.error))
      : CGIResponse.success(result);
  }

  @Post('/publish/:key')
  async publishPage(@Param('key') key) {
    setTimeout(() => this.pageService.buildPage(key, false), 0);
    return CGIResponse.success();
  }

  @Get('/publish/:key')
  async getBuildStatus(@Param('key') id) {
    return CGIResponse.success(this.pageService.getBuildStatus(id));
  }
}

export function getPageService() {
  return cgiPageService;
}
