import * as path from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { BizModule } from 'modules/biz/biz.modules';
import { PageModule } from 'modules/page/page.modules';
import { HistoryModule } from 'modules/history/history.modules';
import { getConfig } from '../config';

const config = getConfig();

const workspacePath = path.resolve(__dirname, '../../workspace');

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
      ...config.db,
      autoLoadEntities: true,
      synchronize: true,
    }),
    BizModule,
    HistoryModule,
    PageModule,
  ],
})
export class AppModule {}
