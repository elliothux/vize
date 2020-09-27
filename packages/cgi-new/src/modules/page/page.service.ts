import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PageEntity } from './page.entity';
import { CreatePageParams, PagesParams } from './page.interface';

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(PageEntity)
    private readonly pageRepository: Repository<PageEntity>,
  ) {}

  public createPageEntity({
    key,
    author,
    layoutMode,
    pageMode,
    biz,
  }: CreatePageParams) {
    return this.pageRepository.insert({
      key,
      createdTime: new Date(),
      author,
      layoutMode,
      pageMode,
      biz: { id: biz },
    });
  }

  public async queryPageEntity({ page = 0, pageSize = 20 }: PagesParams) {
    return this.pageRepository.find({
      take: pageSize,
      skip: page * pageSize,
    });
  }

  public async getPageById(id: number) {
    return this.pageRepository.findOne(id);
  }

  public async checkPageExists(key: string) {
    const count = await this.pageRepository.count({ key });
    return count > 0;
  }
}
