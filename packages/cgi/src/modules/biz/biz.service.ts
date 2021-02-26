import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryParams } from '../../types';
import { BizEntity } from './biz.entity';
import { CreateBizParams, UpdateBizParams } from './biz.interface';

@Injectable()
export class BizService {
  constructor(
    @InjectRepository(BizEntity)
    private readonly bizRepository: Repository<BizEntity>,
  ) {}

  public async getBizEntityById(id: number) {
    return this.bizRepository.findOne(id);
  }

  public async getBizEntity(key: string) {
    return this.bizRepository.findOne({ key });
  }

  public async queryBizEntities({ startPage = 0, pageSize = 20 }: QueryParams) {
    return this.bizRepository.find({
      take: pageSize,
      skip: pageSize * startPage,
    });
  }

  public async createBizEntity({
    key,
    name,
    logo,
    materials,
  }: CreateBizParams) {
    return this.bizRepository.insert({
      key,
      name,
      logo,
      materials,
      createdTime: new Date(),
    });
  }

  public async updateBizEntity(
    id: number,
    { name, logo, materials }: UpdateBizParams,
  ) {
    return this.bizRepository.update(
      { id },
      {
        name,
        logo,
        materials,
        modifiedTime: new Date(),
      },
    );
  }

  public async checkBizExistsById(id: number) {
    const count = await this.bizRepository.count({ id });
    return count > 0;
  }

  public async checkBizExists(key: string) {
    const count = await this.bizRepository.count({ key });
    return count > 0;
  }

  // public async getBizContainers(key: string) {
  //   // const biz = await this.getBizEntity(key);
  // }
}
