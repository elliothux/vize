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

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '../../../management-ui/build'),
      exclude: ['/cgi/*', '/editor/*'],
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/editor',
      rootPath: path.join(__dirname, '../../../editor/build'),
      exclude: ['/cgi/*'],
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
