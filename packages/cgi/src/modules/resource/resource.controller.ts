import {
  Controller,
  Get,
  Post,
  Delete,
  Query,
  UploadedFile,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VizeUserName } from '../../decorators';
import { CGIResponse } from '../../utils';
import { FileInterceptorUploadedFile, Maybe } from '../../types';
import { ResourceService } from './resource.service';
import { getCreateResourceParams, saveUploadedFile } from './resource.utils';
import { QueryResourceParams } from './resource.interface';

let cgiResourceServices: Maybe<ResourceService> = null;

@Controller('/cgi/resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {
    cgiResourceServices = resourceService;
  }

  @Get()
  async queryResource(@Query() query: QueryResourceParams) {
    const result = await this.resourceService.queryResourceEntities(query);
    return CGIResponse.success(result);
  }

  @Delete('/:id')
  async deleteResource(@Param('id') id: string) {
    const item = await this.resourceService.getResourceEntityById(
      parseInt(id, 10),
    );
    const result = await this.resourceService.getDeleteFileCallback()(item);
    const dbResult = await this.resourceService.deleteResourceEntity(
      parseInt(id, 10),
    );
    return CGIResponse.success(result || dbResult);
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
