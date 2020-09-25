export interface Response<T> {
    t: number;
    status: 'success' | 'failed';
    data?: T;
    error?: {
        code: number;
        reason: string;
        stack?: string;
    };
}
