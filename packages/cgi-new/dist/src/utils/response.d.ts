import { Response } from 'types';
export declare class CGIResponse {
    static success<T = any>(data?: T): Response<T>;
    static failed<T = any>(code: number, reason: string): Response<T>;
}
