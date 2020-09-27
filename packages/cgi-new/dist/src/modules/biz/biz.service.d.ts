import { Repository } from 'typeorm';
import { QueryParams } from 'types';
import { BizEntity } from './biz.entity';
import { CreateBizParams } from './biz.interface';
export declare class BizService {
    private readonly bizRepository;
    constructor(bizRepository: Repository<BizEntity>);
    getBizEntity(id: number): Promise<BizEntity>;
    queryBizEntities({ startPage, pageSize }: QueryParams): Promise<BizEntity[]>;
    createBizEntity({ key, name, logo }: CreateBizParams): Promise<import("typeorm").InsertResult>;
    checkBizExists(key: string): Promise<boolean>;
}
