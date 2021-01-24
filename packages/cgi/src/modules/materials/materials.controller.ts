import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MaterialsService } from './materials.service';
import { CGICodeMap, CGIResponse } from '../../utils';

@Controller('/cgi/materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Get(':libName')
  async listVersions(@Param('libName') libName: string) {
    if (!libName) {
      return CGIResponse.failed(CGICodeMap.MaterialsNotExists);
    }

    const result = await this.materialsService.listVersions(libName);
    return CGIResponse.success(result);
  }

  @Post(':libName/:version')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file,
    @Param('libName') libName: string,
    @Param('version') version: string,
  ) {
    const packagePath = await MaterialsService.saveMaterialsPackage(
      libName,
      version,
      file.buffer,
    );
    console.log({ libName, version, file, packagePath });
    await MaterialsService.extractMaterialsPackage(packagePath);
    return CGIResponse.success();
  }
}
