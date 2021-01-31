import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BizEntity } from './biz.entity';
import { BizService } from './biz.service';
import { BizController } from './biz.controller';
import { PageModule } from '../page/page.modules';
import { MaterialsEntity } from '../materials/materials.entity';

@Global()
@Module({
  imports: [PageModule, TypeOrmModule.forFeature([BizEntity, MaterialsEntity])],
  controllers: [BizController],
  providers: [PageModule, BizService],
  exports: [BizService],
})
export class BizModule {}
