import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryParams } from 'types';
import { BizEntity } from './biz.entity';
import { CreateBizParams } from './biz.interface';

@Injectable()
export class BizService {
  constructor(
    @InjectRepository(BizEntity)
    private readonly bizRepository: Repository<BizEntity>,
  ) {}

  public async getBizEntity(id: number) {
    return this.bizRepository.findOne(id);
  }

  public async queryBizEntities({ startPage = 0, pageSize = 10 }: QueryParams) {
    return this.bizRepository.find({
      take: pageSize,
      skip: pageSize * startPage,
    });
  }

  public async createBizEntity({ key, name, logo }: CreateBizParams) {
    return this.bizRepository.insert({
      key,
      name,
      logo,
      createdTime: new Date(),
    });
  }

  public async checkBizExists(key: string) {
    const count = await this.bizRepository.count({ key });
    return count > 0;
  }
}
