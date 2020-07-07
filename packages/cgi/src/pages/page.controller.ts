import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { PageService } from 'service/page.service';
import { CreatePageDto } from 'dto/create-page.dto';

interface GetPageParams {
    start?: string;
    count?: string;
}

@Controller('pages')
export class PageController {
    constructor(private readonly appService: PageService) {}

    @Get()
    getPages(@Query() { start = '0', count = '20' }: GetPageParams) {
        return { start, count, now: Date.now() };
        // return this.appService.getHello();
    }

    @Post()
    createPage(@Body() { title, description }: CreatePageDto) {
        return { title, description, test: 1 };
    }
}
