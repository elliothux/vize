import { NestFactory } from '@nestjs/core';
import { setConfig, VizeCGIConfig } from 'utils';
import { getApp } from './app.module';
import { runLocalServer } from './local';

export async function bootstrap(config: VizeCGIConfig) {
  setConfig(config);

  const app = await NestFactory.create(getApp());
  await app.listen(config.port);

  return app;
}

export { VizeCGIConfig };

runLocalServer();
