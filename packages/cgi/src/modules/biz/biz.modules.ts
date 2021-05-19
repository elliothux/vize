import { Module, Global, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BizEntity } from './biz.entity';
import { BizService } from './biz.service';
import { BizController } from './biz.controller';
import { PageModule } from '../page/page.modules';

@Global()
@Module({
  imports: [PageModule, TypeOrmModule.forFeature([BizEntity])],
  controllers: [BizController],
  providers: [PageModule, BizService, Logger],
  exports: [BizService],
})
export class BizModule {}
