import { Module, Global, Logger } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';

@Global()
@Module({
  imports: [],
  controllers: [LogController],
  providers: [LogService, Logger],
  exports: [LogService],
})
export class LogModule {}
