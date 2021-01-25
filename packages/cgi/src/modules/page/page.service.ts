import { Injectable } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PageEntity } from './page.entity';
import { CreatePageDTO, UpdatePageDTO } from './page.interface';
import { BuildStatus, Maybe, QueryParams, RecordStatus } from 'types';
import { HistoryEntity } from '../history/history.entity';
import { generateDSL, getConfig } from 'utils';

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
  }: CreatePageDTO) {
    const createdTime = new Date();

    const {
      identifiers: [latestHistory],
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
      biz: { id: biz },
      latestHistory,
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
  }: QueryParams<{ biz?: number }>) {
    const where = biz ? { biz } : undefined;
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
      total: await this.pageRepository.count(where ? { where } : undefined),
    };
  }

  public getPageById(id: number) {
    return this.pageRepository.findOne(id);
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

  public async buildPage(key: string) {
    this.buildStatus.set(key, BuildStatus.START);

    const page = await this.getPageByKey(key)!;
    const dsl = generateDSL(page);

    const { generators, workspacePath } = getConfig();
    const generator = generators[page.generator || 'web']!;
    try {
      const result = await generator({
        dsl,
        workspacePath,
      });
      this.buildStatus.set(key, BuildStatus.SUCCESS);
      console.log(result);
    } catch (e) {
      this.buildStatus.set(key, BuildStatus.FAILED);
      console.error(e);
    }
  }

  public getBuildStatus(key: string): Maybe<BuildStatus> {
    return this.buildStatus.get(key);
  }

  private readonly buildStatus = new Map<string, BuildStatus>();
}
