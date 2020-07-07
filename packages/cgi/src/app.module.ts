import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PageController } from 'controller/page.controller';
import { PageService } from 'service/page.service';

@Module({
    imports: [MongooseModule.forRoot('mongodb://127.0.0.1/vize')],
    controllers: [PageController],
    providers: [PageService],
})
export class AppModule {}