import { Controller, Get } from '@nestjs/common';
import { PageService } from './page.service';

@Controller('/cgi/page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Get()
  getHello(): string {
    return this.pageService.getHello();
  }
}
