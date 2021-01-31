import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { QueryParams } from 'types';
import { BizEntity } from './biz.entity';
import { CreateBizParams, UpdateBizParams } from './biz.interface';
import { MaterialsEntity } from '../materials/materials.entity';

@Injectable()
export class BizService {
  constructor(
    @InjectRepository(BizEntity)
    private readonly bizRepository: Repository<BizEntity>,
    @InjectRepository(MaterialsEntity)
    private readonly materialsRepository: Repository<MaterialsEntity>,
  ) {}

  public async getBizEntityById(id: number) {
    return this.bizRepository.findOne(id);
  }

  public async getBizEntity(key: string) {
    return this.bizRepository.findOne({ key });
  }

  public async queryBizEntities({
    startPage = 0,
    pageSize = 20,
    withMaterials,
  }: QueryParams<{ withMaterials?: string }>) {
    const result = await this.bizRepository.find({
      take: pageSize,
      skip: pageSize * startPage,
    });

    if (withMaterials) {
      await Promise.all(
        result.map(async i => {
          (i as any).materials = (
            await this.materialsRepository.find({
              where: { libName: In(i.materials) },
            })
          ).map(i => ({ ...i, manifest: JSON.parse(i.manifest) }));
        }),
      );
    } else {
      result.forEach(i => delete i.materials);
    }

    return result;
  }

  public async createBizEntity({ key, name, logo }: CreateBizParams) {
    const { libName } = await this.materialsRepository.findOne({
      libName: 'universal',
    });
    return this.bizRepository.insert({
      key,
      name,
      logo,
      materials: [libName],
      createdTime: new Date(),
    });
  }

  public async updateBizEntity(
    id: number,
    { name, logo, materials }: UpdateBizParams,
  ) {
    const biz: Partial<BizEntity> = {
      name,
      logo,
      modifiedTime: new Date(),
    };

    if (materials) {
      biz.materials = materials;
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

  // public async getBizContainers(key: string) {
  //   // const biz = await this.getBizEntity(key);
  // }
}
