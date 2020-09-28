import { Connection } from 'typeorm';
import { BizEntity } from './biz.entity';
import { ProviderTypes } from 'utils';
export declare const bizProviders: {
    provide: ProviderTypes;
    inject: ProviderTypes[];
    useFactory: (connection: Connection) => import("typeorm").Repository<BizEntity>;
}[];
