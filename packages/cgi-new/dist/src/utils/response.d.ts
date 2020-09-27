import { Response } from 'types';
export declare class CGIResponse {
    static success<T = any>(data?: T, msg?: string): Response<T>;
    static failed<T = any>(code: CGICodeMap, reason?: string): Response<T>;
}
export declare enum CGICodeMap {
    BizExists = 400001,
    PageExists = 400002,
    PageNotExists = 400003,
    PageUpdateFailed = 400004
}
