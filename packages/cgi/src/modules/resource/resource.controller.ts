import {
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { VizeUserName } from '../../decorators/VizeUserName';
import { CGIResponse } from '../../utils';
import { FileInterceptorUploadedFile, Maybe, QueryParams } from '../../types';
import { ResourceService } from './resource.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { getCreateResourceParams, saveUploadedFile } from './resource.utils';

let cgiResourceServices: Maybe<ResourceService> = null;

@Controller('/cgi/resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {
    cgiResourceServices = resourceService;
  }

  @Get()
  async queryResource(@Query() query: QueryParams) {
    const result = await this.resourceService.queryResourceEntities(query);
    return CGIResponse.success(result);
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadResource(
    @VizeUserName() username,
    @UploadedFile() file: FileInterceptorUploadedFile,
  ) {
    const { buffer, originalname } = file;
    file.path = await saveUploadedFile(buffer, originalname);
    const url = await this.resourceService.getUploadFileCallback()(file);
    const result = await this.resourceService.createResourceEntity(
      username,
      getCreateResourceParams(file, url),
    );
    return CGIResponse.success(result);
  }
}

export function getResourceService() {
  return cgiResourceServices;
}
