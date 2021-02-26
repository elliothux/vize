import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryParams } from '../../types';
import { CreateUserParams, UpdateUserParams } from './user.interface';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async getBizEntityById(id: number) {
    return this.userRepository.findOne(id);
  }

  public async getBizEntityByName(name: string) {
    return this.userRepository.findOne({ name });
  }

  public async queryUserEntities({
    startPage = 0,
    pageSize = 20,
  }: QueryParams) {
    return this.userRepository.find({
      take: pageSize,
      skip: pageSize * startPage,
    });
  }

  public async createUserEntity({
    name,
    extInfo,
    avatar,
    bizs,
    isAdmin,
  }: CreateUserParams) {
    return this.userRepository.insert({
      name,
      extInfo,
      avatar,
      bizs,
      isAdmin,
      createdTime: new Date(),
    });
  }

  public async updateUserEntity(id: number, user: UpdateUserParams) {
    return this.userRepository.update({ id }, user);
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
