import { Injectable } from '@nestjs/common';
import { Repository, FindManyOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PageEntity } from './page.entity';
import { CreatePageDTO, UpdatePageDTO } from './page.interface';
import { QueryParams, RecordStatus } from '../../types';
import { HistoryEntity } from '../history/history.entity';

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
}
