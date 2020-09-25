import { Repository } from 'typeorm';
import { BizEntity } from 'entities/biz.entity';
export declare class BizService {
    private readonly bizRepository;
    constructor(bizRepository: Repository<BizEntity>);
    findAll(): Promise<BizEntity[]>;
}
