import { Repository } from 'typeorm';
import { BizEntity } from './biz.entity';
export declare class BizService {
    private readonly bizRepository;
    constructor(bizRepository: Repository<BizEntity>);
    findAll(): Promise<BizEntity[]>;
}
