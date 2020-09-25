import { Global, Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { PageService } from './page.service';
import { PageController } from './page.controller';

@Global()
@Module({
  // imports: [TypeOrmModule.forFeature([BizEntity])],
  providers: [PageService],
  controllers: [PageController],
  exports: [PageService],
})
export class PageModule {}
