import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { v4 } from 'uuid';
import { QueryParams, WithKeywords } from '../../types';
import { CreateUserParams, UpdateUserParams } from './user.interface';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async getUserEntityById(id: number) {
    const result = await this.userRepository.findOne(id);
    result && delete result.__developerAccessToken;
    return result;
  }

  public async getUserEntityByName(name: string) {
    const result = await this.userRepository.findOne({ name });
    result && delete result.__developerAccessToken;
    return result;
  }

  public async queryUserEntities({
    startPage = 0,
    pageSize = 20,
    keywords,
  }: WithKeywords<QueryParams>) {
    const where = keywords
      ? ['name', 'extInfo'].map(key => ({
          [key]: Like(`%${keywords}%`),
        }))
      : {};

    const options: FindManyOptions<UserEntity> = {
      order: {
        createdTime: 'DESC',
      },
      take: pageSize,
      skip: pageSize * startPage,
      where,
    };

    const result = await this.userRepository.find(options);
    result?.forEach(i => delete i.__developerAccessToken);

    return {
      data: result,
      total: await this.userRepository.count({ where }),
    };
  }

  public async createUserEntity({
    name,
    extInfo,
    bizs,
    isAdmin,
    isDeveloper,
  }: CreateUserParams) {
    return this.userRepository.insert({
      name,
      extInfo,
      bizs,
      isAdmin,
      isDeveloper,
      createdTime: new Date(),
    });
  }

  public async updateUserEntity(id: number, user: UpdateUserParams) {
    return this.userRepository.update({ id }, user);
  }

  public async generateAccessToken(id: number) {
    const token = v4();
    const result = await this.userRepository.update(
      { id },
      { __developerAccessToken: token },
    );
    return {
      ...result,
      token,
    };
  }

  public async checkUserExistsById(id: number) {
    const count = await this.userRepository.count({ id });
    return count > 0;
  }

  public async checkUserExists(name: string) {
    const count = await this.userRepository.count({ name });
    return count > 0;
  }

  public async getAccessToken(name: string) {
    const result = await this.userRepository.findOne({ name });
    return result?.__developerAccessToken;
  }
}
