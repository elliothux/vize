import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PageEntity } from './page.entity';
import { CreatePageDTO, UpdatePageDTO } from './page.interface';
import { QueryParams } from '../../types';

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
  }: CreatePageDTO) {
    return this.pageRepository.insert({
      key,
      createdTime: new Date(),
      author,
      layoutMode,
      pageMode,
      biz: { id: biz },
    });
  }

  public queryPageEntity({ startPage = 0, pageSize = 20 }: QueryParams) {
    return this.pageRepository.find({
      take: pageSize,
      skip: startPage * pageSize,
    });
  }

  public getPageById(id: number) {
    return this.pageRepository.findOne(id);
  }

  public updatePage(id: number, updatePageDto: UpdatePageDTO) {
    return this.pageRepository.update(id, updatePageDto);
  }

  public deletePage(id: number) {
    return this.pageRepository.update(id, { status: -1 });
  }

  public async checkPageExists(key: string) {
    const count = await this.pageRepository.count({ key });
    return count > 0;
  }
}
