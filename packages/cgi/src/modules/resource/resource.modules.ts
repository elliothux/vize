import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourceEntity } from './resource.entity';
import { ResourceController } from './resource.controller';
import { ResourceService } from './resource.service';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([ResourceEntity, UserEntity])],
  controllers: [ResourceController],
  providers: [UserService, ResourceService],
  exports: [ResourceService],
})
export class ResourceModule {}
