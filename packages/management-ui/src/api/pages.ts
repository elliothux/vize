import { BizRecord, Maybe, PageRecord } from 'types';
import { HistoryRecord } from 'types';
import { CGIIDResponse, getCGIJSON, ParsedCGIResponse, postCGIJSON, prefix, WithPagination } from './utils';

export function queryPages(
  biz: Maybe<BizRecord['id']>,
  startPage: number,
  pageSize = 10,
): Promise<ParsedCGIResponse<WithPagination<PageRecord[]>>> {
  return getCGIJSON<WithPagination<PageRecord[]>>(prefix('page', { biz, startPage, pageSize }));
}

export interface CreatePageParams
  extends Pick<PageRecord, 'key' | 'author' | 'layoutMode' | 'pageMode'>,
    Pick<HistoryRecord, 'desc' | 'title'> {
  biz: number;
}

export function createPage(params: CreatePageParams): Promise<ParsedCGIResponse<CGIIDResponse>> {
  return postCGIJSON<PageRecord>(prefix('page'), params);
}
