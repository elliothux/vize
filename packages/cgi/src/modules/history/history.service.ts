import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistoryEntity } from './history.entity';
import { QueryParams } from 'types';
import { CreateHistoryDTO } from './history.interface';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(HistoryEntity)
    private readonly historyRepository: Repository<HistoryEntity>,
  ) {}

  public createHistory(
    pageId: number,
    {
      global: {
        metaInfo: { title, desc, duration, expiredJump },
        globalProps,
        globalStyle,
      },
      pageInstances,
      pluginInstances,
      editInfo,
    }: CreateHistoryDTO,
  ) {
    return this.historyRepository.insert({
      page: { id: pageId },
      createdTime: new Date(),
      author: 'qy',
      title,
      desc,
      startTime: duration ? new Date(duration?.[0]) : undefined,
      endTime: duration ? new Date(duration?.[1]) : undefined,
      expiredJump,
      globalProps: JSON.stringify(globalProps),
      globalStyle: JSON.stringify(globalStyle),
      pageInstances: JSON.stringify(pageInstances),
      pluginInstances: JSON.stringify(pluginInstances),
      editInfo: JSON.stringify(editInfo),
    });
  }

  public queryHistories({ startPage, pageSize }: QueryParams) {
    return this.historyRepository.find({
      take: pageSize,
      skip: startPage * pageSize,
      order: { createdTime: 'DESC' },
    });
  }

  public getHistoryById(id: number) {
    return this.historyRepository.findOne(id);
  }

  public deleteHistoryById(id: number) {
    return this.historyRepository.delete(id);
  }
}
