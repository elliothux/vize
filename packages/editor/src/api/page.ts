import { getCGIJSON, postCGIJSON, prefix } from './utils';
import { PageRecordWithHistory } from 'sharedTypes';
import { DSL } from '../types';

export function getPage(pageKey: string) {
  return getCGIJSON<PageRecordWithHistory>(`${prefix('page')}/${pageKey}`);
}

export function savePageHistory(dsl: DSL) {
  return postCGIJSON<{}>(prefix('history'), dsl);
}
