import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileInterceptorUploadedFile, Maybe, WithKeywords } from '../../types';
import {
  CGICodeMap,
  CGIResponse,
  getConfig,
  infoRequest,
  infoResponse,
  warn,
} from '../../utils';
import { RequestId } from '../../decorators';
import { UserService } from '../user/user.service';
import { MaterialsService } from './materials.service';
import {
  createLibPackageSoftLink,
  extractMaterialsPackage,
  installLibNPMPackages,
  parseLibs,
  saveMaterialsPackage,
} from './materials.utils';
import { UploadLibParams } from './materials.interface';

let cgiMaterialsService: Maybe<MaterialsService> = null;

@Controller('/cgi/materials')
export class MaterialsController {
  constructor(
    private readonly materialsService: MaterialsService,
    private readonly userServices: UserService,
  ) {
    cgiMaterialsService = materialsService;
  }

  @Get()
  async queryLibs(@RequestId() requestId, @Query() { keywords }: WithKeywords) {
    infoRequest(requestId, 'Materials.controller.queryLibs', { keywords });
    const result = await this.materialsService.queryLibEntities({ keywords });
    infoResponse(requestId, 'Materials.controller.queryLibs');
    return CGIResponse.success(requestId, parseLibs(result));
  }

  @Get('/:id')
  async queryLib(@RequestId() requestId, @Param('id') id: string) {
    infoRequest(requestId, 'Materials.controller.queryLib', { id });
    const result = await this.materialsService.getLibEntity(parseInt(id));
    infoResponse(requestId, 'Materials.controller.queryLib', { result });
    return CGIResponse.success(requestId, parseLibs([result])[0]);
  }

  @Get('/versions/:libName')
  async listVersions(
    @RequestId() requestId,
    @Param('libName') libName: string,
  ) {
    infoRequest(requestId, 'Materials.controller.listVersions', { libName });
    if (!libName) {
      warn('Materials.controller.listVersions', `Materials not exists`, {
        requestId,
        libName,
      });
      return CGIResponse.failed(requestId, CGICodeMap.MaterialsNotExists);
    }

    const result = await this.materialsService.listVersions(libName);
    infoResponse(requestId, 'Materials.controller.listVersions', { result });
    return CGIResponse.success(requestId, result);
  }

  @Post('/versions/:libName/:version')
  @UseInterceptors(FileInterceptor('file'))
  async uploadLibPackage(
    @RequestId() requestId,
    @UploadedFile() file: FileInterceptorUploadedFile,
    @Body() { username, accessToken }: UploadLibParams,
    @Param('libName') libName: string,
    @Param('version') version: string,
  ) {
    infoRequest(requestId, 'Materials.controller.uploadLibPackage', {
      libName,
      version,
      filename: file.filename,
      body: { username, accessToken: '*' },
    });

    const token = await this.userServices.getAccessToken(username);
    if (token !== accessToken) {
      warn('Materials.controller.uploadLibPackage', 'invalid access-token', {
        username,
        token,
      });
      return CGIResponse.failed(requestId, CGICodeMap.InvalidAccessToken);
    }

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
    infoResponse(requestId, 'Materials.controller.uploadLibPackage');
    return CGIResponse.success(requestId);
  }

  @Post('/sync/:libName')
  async syncLibManifest(
    @RequestId() requestId,
    @Param('libName') libName: string,
  ) {
    infoRequest(requestId, 'Materials.controller.syncLibManifest', {
      libName,
    });
    const result =
      libName === '*'
        ? await this.materialsService.syncAllLibs()
        : await this.materialsService.syncLib(libName);
    infoResponse(requestId, 'Materials.controller.syncLibManifest', {
      result,
    });
    return CGIResponse.success(requestId, result);
  }

  @Get('/generators/all')
  async queryGenerators(@RequestId() requestId) {
    infoRequest(requestId, 'Materials.controller.queryGenerators');
    const { generators } = getConfig();
    const result = Object.entries(generators).map(([key, { info }]) => ({
      ...info,
      key,
    }));
    infoResponse(requestId, 'Materials.controller.queryGenerators', { result });
    return CGIResponse.success(requestId, result);
  }
}

export function getMaterialsService() {
  return cgiMaterialsService;
}
