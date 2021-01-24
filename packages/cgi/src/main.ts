import * as fs from 'fs-extra';
import { NestFactory } from '@nestjs/core';
import { setConfig, getConfig, VizeCGIConfig } from 'utils';
import { getApp } from './app.module';
import { runLocalServer } from './local';

export async function bootstrap(config: VizeCGIConfig) {
  setConfig(config);
  await init();

  const app = await NestFactory.create(getApp());
  await app.listen(config.port);

  return app;
}

export { VizeCGIConfig };

async function init() {
  const {
    paths: { workspacePath, buildPath, materialsVersionsPath, materialsPath },
  } = getConfig()!;

  await fs.ensureDir(workspacePath);
  await Promise.all(
    [buildPath, materialsVersionsPath, materialsPath].map(i => fs.ensureDir(i)),
  );
}

runLocalServer();
