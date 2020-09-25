import { Injectable } from '@nestjs/common';

@Injectable()
export class PageService {
  public getHello(): string {
    return 'Hello World!';
  }
}
