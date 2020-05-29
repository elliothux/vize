import request from 'axios';
import { promiseWrapper } from './common';

export async function getFileString(url: string): Promise<string> {
    const [err, result] = await promiseWrapper(request.get(url));
    if (err || !result || !result.data) {
        throw err;
    }
    return result.data;
}
