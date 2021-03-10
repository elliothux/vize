import * as path from 'path';
import * as fs from 'fs-extra';
import { Injectable } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DSL, PublisherResult } from '@vize/types';
import { PageEntity } from './page.entity';
import { CreatePageDTO, UpdatePageDTO } from './page.interface';
import {
  PublishStatus,
  GeneratorResult,
  Maybe,
  QueryParams,
  RecordStatus,
} from '../../types';
import { HistoryEntity } from '../history/history.entity';
import { generateDSL, getConfig } from '../../utils';

type PublishStatusResponse = [
  PublishStatus,
  Maybe<GeneratorResult | PublisherResult>,
  Maybe<Error>,
];

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(PageEntity)
    private readonly pageRepository: Repository<PageEntity>,
    @InjectRepository(HistoryEntity)
    private readonly historyRepository: Repository<HistoryEntity>,
  ) {}

  public async createPageEntity({
    key,
    author,
    layoutMode,
    pageMode,
    biz,
    title,
    desc = '',
    isTemplate,
    container,
    generator,
  }: CreatePageDTO) {
    const createdTime = new Date();

    const {
      identifiers: [{ id: latestHistory }],
    } = await this.historyRepository.insert({
      title,
      desc,
      createdTime,
      author,
      globalProps: '{}',
      globalStyle: '{}',
      pageInstances: '[]',
    });

    return this.pageRepository.insert({
      key,
      createdTime,
      author,
      layoutMode,
      pageMode,
      isTemplate,
      generator,
      container,
      biz: { id: biz },
      latestHistory: { id: latestHistory },
    });
  }

  public async updateLatestHistory(pageKey: string, historyId: number) {
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
  }: QueryParams<{ biz?: string; isTemplate: string }>) {
    const where = {
      isTemplate: parseInt(isTemplate),
    };
    if (biz) {
      where['biz'] = parseInt(biz);
    }

    const options: FindManyOptions<PageEntity> = {
      order: {
        createdTime: 'DESC',
      },
      take: pageSize,
      skip: startPage * pageSize,
      relations: ['latestHistory', 'biz'],
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
      { relations: ['latestHistory'] },
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
    console.log('Start build use publisher: ', info.name);

    let result: Maybe<PublisherResult> = null;
    try {
      result = await publisher({
        dsl: this.dslMap.get(key)!,
        workspacePaths,
        generatorResult,
      });
    } catch (e) {
      const error = e || `Unknown publish error with publisher: ${info.name}`;
      console.error('Build with error: ', error);
      this.publishStatus.set(key, [PublishStatus.FAILED, null, error]);
      return { error };
    }

    const publisherResult = {
      ...result,
      error: null,
    };
    if (result.type === 'url') {
      await this.updatePageByKey(key, { url: result.url! });
    }
    this.publishStatus.set(key, [PublishStatus.SUCCESS, publisherResult, null]);
    return publisherResult;
  }

  public async buildPage(
    key: string,
    isPreview: boolean,
  ): Promise<GeneratorResult | { error: Error }> {
    this.publishStatus.set(key, [PublishStatus.START, null, null]);
    const page = await this.getPageByKey(key)!;
    const dsl = generateDSL(page);
    this.dslMap.set(key, dsl);

    const { generators, paths: workspacePaths } = getConfig();
    const { generator, info } = generators[page.generator || 'web']!;
    console.log('Start build use generator: ', info.name);

    let result: Maybe<GeneratorResult> = null;
    try {
      result = await generator({
        dsl,
        workspacePaths,
        isPreview,
      });
    } catch (e) {
      const error = e || `Unknown build error with generator: ${info.name}`;
      console.error('Build with error: ', error);
      this.publishStatus.set(key, [PublishStatus.FAILED, null, error]);
      return { error };
    }

    const generatorResult = {
      ...result,
      error: null,
    };
    if (result.type === 'file') {
      await PageService.createPreviewSoftlink(key, result.path);
      generatorResult['url'] = `/preview/${key}`;
    }
    this.publishStatus.set(key, [
      PublishStatus.BUILD_SUCCESS,
      generatorResult,
      null,
    ]);
    return generatorResult;
  }

  static async createPreviewSoftlink(key: string, distPath: string) {
    const {
      paths: { previewPath },
    } = getConfig();
    const to = path.resolve(previewPath, key);
    return fs.ensureSymlink(distPath, to);
  }

  public getBuildStatus(key: string): Maybe<PublishStatusResponse> {
    return this.publishStatus.get(key);
  }

  private readonly publishStatus = new Map<string, PublishStatusResponse>();

  private readonly dslMap = new Map<string, DSL>();
}
