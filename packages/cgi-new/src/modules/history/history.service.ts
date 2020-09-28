import { Injectable } from '@nestjs/common';

@Injectable()
export class HistoryService {
  public getHello(): string {
    return 'Hello World!';
  }
}
