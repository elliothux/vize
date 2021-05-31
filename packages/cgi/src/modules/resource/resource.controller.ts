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
import { UserName, RequestId } from '../../decorators';
import {
  CGICodeMap,
  CGIResponse,
  error,
  getConfig,
  infoRequest,
  infoResponse,
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
  async queryResource(
    @RequestId() requestId,
    @Query() query: QueryResourceParams,
  ) {
    infoRequest(requestId, 'resource.controller.queryResource', query);
    const result = await this.resourceService.queryResourceEntities(query);
    infoResponse(requestId, 'resource.controller.queryResource', { result });
    return CGIResponse.success(requestId, result);
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadResource(
    @RequestId() requestId,
    @UserName() username,
    @UploadedFile() file: FileInterceptorUploadedFile,
  ) {
    infoRequest(requestId, 'resource.controller.uploadResource', {
      username,
      filename: file.filename,
    });
    const {
      resources: { onUpload },
    } = getConfig();
    const { buffer, originalname } = file;
    file.path = await saveUploadedFile(buffer, originalname);

    const [err, { url } = { url: null }] = await promiseWrapper(onUpload(file));
    if (err) {
      error(
        'resource.controller.uploadResource',
        'Error with "onUpload" callback',
        { error: err },
      );
      return CGIResponse.failed(
        requestId,
        CGICodeMap.UploadResourceCallbackError,
        err?.toString(),
      );
    }

    const result = await this.resourceService.createResourceEntity(
      username,
      getCreateResourceParams(file, url),
    );
    infoResponse(requestId, 'resource.controller.uploadResource', { result });
    return CGIResponse.success(requestId, result);
  }

  @Delete('/:id')
  async deleteResource(@RequestId() requestId, @Param('id') id: string) {
    infoRequest(requestId, 'resource.controller.deleteResource', { id });
    const item = await this.resourceService.getResourceEntityById(
      parseInt(id, 10),
    );
    const {
      resources: { onDelete },
    } = getConfig();
    const [err] = await promiseWrapper(onDelete(item));
    if (err) {
      error(
        'resource.controller.deleteResource',
        'Error with "onDelete" callback',
        { error: err },
      );
      return CGIResponse.failed(
        requestId,
        CGICodeMap.DeleteResourceCallbackError,
        err?.toString(),
      );
    }

    const result = await this.resourceService.deleteResourceEntity(
      parseInt(id, 10),
    );
    infoResponse(requestId, 'resource.controller.deleteResource', { result });
    return CGIResponse.success(requestId, result);
  }
}

export function getResourceService() {
  return cgiResourceServices;
}
