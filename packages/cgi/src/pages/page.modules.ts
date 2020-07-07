import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PageController } from 'controller/page.controller';
import { PageService } from 'service/page.service';
import { PageSchema } from 'schema/page.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Page', schema: PageSchema }])],
    controllers: [PageController],
    providers: [PageService],
})
export class PageModule {}
