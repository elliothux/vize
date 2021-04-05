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
import { GeneratorResult, Maybe } from '@vize/types';
import { CGICodeMap, CGIResponse } from '../../utils';
import { VizeUserName } from '../../decorators';
import { PageService } from './page.service';
import {
  CreatePageDTO,
  QueryPageParams,
  UpdatePageDTO,
} from './page.interface';

let cgiPageService: Maybe<PageService> = null;

@Controller('/cgi/page')
export class PageController {
  constructor(private readonly pageService: PageService) {
    cgiPageService = pageService;
  }

  @Post()
  async createPage(@VizeUserName() username, @Body() page: CreatePageDTO) {
    if (await this.pageService.checkPageExists(page.key)) {
      return CGIResponse.failed(CGICodeMap.PageExists);
    }

    const {
      identifiers: [{ id: pageId }],
    } = await this.pageService.createPageEntity(username, page);
    const result = await this.pageService.getPageById(pageId);
    return CGIResponse.success(result);
  }

  @Get()
  async getPages(@Query() query: QueryPageParams) {
    const { pages, total } = await this.pageService.queryPageEntity(query);
    return CGIResponse.success({
      total,
      data: pages.map(page => {
        const {
          latestHistory: { id, title, desc, pageCount, createdTime },
          biz: { id: bizID },
          container,
        } = page;
        return {
          ...page,
          latestHistory: { id, title, desc, pageCount, createdTime },
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
    const result = await this.pageService.generatePage(key, true);
    return result['error']
      ? CGIResponse.failed(
          CGICodeMap.BuildFailed,
          JSON.stringify(result['error'].toString()),
        )
      : CGIResponse.success(result);
  }

  @Post('/publish/:key')
  async publishPage(@Param('key') key) {
    setTimeout(async () => {
      const result = await this.pageService.generatePage(key, false);
      if (result['error']) {
        return;
      }
      return this.pageService.publishPage(key, result as GeneratorResult);
    }, 0);
    return CGIResponse.success();
  }

  @Get('/publish/:key')
  async getPublishStatus(@Param('key') id) {
    return CGIResponse.success(this.pageService.getPublishStatus(id));
  }
}

export function getPageService() {
  return cgiPageService;
}
