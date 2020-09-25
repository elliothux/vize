import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from '../config';
import { BizModule } from './modules/biz/biz.modules';
import { PageModule } from './modules/page/page.modules';

const config = getConfig();

@Module({
  imports: [
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
    PageModule,
  ],
})
export class AppModule {}
