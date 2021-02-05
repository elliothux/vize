import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { BizModule } from './modules/biz/biz.modules';
import { PageModule } from './modules/page/page.modules';
import { HistoryModule } from './modules/history/history.modules';
import { MaterialsModule } from './modules/materials/materials.modules';
import { UserModule } from './modules/user/user.modules';
import { Maybe, FirstParameter } from './types';
import { getConfig } from './utils';

type App = FirstParameter<typeof NestFactory.create>;

let app: Maybe<App> = null;

export function getApp(): App {
  if (app) {
    return app;
  }

  const {
    db,
    paths: { materialsPath, previewPath, editorPath, managementUIPath },
    middlewares,
  } = getConfig()!;

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
      UserModule,
    ],
  })
  class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      if (middlewares) {
        Object.entries(middlewares).forEach(
          ([name, { apply, forRoutes = [], exclude = [] }]) => {
            console.log(`Apply middle "${name}"...`);
            consumer
              .apply(apply)
              .exclude(...exclude)
              .forRoutes(...forRoutes);
          },
        );
      }
    }
  }

  app = AppModule;

  return app;
}
