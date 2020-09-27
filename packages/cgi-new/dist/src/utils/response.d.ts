import { Response } from 'types';
export declare class CGIResponse {
    static success<T = any>(data?: T): Response<T>;
    static failed<T = any>(code: CGICodeMap, reason?: string): Response<T>;
}
export declare enum CGICodeMap {
    BizExists = 0,
    PageExists = 1
}
