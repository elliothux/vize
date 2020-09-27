export interface Response<T> {
    t: number;
    status: 'success' | 'failed';
    message?: string;
    data?: T;
    code: number;
}
