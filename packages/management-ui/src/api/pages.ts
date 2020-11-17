import { BizRecord, Maybe, PageRecord } from 'types';
import { fetchCGIJSON, ParsedCGIResponse, prefix } from './utils';

export function queryPages(biz: Maybe<BizRecord['id']>, startPage: number): Promise<ParsedCGIResponse<PageRecord[]>> {
  return fetchCGIJSON<PageRecord[]>(prefix('page', { bizID: biz, startPage }));
}
