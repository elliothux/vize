import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VizeUserName } from '../../decorators';
import {
  CGICodeMap,
  CGIResponse,
  getConfig,
  promiseWrapper,
} from '../../utils';
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

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadResource(
    @VizeUserName() username,
    @UploadedFile() file: FileInterceptorUploadedFile,
  ) {
    const {
      resources: { onUpload },
    } = getConfig();
    const { buffer, originalname } = file;
    file.path = await saveUploadedFile(buffer, originalname);

    const [err, { url } = { url: null }] = await promiseWrapper(onUpload(file));
    if (err) {
      return CGIResponse.failed(
        CGICodeMap.UploadResourceCallbackError,
        err?.toString(),
      );
    }

    const result = await this.resourceService.createResourceEntity(
      username,
      getCreateResourceParams(file, url),
    );
    return CGIResponse.success(result);
  }

  @Delete('/:id')
  async deleteResource(@Param('id') id: string) {
    const item = await this.resourceService.getResourceEntityById(
      parseInt(id, 10),
    );
    const {
      resources: { onDelete },
    } = getConfig();
    const [err] = await promiseWrapper(onDelete(item));
    if (err) {
      return CGIResponse.failed(
        CGICodeMap.DeleteResourceCallbackError,
        err?.toString(),
      );
    }

    const result = await this.resourceService.deleteResourceEntity(
      parseInt(id, 10),
    );
    return CGIResponse.success(result);
  }
}

export function getResourceService() {
  return cgiResourceServices;
}
