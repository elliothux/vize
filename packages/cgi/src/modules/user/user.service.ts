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
    return this.userRepository.findOne(id);
  }

  public async getUserEntityByName(name: string) {
    return this.userRepository.findOne({ name });
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

    return {
      data: await this.userRepository.find(options),
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
}
