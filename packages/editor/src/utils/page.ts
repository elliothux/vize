import { PageData } from '../types';

export const pageDataMap = new Map<number, PageData>();

export function setPageData(key: number, data: PageData) {
    pageDataMap.set(key, data);
}
