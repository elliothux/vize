import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { HistoryEntity } from './history.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([HistoryEntity])],
  providers: [HistoryService],
  controllers: [HistoryController],
  exports: [HistoryService],
})
export class HistoryModule {}
