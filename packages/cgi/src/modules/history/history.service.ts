import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { HistoryEntity } from './history.entity';
import { QueryParams } from '../../types';
import { CreateHistoryDTO } from './history.interface';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(HistoryEntity)
    private readonly historyRepository: Repository<HistoryEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async createHistory(
    username: string,
    {
      global: {
        metaInfo: { title, desc, duration, expiredJump },
        globalProps,
        globalStyle,
      },
      sharedComponentInstances,
      pageInstances,
      pluginInstances,
      editInfo,
      pageKey,
    }: CreateHistoryDTO,
  ) {
    const { id: creator } = await this.userRepository.findOne({
      name: username,
    });
    return this.historyRepository.insert({
      createdTime: new Date(),
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
      creator: { id: creator },
      pageKey,
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

  public updateHistoryById(id: number, history: Partial<HistoryEntity>) {
    return this.historyRepository.update({ id }, history);
  }

  public async searchHistoryPageKeys(keywords: string): Promise<string[]> {
    const result = await this.historyRepository.find({
      select: ['pageKey'],
      order: {
        createdTime: 'DESC',
      },
      where: ['pageKey', 'title', 'desc'].map(key => ({
        [key]: Like(`%${keywords}%`),
        status: 1,
      })),
    });
    return result.map(i => i.pageKey);
  }
}
