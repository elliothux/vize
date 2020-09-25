import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BizEntity } from './biz.entity';

@Injectable()
export class BizService {
  constructor(
    @InjectRepository(BizEntity)
    private readonly bizRepository: Repository<BizEntity>,
  ) {}

  async findAll(): Promise<BizEntity[]> {
    return this.bizRepository.find();
  }
}
