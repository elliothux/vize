import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CGICodeMap, CGIResponse } from '../../utils';
import { QueryParams, Maybe, WithKeywords } from '../../types';
import { UserService } from './user.service';
import { CreateUserParams, UpdateUserParams } from './user.interface';

let cgiUserService: Maybe<UserService> = null;

@Controller('/cgi/user')
export class UserController {
  constructor(private readonly userService: UserService) {
    cgiUserService = userService;
  }

  @Get()
  async queryUser(@Query() query: WithKeywords<QueryParams>) {
    const result = await this.userService.queryUserEntities(query);
    return CGIResponse.success(result);
  }

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
}

export function getUserService() {
  return cgiUserService;
}
