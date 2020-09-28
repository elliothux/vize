import { ProviderTypes } from 'utils';
export declare const databaseProviders: {
    provide: ProviderTypes;
    useFactory: () => Promise<import("typeorm").Connection>;
}[];
