import { BizRecord, Maybe, PageRecord } from 'types';
import { HistoryRecord } from 'types';
import { CGIIDResponse, getCGIJSON, ParsedCGIResponse, postCGIJSON, prefix } from './utils';

export function queryPages(biz: Maybe<BizRecord['id']>, startPage: number): Promise<ParsedCGIResponse<PageRecord[]>> {
  return getCGIJSON<PageRecord[]>(prefix('page', { bizID: biz, startPage }));
}

export interface CreatePageParams
  extends Pick<PageRecord, 'key' | 'author' | 'layoutMode' | 'pageMode'>,
    Pick<HistoryRecord, 'desc' | 'title'> {
  biz: number;
}

export function createPage(params: CreatePageParams): Promise<ParsedCGIResponse<CGIIDResponse>> {
  return postCGIJSON<PageRecord>(prefix('page'), params);
}
