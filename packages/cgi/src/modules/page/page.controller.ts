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
import {
  CGICodeMap,
  CGIResponse,
  error,
  infoRequest,
  infoResponse,
  warn,
} from '../../utils';
import { UserName, RequestId } from '../../decorators';
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
  async createPage(
    @RequestId() requestId,
    @UserName() username,
    @Body() page: CreatePageDTO,
  ) {
    infoRequest(requestId, 'Page.controller.createPage', { username, page });
    if (await this.pageService.checkPageExists(page.key)) {
      warn('Page.controller.createPage', `Page already exists`, {
        requestId,
        key: page.key,
      });
      return CGIResponse.failed(requestId, CGICodeMap.PageExists);
    }

    const {
      identifiers: [{ id: pageId }],
    } = await this.pageService.createPageEntity(username, page);
    const result = await this.pageService.getPageById(pageId);
    infoResponse(requestId, 'Page.controller.createPage', { result });
    return CGIResponse.success(requestId, result);
  }

  @Get()
  async getPages(@RequestId() requestId, @Query() query: QueryPageParams) {
    infoRequest(requestId, 'Page.controller.getPages', { query });
    const { pages, total } = await this.pageService.queryPageEntity(query);
    const result = {
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
    };
    infoResponse(requestId, 'Page.controller.getPages', { result });
    return CGIResponse.success(requestId, result);
  }

  @Get(':key')
  async getPage(@RequestId() requestId, @Param('key') key: string) {
    infoRequest(requestId, 'Page.controller.getPage', { key });
    if (!key) {
      warn('Page.controller.getPage', `Page not exists`, {
        requestId,
        key,
      });
      return CGIResponse.failed(requestId, CGICodeMap.PageNotExists);
    }

    const result = await this.pageService.getPageByKey(key);
    infoResponse(requestId, 'Page.controller.getPage', { result });
    return CGIResponse.success(requestId, result);
  }

  @Put(':id')
  async updatePageInfo(
    @RequestId() requestId,
    @Param('id') id: number,
    @Body() updatePageDto: UpdatePageDTO,
  ) {
    infoRequest(requestId, 'Page.controller.updatePageInfo', {
      id,
    });
    const result = await this.pageService.updatePage(id, updatePageDto);
    if (!result) {
      error('Page.controller.updatePageInfo', 'page update failed', {
        requestId,
        id,
      });
      return CGIResponse.failed(
        requestId,
        CGICodeMap.PageUpdateFailed,
        'the page update failed!',
      );
    }
    infoResponse(requestId, 'Page.controller.updatePageInfo', { result });
    return CGIResponse.success(requestId);
  }

  @Delete(':id')
  async deletePage(@RequestId() requestId, @Param('id') id) {
    infoRequest(requestId, 'Page.controller.deletePage', {
      id,
    });
    const result = await this.pageService.deletePage(id);
    if (!result) {
      error('Page.controller.updatePageInfo', 'page update failed', {
        requestId,
        id,
      });
      return CGIResponse.failed(
        requestId,
        CGICodeMap.PageUpdateFailed,
        'the page update failed!',
      );
    }
    infoResponse(requestId, 'Page.controller.deletePage', { result });
    return CGIResponse.success(requestId, result);
  }

  @Get('/preview/:key')
  async previewPage(@RequestId() requestId, @Param('key') key) {
    infoRequest(requestId, 'Page.controller.previewPage', {
      key,
    });
    const result = await this.pageService.generatePage(key, true);
    infoResponse(requestId, 'Page.controller.previewPage', { result });
    return result['error']
      ? CGIResponse.failed(
          requestId,
          CGICodeMap.BuildFailed,
          JSON.stringify(result['error'].toString()),
        )
      : CGIResponse.success(requestId, result);
  }

  @Post('/publish/:key')
  async publishPage(@RequestId() requestId, @Param('key') key) {
    infoRequest(requestId, 'Page.controller.publishPage', {
      key,
    });
    setTimeout(async () => {
      const result = await this.pageService.generatePage(key, false);
      if (result['error']) {
        return;
      }
      return this.pageService.publishPage(key, result as GeneratorResult);
    }, 0);
    infoRequest(requestId, 'Page.controller.publishPage');
    return CGIResponse.success(requestId);
  }

  @Get('/publish/:key')
  async getPublishStatus(@RequestId() requestId, @Param('key') id) {
    infoRequest(requestId, 'Page.controller.getPublishStatus', {
      key: id,
    });
    const result = this.pageService.getPublishStatus(id);
    infoRequest(requestId, 'Page.controller.getPublishStatus', { result });
    return CGIResponse.success(requestId, result);
  }
}

export function getPageService() {
  return cgiPageService;
}
