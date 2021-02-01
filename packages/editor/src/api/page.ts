import { DSL, GeneratorResult, Maybe } from 'types';
import { PageRecordWithHistory } from 'sharedTypes';
import { getCGIJSON, ParsedCGIResponse, postCGIJSON, prefix } from './utils';

export function getPage(pageKey: string) {
  return getCGIJSON<PageRecordWithHistory>(`${prefix('page')}/${pageKey}`);
}

export function savePageHistory(dsl: DSL) {
  return postCGIJSON<{}>(prefix('history'), dsl);
}

export function previewPage(key: string): Promise<ParsedCGIResponse<GeneratorResult>> {
  return getCGIJSON(prefix(`page/preview/${key}`));
}

export function startPublishPage(key: string): Promise<ParsedCGIResponse<GeneratorResult>> {
  return postCGIJSON(prefix(`page/publish/${key}`), {});
}

export function getPublishStatus(
  key: string,
): Promise<ParsedCGIResponse<Maybe<[BuildStatus, Maybe<GeneratorResult>]>>> {
  return getCGIJSON(prefix(`page/publish/${key}`));
}

export enum BuildStatus {
  START = 'start',
  SUCCESS = 'success',
  FAILED = 'failed',
}
