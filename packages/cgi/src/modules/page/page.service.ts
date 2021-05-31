import { Injectable } from '@nestjs/common';
import { FindManyOptions, Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DSL, PublisherResult } from '@vize/types';
import { PageEntity } from './page.entity';
import {
  CreatePageDTO,
  QueryPageParams,
  UpdatePageDTO,
} from './page.interface';
import {
  PublishStatus,
  GeneratorResult,
  Maybe,
  RecordStatus,
} from '../../types';
import { UserEntity } from '../user/user.entity';
import { HistoryEntity } from '../history/history.entity';
import { getConfig, info as logInfo, error as logError } from '../../utils';
import {
  PublishStatusResponse,
  getPublishStatus,
  dslMap,
  setPublishStatus,
  createPreviewSoftlink,
} from './page.utils';
import { HistoryService } from '../history/history.service';

@Injectable()
export class PageService {
  constructor(
    private readonly historyService: HistoryService,
    @InjectRepository(PageEntity)
    private readonly pageRepository: Repository<PageEntity>,
    @InjectRepository(HistoryEntity)
    private readonly historyRepository: Repository<HistoryEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async createPageEntity(
    username: string,
    {
      key,
      layoutMode,
      pageMode,
      biz,
      title,
      desc = '',
      isTemplate,
      container,
      generator,
    }: CreatePageDTO,
  ) {
    const createdTime = new Date();

    const { id: owner } = await this.userRepository.findOne({ name: username });
    const {
      identifiers: [{ id: latestHistory }],
    } = await this.historyRepository.insert({
      pageKey: key,
      createdTime,
      title,
      desc,
      dsl: '{}',
      creator: { id: owner },
    });

    return this.pageRepository.insert({
      key,
      createdTime,
      layoutMode,
      pageMode,
      isTemplate,
      generator,
      container,
      owner: { id: owner },
      biz: { id: biz },
      latestHistory: { id: latestHistory },
    });
  }

  public async updateLatestHistory(pageKey: string, historyId: number) {
    const {
      latestHistory: { id: currentHistoryId },
    } = await this.getPageByKey(pageKey);

    await this.historyRepository.update(
      { id: currentHistoryId },
      { status: RecordStatus.NOT_USED },
    );

    return this.pageRepository.update(
      {
        key: pageKey,
      },
      { latestHistory: { id: historyId } },
    );
  }

  public async queryPageEntity({
    startPage = 0,
    pageSize = 20,
    biz,
    isTemplate,
    keywords,
  }: QueryPageParams) {
    const where = {
      isTemplate: parseInt(isTemplate),
    };
    if (biz) {
      where['biz'] = parseInt(biz);
    }

    if (keywords) {
      const keys = await this.historyService.searchHistoryPageKeys(keywords);
      where['key'] = In(keys);
    }

    const options: FindManyOptions<PageEntity> = {
      order: {
        createdTime: 'DESC',
      },
      take: pageSize,
      skip: startPage * pageSize,
      relations: ['latestHistory', 'biz', 'owner'],
      where,
    };

    return {
      pages: await this.pageRepository.find(options),
      total: await this.pageRepository.count({ where }),
    };
  }

  public getPageById(id: number) {
    return this.pageRepository.findOne(id, {
      relations: ['biz'],
    });
  }

  public getPageByKey(key: string) {
    return this.pageRepository.findOne(
      { key },
      { relations: ['latestHistory', 'owner'] },
    );
  }

  public updatePageByKey(key: string, updatePageDto: UpdatePageDTO) {
    return this.pageRepository.update({ key }, updatePageDto);
  }

  public updatePage(id: number, updatePageDto: UpdatePageDTO) {
    return this.pageRepository.update(id, updatePageDto);
  }

  public deletePage(id: number) {
    return this.pageRepository.update(id, { status: RecordStatus.DELETED });
  }

  public async checkPageExists(key: string) {
    const count = await this.pageRepository.count({ key });
    return count > 0;
  }

  public async publishPage(
    key: string,
    generatorResult: GeneratorResult,
  ): Promise<PublisherResult | { error: Error }> {
    const { publishers, paths: workspacePaths } = getConfig();
    // TODO: support custom publisher
    const { publisher, info } = publishers['web']!;
    logInfo(
      'page.service.publishPage',
      `Start publish page "${key}" with publisher: "${info.name}"`,
    );

    const dsl = dslMap.get(key)!;
    dslMap.delete(key);
    let result: Maybe<PublisherResult> = null;
    try {
      result = await publisher({
        dsl,
        workspacePaths,
        generatorResult,
      });
    } catch (e) {
      const error = e || `Unknown publish error with publisher: "${info.name}"`;
      logError('page.service.publishPage', `Publish page "${key}" error`, {
        error,
      });
      setPublishStatus(key, PublishStatus.FAILED, error);
      return { error };
    }

    logInfo('page.service.publishPage', `Publish page "${key}" success`);
    const publisherResult = {
      ...result,
      url: `/p/${key}`,
    };
    if (result.type === 'url') {
      await this.updatePageByKey(key, { url: result.url! });
    }
    setPublishStatus(key, PublishStatus.SUCCESS, null, publisherResult);
    return publisherResult;
  }

  public async generatePage(
    key: string,
    isPreview: boolean,
  ): Promise<GeneratorResult | { error: Error }> {
    setPublishStatus(key, PublishStatus.START);

    const {
      generator: generatorName,
      latestHistory: { dsl: dslString },
    } = await this.getPageByKey(key);
    const dsl = JSON.parse(dslString) as DSL;
    dslMap.set(key, dsl);

    const { generators, paths: workspacePaths } = getConfig();
    const generator = generators[generatorName || 'web'];
    if (!generator) {
      const error = `Generator "${generatorName || 'web'}" does not exists`;
      logError('page.service.generatePage', error);
      return {
        error: new Error(error),
      };
    }

    logInfo(
      'page.service.generatePage',
      `Start generate page "${key}" with generator: "${generator.info.name}"`,
    );
    let result: Maybe<GeneratorResult> = null;
    try {
      result = await generator.generator({
        dsl,
        workspacePaths,
        isPreview,
      });
    } catch (e) {
      const error =
        e || `Unknown generate error with generator "${generator.info.name}"`;
      logError(
        'page.service.generatePage',
        `Generate page "${key}" with error: `,
        { error },
      );
      setPublishStatus(key, PublishStatus.FAILED, error);
      return { error };
    }

    logInfo('page.service.generatePage', `Generate page "${key}" success`);
    if (isPreview && result.type === 'file') {
      await createPreviewSoftlink(key, result.path);
      result['url'] = `/preview/${key}`;
    }
    setPublishStatus(key, PublishStatus.BUILD_SUCCESS, null, result);
    return result;
  }

  public getPublishStatus(key: string): Maybe<PublishStatusResponse> {
    return getPublishStatus(key);
  }
}
