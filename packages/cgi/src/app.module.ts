import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { BizModule } from 'modules/biz/biz.modules';
import { PageModule } from 'modules/page/page.modules';
import { HistoryModule } from 'modules/history/history.modules';
import { Maybe, FirstParameter } from 'types';
import { getConfig } from 'utils';
import { MaterialsModule } from './modules/materials/materials.modules';

type App = FirstParameter<typeof NestFactory.create>;

let app: Maybe<App> = null;

export function getApp(): App {
  if (app) {
    return app;
  }

  const {
    db,
    paths: { materialsPath, previewPath, editorPath, managementUIPath },
  } = getConfig()!;

  console.log({ managementUIPath });

  @Module({
    imports: [
      ...['/', '/templates', '/pages', '/libs', '/biz', '/log', '/user'].map(
        i =>
          ServeStaticModule.forRoot({
            serveRoot: i,
            rootPath: managementUIPath,
            exclude: ['/cgi/*', '/editor/*', '/materials/*', '/preview/*'],
          }),
      ),
      ServeStaticModule.forRoot({
        serveRoot: '/editor',
        rootPath: editorPath,
      }),
      ServeStaticModule.forRoot({
        serveRoot: '/materials',
        rootPath: materialsPath,
      }),
      ServeStaticModule.forRoot({
        serveRoot: '/preview',
        rootPath: previewPath,
      }),
      ConfigModule.forRoot({
        load: [getConfig],
        isGlobal: true,
      }),
      TypeOrmModule.forRoot({
        ...db,
        autoLoadEntities: true,
        synchronize: true,
      }),
      BizModule,
      HistoryModule,
      PageModule,
      MaterialsModule,
    ],
  })
  class AppModule {}

  app = AppModule;

  return app;
}
