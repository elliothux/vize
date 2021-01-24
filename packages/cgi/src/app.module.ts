import * as path from 'path';
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

type App = FirstParameter<typeof NestFactory.create>;

let app: Maybe<App> = null;

export function getApp(): App {
  if (app) {
    return app;
  }

  const { workspacePath, db } = getConfig()!;

  @Module({
    imports: [
      ServeStaticModule.forRoot({
        serveRoot: '/',
        rootPath: path.join(workspacePath, 'pages/management-ui'),
        exclude: ['/cgi/*', '/editor/*', '/materials/*'],
      }),
      ServeStaticModule.forRoot({
        serveRoot: '/editor',
        rootPath: path.join(workspacePath, 'pages/editor'),
      }),
      ServeStaticModule.forRoot({
        serveRoot: '/materials',
        rootPath: path.join(workspacePath, 'materials'),
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
    ],
  })
  class AppModule {}

  app = AppModule;

  return app;
}
