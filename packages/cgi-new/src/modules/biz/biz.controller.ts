import { Controller, Get } from '@nestjs/common';
import { BizService } from './biz.service';
import { PageService } from '../page/page.service';

@Controller('/cgi/biz')
export class BizController {
  constructor(
    private readonly pageService: PageService,
    private readonly bizService: BizService, // private readonly pageModule: PageModule,
  ) {}

  @Get()
  getHello(): any {
    console.log(this.pageService, this.bizService);
    return '1';
  }
}
