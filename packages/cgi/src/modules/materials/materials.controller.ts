import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Maybe, FileInterceptorUploadedFile, WithKeywords } from '../../types';
import {
  CGICodeMap,
  CGIResponse,
  getConfig,
  infoRequest,
  infoResponse,
  warn,
} from '../../utils';
import { RequestId } from '../../decorators';
import { MaterialsService } from './materials.service';
import {
  createLibPackageSoftLink,
  extractMaterialsPackage,
  installLibNPMPackages,
  parseLibs,
  saveMaterialsPackage,
} from './materials.utils';

let cgiMaterialsService: Maybe<MaterialsService> = null;

@Controller('/cgi/materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {
    cgiMaterialsService = materialsService;
  }

  @Get()
  async queryLibs(@RequestId() requestId, @Query() { keywords }: WithKeywords) {
    infoRequest(requestId, 'materials.controller.queryLibs', { keywords });
    const result = await this.materialsService.queryLibEntities({ keywords });
    infoResponse(requestId, 'materials.controller.queryLibs', { result });
    return CGIResponse.success(requestId, parseLibs(result));
  }

  @Get('/:id')
  async queryLib(@RequestId() requestId, @Param('id') id: string) {
    infoRequest(requestId, 'materials.controller.queryLib', { id });
    const result = await this.materialsService.getLibEntity(parseInt(id));
    infoResponse(requestId, 'materials.controller.queryLib', { result });
    return CGIResponse.success(requestId, parseLibs([result])[0]);
  }

  @Get('/versions/:libName')
  async listVersions(
    @RequestId() requestId,
    @Param('libName') libName: string,
  ) {
    infoRequest(requestId, 'materials.controller.listVersions', { libName });
    if (!libName) {
      warn('materials.controller.listVersions', `Materials not exists`, {
        requestId,
        libName,
      });
      return CGIResponse.failed(requestId, CGICodeMap.MaterialsNotExists);
    }

    const result = await this.materialsService.listVersions(libName);
    infoResponse(requestId, 'materials.controller.listVersions', { result });
    return CGIResponse.success(requestId, result);
  }

  @Post('/versions/:libName/:version')
  @UseInterceptors(FileInterceptor('file'))
  async uploadLibPackage(
    @RequestId() requestId,
    @UploadedFile() file: FileInterceptorUploadedFile,
    @Param('libName') libName: string,
    @Param('version') version: string,
  ) {
    infoRequest(requestId, 'materials.controller.uploadLibPackage', {
      libName,
      version,
      filename: file.filename,
    });
    const packagePath = await saveMaterialsPackage(
      libName,
      version,
      file.buffer,
    );
    const extractedPackagePath = await extractMaterialsPackage(
      version,
      packagePath,
    );
    await createLibPackageSoftLink(libName, extractedPackagePath);
    await installLibNPMPackages(extractedPackagePath);
    await this.materialsService.syncLib(libName);
    infoResponse(requestId, 'materials.controller.uploadLibPackage');
    return CGIResponse.success(requestId);
  }

  @Post('/sync/:libName')
  async syncLibManifest(
    @RequestId() requestId,
    @Param('libName') libName: string,
  ) {
    infoRequest(requestId, 'materials.controller.syncLibManifest', {
      libName,
    });
    const result =
      libName === '*'
        ? await this.materialsService.syncAllLibs()
        : await this.materialsService.syncLib(libName);
    infoResponse(requestId, 'materials.controller.syncLibManifest', {
      result,
    });
    return CGIResponse.success(requestId, result);
  }

  @Get('/generators/all')
  async queryGenerators(@RequestId() requestId) {
    infoRequest(requestId, 'materials.controller.queryGenerators');
    const { generators } = getConfig();
    const result = Object.entries(generators).map(([key, { info }]) => ({
      ...info,
      key,
    }));
    infoResponse(requestId, 'materials.controller.queryGenerators', { result });
    return CGIResponse.success(requestId, result);
  }
}

export function getMaterialsService() {
  return cgiMaterialsService;
}
