import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Maybe, FileInterceptorUploadedFile } from '../../types';
import { CGICodeMap, CGIResponse, getConfig } from '../../utils';
import { FileInterceptor } from '@nestjs/platform-express';
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
  async queryLibs() {
    const result = await this.materialsService.queryLibEntities({});
    return CGIResponse.success(parseLibs(result));
  }

  @Get('/:id')
  async queryLib(@Param('id') id: string) {
    const result = await this.materialsService.getLibEntity(parseInt(id));
    return CGIResponse.success(parseLibs([result])[0]);
  }

  @Get('/versions/:libName')
  async listVersions(@Param('libName') libName: string) {
    if (!libName) {
      return CGIResponse.failed(CGICodeMap.MaterialsNotExists);
    }

    const result = await this.materialsService.listVersions(libName);
    return CGIResponse.success(result);
  }

  @Post('/versions/:libName/:version')
  @UseInterceptors(FileInterceptor('file'))
  async uploadLibPackage(
    @UploadedFile() file: FileInterceptorUploadedFile,
    @Param('libName') libName: string,
    @Param('version') version: string,
  ) {
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
    return CGIResponse.success();
  }

  @Post('/sync/:libName')
  async syncLibManifest(@Param('libName') libName: string) {
    const result =
      libName === '*'
        ? await this.materialsService.syncAllLibs()
        : await this.materialsService.syncLib(libName);
    return CGIResponse.success(result);
  }

  @Get('/generators/all')
  async queryGenerators() {
    const { generators } = getConfig();
    return CGIResponse.success(
      Object.entries(generators).map(([key, { info }]) => ({ ...info, key })),
    );
  }
}

export function getMaterialsService() {
  return cgiMaterialsService;
}
