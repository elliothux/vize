import {
  Body,
  Controller,
  Param,
  Query,
  Logger,
  LoggerService,
  Inject,
  Get,
  Post,
} from '@nestjs/common';
import { CGICodeMap, CGIResponse } from '../../utils';
import { BizService } from './biz.service';
import { CreateBizParams, UpdateBizParams } from './biz.interface';
import { Maybe, WithKeywords } from '../../types';

let cgiBizServices: Maybe<BizService> = null;

@Controller('/cgi/biz')
export class BizController {
  constructor(
    private readonly bizService: BizService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {
    cgiBizServices = bizService;
  }

  @Get()
  async queryBiz(@Query() { keywords }: WithKeywords) {
    this.logger.log('queryBiz');
    const result = await this.bizService.queryBizEntities({ keywords });
    return CGIResponse.success(result);
  }

  @Post()
  async createBiz(@Body() biz: CreateBizParams) {
    if (await this.bizService.checkBizExists(biz.key)) {
      return CGIResponse.failed(CGICodeMap.BizExists);
    }

    const result = await this.bizService.createBizEntity(biz);
    return CGIResponse.success(result);
  }

  @Post('/:id')
  async updateBiz(@Body() biz: UpdateBizParams, @Param('id') id: string) {
    if (!(await this.bizService.checkBizExistsById(parseInt(id)))) {
      return CGIResponse.failed(CGICodeMap.BizNotExists);
    }

    const result = await this.bizService.updateBizEntity(parseInt(id), biz);
    return CGIResponse.success(result);
  }
}

export function getBizService() {
  return cgiBizServices;
}
