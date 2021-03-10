import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageService } from './page.service';
import { PageController } from './page.controller';
import { PageEntity } from './page.entity';
import { HistoryEntity } from '../history/history.entity';
import { UserEntity } from '../user/user.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([PageEntity, HistoryEntity, UserEntity])],
  providers: [PageService],
  controllers: [PageController],
  exports: [PageService],
})
export class PageModule {}
