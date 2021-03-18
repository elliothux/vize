import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BizModule } from './modules/biz/biz.modules';
import { PageModule } from './modules/page/page.modules';
import { HistoryModule } from './modules/history/history.modules';
import { MaterialsModule } from './modules/materials/materials.modules';
import { UserModule } from './modules/user/user.modules';
import { ResourceModule } from './modules/resource/resource.modules';
import { Maybe, FirstParameter } from './types';
import { getConfig, getStaticModules } from './utils';

type App = FirstParameter<typeof NestFactory.create>;

let app: Maybe<App> = null;

export function getApp(): App {
  if (app) {
    return app;
  }

  const { db, paths, middlewares } = getConfig()!;

  @Module({
    imports: [
      ...getStaticModules(paths),
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
      ResourceModule,
    ],
  })
  class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      if (middlewares) {
        Object.entries(middlewares).forEach(([name, middeleware]) => {
          const middlewares = Array.isArray(middeleware)
            ? middeleware
            : [middeleware];
          middlewares.forEach(({ apply, forRoutes = [], exclude = [] }) => {
            console.log(`[Vize] Apply middle "${name}" for routes:`, forRoutes);
            consumer
              .apply(apply)
              .exclude(...exclude)
              .forRoutes(...forRoutes);
          });
        });
      }
    }
  }

  app = AppModule;

  return app;
}
