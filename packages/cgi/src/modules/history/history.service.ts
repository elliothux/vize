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

  public async createHistory(username: string, dsl: CreateHistoryDTO) {
    const {
      pageKey,
      meta: { title, desc },
      pageInstances,
    } = dsl;
    const { id: creator } = await this.userRepository.findOne({
      name: username,
    });
    return this.historyRepository.insert({
      pageKey,
      createdTime: new Date(),
      title,
      desc,
      pageCount: pageInstances.length,
      dsl: JSON.stringify(dsl),
      creator: { id: creator },
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
