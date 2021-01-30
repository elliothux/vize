import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryParams } from 'types';
import { BizEntity } from './biz.entity';
import { CreateBizParams, UpdateBizParams } from './biz.interface';

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
      libs: 'universal',
      createdTime: new Date(),
    });
  }

  public async updateBizEntity(
    id: number,
    { name, logo, libs }: UpdateBizParams,
  ) {
    const biz: Partial<BizEntity> = {
      name,
      logo,
      modifiedTime: new Date(),
    };

    if (libs) {
      biz.libs = libs.join(',');
    }

    return this.bizRepository.update({ id }, biz);
  }

  public async checkBizExistsById(id: number) {
    const count = await this.bizRepository.count({ id });
    return count > 0;
  }

  public async checkBizExists(key: string) {
    const count = await this.bizRepository.count({ key });
    return count > 0;
  }
}
