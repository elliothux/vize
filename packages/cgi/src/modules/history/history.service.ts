import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistoryEntity } from './history.entity';
import { QueryParams } from '../../types';
import { CreateHistoryDTO } from './history.interface';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(HistoryEntity)
    private readonly historyRepository: Repository<HistoryEntity>,
  ) {}

  public createHistory({
    global: {
      metaInfo: { title, desc, duration, expiredJump },
      globalProps,
      globalStyle,
    },
    sharedComponentInstances,
    pageInstances,
    pluginInstances,
    editInfo,
  }: CreateHistoryDTO) {
    return this.historyRepository.insert({
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
      sharedComponentInstances: JSON.stringify(sharedComponentInstances),
      maxKeys: JSON.stringify(editInfo.maxKeys),
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
