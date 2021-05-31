import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  CGICodeMap,
  CGIResponse,
  infoRequest,
  infoResponse,
  warn,
} from '../../utils';
import { QueryParams, Maybe, WithKeywords } from '../../types';
import { RequestId, UserName } from '../../decorators';
import { UserService } from './user.service';
import { CreateUserParams, UpdateUserParams } from './user.interface';

let cgiUserService: Maybe<UserService> = null;

@Controller('/cgi/user')
export class UserController {
  constructor(private readonly userService: UserService) {
    cgiUserService = userService;
  }

  @Get()
  async queryUser(
    @RequestId() requestId,
    @Query() query: WithKeywords<QueryParams>,
  ) {
    infoRequest(requestId, 'user.controller.queryUser', query);
    const result = await this.userService.queryUserEntities(query);
    infoResponse(requestId, 'user.controller.queryUser', { result });
    return CGIResponse.success(requestId, result);
  }

  @Post()
  async createUser(@RequestId() requestId, @Body() user: CreateUserParams) {
    infoRequest(requestId, 'user.controller.queryUser', { user });
    if (await this.userService.checkUserExists(user.name)) {
      warn('user.controller.queryUser', `User "${user.name}" already exists`, {
        requestId,
      });
      return CGIResponse.failed(requestId, CGICodeMap.UserExists);
    }

    const result = await this.userService.createUserEntity(user);
    infoResponse(requestId, 'user.controller.createUser', { result });
    return CGIResponse.success(requestId, result);
  }

  @Post('/:id')
  async updateUser(
    @RequestId() requestId,
    @Body() user: UpdateUserParams,
    @Param('id') id: string,
  ) {
    infoRequest(requestId, 'user.controller.updateUser', { user, id });
    if (!(await this.userService.checkUserExists(user.name))) {
      warn('user.controller.updateUser', `User "${user.name}" not exists`, {
        requestId,
      });
      return CGIResponse.failed(requestId, CGICodeMap.UserNotExists);
    }

    const result = await this.userService.updateUserEntity(parseInt(id), user);
    infoResponse(requestId, 'user.controller.updateUser', { result });
    return CGIResponse.success(requestId, result);
  }

  @Post('/access_token/:id')
  async generateAccessToken(
    @RequestId() requestId,
    @UserName() username,
    @Param('id') id: string,
  ) {
    infoRequest(requestId, 'user.controller.generateAccessToken', {
      username,
      id,
    });

    if (!(await this.userService.checkUserExistsById(parseInt(id, 10)))) {
      warn('user.controller.generateAccessToken', `UserId "${id}" not exists`, {
        requestId,
      });
      return CGIResponse.failed(requestId, CGICodeMap.UserNotExists);
    }

    const result = await this.userService.generateAccessToken(parseInt(id));
    infoResponse(requestId, 'user.controller.generateAccessToken', { result });
    return CGIResponse.success(requestId, result);
  }
}

export function getUserService() {
  return cgiUserService;
}
