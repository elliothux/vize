import * as fs from 'fs-extra';
import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { setConfig, getConfig } from './utils';
import { VizeCGIConfig } from './types';
import { getApp } from './app.module';

export async function bootstrap(
  config: VizeCGIConfig,
): Promise<INestApplication> {
  setConfig(config);
  await init();

  const app = await NestFactory.create(getApp(), { logger: true });
  app.use(cookieParser());
  await app.listen(config.port);

  return app;
}

async function init() {
  const {
    paths: {
      root: workspacePath,
      buildPath,
      materialsVersionsPath,
      materialsPath,
      uploadFilesPath,
      previewPath,
      publishPath,
    },
  } = getConfig()!;

  await fs.ensureDir(workspacePath);
  await Promise.all(
    [
      buildPath,
      materialsVersionsPath,
      materialsPath,
      uploadFilesPath,
      previewPath,
      publishPath,
    ].map(i => fs.ensureDir(i)),
  );
}

export * from './types';
export * from './utils';

export { getBizService } from './modules/biz/biz.controller';
export { getHistoryService } from './modules/history/history.controller';
export { getMaterialsService } from './modules/materials/materials.controller';
export { getPageService } from './modules/page/page.controller';
export { getUserService } from './modules/user/user.controller';
export { getResourceService } from './modules/resource/resource.controller';
