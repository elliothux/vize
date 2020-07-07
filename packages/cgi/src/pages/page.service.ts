import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PageService {
    constructor(@InjectModel('Cat') private catModel: Model<PageMode>) {}

    getHello(): string {
        return 'Hello World!';
    }
}
