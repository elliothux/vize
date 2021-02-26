import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Maybe, FileInterceptorUploadedFile } from '../../types';
import { ResourceEntity } from './resource.entity';
import {
  CreateResourceParams,
  QueryResourceParams,
} from './resource.interface';
import { UserService } from '../user/user.service';

let onUploadFileCallback = (
  _: FileInterceptorUploadedFile,
): Promise<Maybe<string>> => {
  return Promise.resolve(null);
};

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(ResourceEntity)
    private readonly resourceRepository: Repository<ResourceEntity>,
    private readonly userServices: UserService,
  ) {}

  public async getResourceEntityById(id: number) {
    return this.resourceRepository.findOne(id);
  }

  public async queryResourceEntities({
    startPage = 0,
    pageSize = 20,
    type,
  }: QueryResourceParams) {
    const where = { type };
    const data = await this.resourceRepository.find({
      order: { id: 'DESC' },
      take: pageSize,
      skip: pageSize * startPage,
      where,
    });
    const total = await this.resourceRepository.count({ where });
    return { total, data };
  }

  public async createResourceEntity(
    username: string,
    { type, extension, url, filename }: CreateResourceParams,
  ) {
    return this.resourceRepository.insert({
      type,
      extension,
      filename,
      url,
      createdTime: new Date(),
      user: await this.userServices.getBizEntityByName(username),
    });
  }

  public deleteResourceEntity(id: number) {
    return this.resourceRepository.delete({ id });
  }

  public onUploadFile = (callback: typeof onUploadFileCallback) => {
    onUploadFileCallback = callback;
  };

  public getUploadFileCallback = () => onUploadFileCallback;
}
