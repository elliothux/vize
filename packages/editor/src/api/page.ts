import { DSL } from 'types';
import { PageRecordWithHistory } from 'sharedTypes';
import { getCGIJSON, postCGIJSON, prefix } from './utils';

export function getPage(pageKey: string) {
  return getCGIJSON<PageRecordWithHistory>(`${prefix('page')}/${pageKey}`);
}

export function savePageHistory(dsl: DSL) {
  return postCGIJSON<{}>(prefix('history'), dsl);
}

export function previewPage(key: string) {
  return getCGIJSON<{}>(prefix(`page/preview/${key}`));
}
