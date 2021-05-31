import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';
import { MaterialsService } from './materials.service';
import { MaterialsController } from './materials.controller';
import { MaterialsEntity } from './materials.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([MaterialsEntity, UserEntity])],
  providers: [MaterialsService, UserService],
  controllers: [MaterialsController],
  exports: [MaterialsService],
})
export class MaterialsModule {}
