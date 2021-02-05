import * as fs from 'fs-extra';
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

  const app = await NestFactory.create(getApp());
  await app.listen(config.port);

  return app;
}

async function init() {
  const {
    paths: { workspacePath, buildPath, materialsVersionsPath, materialsPath },
  } = getConfig()!;

  await fs.ensureDir(workspacePath);
  await Promise.all(
    [buildPath, materialsVersionsPath, materialsPath].map(i => fs.ensureDir(i)),
  );
}

export * from './types';
