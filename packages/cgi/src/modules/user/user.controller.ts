import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CGICodeMap, CGIResponse } from '../../utils';
import { UserService } from './user.service';
import { CreateUserParams, UpdateUserParams } from './user.interface';
import { QueryParams } from '../../types';

@Controller('/cgi/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() user: CreateUserParams) {
    if (await this.userService.checkUserExists(user.name)) {
      return CGIResponse.failed(CGICodeMap.UserExists);
    }

    const result = await this.userService.createUserEntity(user);
    return CGIResponse.success(result);
  }

  @Post('/:id')
  async updateUser(@Body() user: UpdateUserParams, @Param('id') id: string) {
    if (!(await this.userService.checkUserExists(user.name))) {
      return CGIResponse.failed(CGICodeMap.UserNotExists);
    }

    const result = await this.userService.updateUserEntity(parseInt(id), user);
    return CGIResponse.success(result);
  }

  @Get()
  async queryUser(@Query() query: QueryParams) {
    const result = await this.userService.queryUserEntities(query);
    return CGIResponse.success(result);
  }
}
