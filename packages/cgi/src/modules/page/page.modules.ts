import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageService } from './page.service';
import { PageController } from './page.controller';
import { PageEntity } from './page.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([PageEntity])],
  providers: [PageService],
  controllers: [PageController],
  exports: [PageService],
})
export class PageModule {}
