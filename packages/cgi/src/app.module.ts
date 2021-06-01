import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SentryModule } from '@ntegral/nestjs-sentry';
import { LogLevel } from '@sentry/types';
import { BizModule } from './modules/biz/biz.modules';
import { PageModule } from './modules/page/page.modules';
import { HistoryModule } from './modules/history/history.modules';
import { MaterialsModule } from './modules/materials/materials.modules';
import { UserModule } from './modules/user/user.modules';
import { ResourceModule } from './modules/resource/resource.modules';
import { FirstParameter, Maybe } from './types';
import { getConfig, getEnv, getStaticModules, info, isDev } from './utils';

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
      SentryModule.forRoot({
        dsn:
          'https://a646c5c66c4c48338b13aeab1aeec384@o767302.ingest.sentry.io/5794415',
        debug: isDev(),
        environment: getEnv(),
        release: '0.1.0',
        logLevel: isDev() ? LogLevel.Debug : LogLevel.Error,
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
      ResourceModule,
    ],
    providers: [Logger],
  })
  class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      if (middlewares) {
        Object.entries(middlewares).forEach(([name, middeleware]) => {
          const middlewares = Array.isArray(middeleware)
            ? middeleware
            : [middeleware];
          middlewares.forEach(({ apply, forRoutes = [], exclude = [] }) => {
            info(
              'Middlewares',
              `Apply middle "${name}" for routes: "${forRoutes}"`,
            );
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
