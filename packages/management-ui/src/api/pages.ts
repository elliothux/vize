import { BizRecord, Maybe, PageRecord, PageRecordWithHistory } from 'types';
import { HistoryRecord } from 'types';
import { getCGIJSON, ParsedCGIResponse, postCGIJSON, prefix, WithPagination } from '@vize/utils';

export function queryPages(
  biz: Maybe<BizRecord['id']>,
  isTemplate: boolean,
  startPage: number,
  pageSize: number,
  keywords: Maybe<string>,
): Promise<ParsedCGIResponse<WithPagination<PageRecordWithHistory[]>>> {
  return getCGIJSON<WithPagination<PageRecordWithHistory[]>>(
    prefix('page', { biz, startPage, pageSize, keywords, isTemplate: isTemplate ? '1' : '0' }),
  );
}

export interface CreatePageParams
  extends Pick<PageRecord, 'layoutMode' | 'pageMode' | 'isTemplate' | 'generator' | 'container'>,
    Pick<HistoryRecord, 'desc' | 'title'> {
  biz: number;
}

export function createPage(params: CreatePageParams): Promise<ParsedCGIResponse<PageRecord>> {
  return postCGIJSON<PageRecord>(prefix('page'), params);
}
