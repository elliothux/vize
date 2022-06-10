import { DSL, GeneratorResult, PublisherResult, PageRecordWithHistory } from '@vize/types';
import { getCGIJSON, ParsedCGIResponse, postCGIJSON, prefix } from '@vize/utils';

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

export function getPublishStatus(key: string): Promise<ParsedCGIResponse<PublishStatusResponse>> {
  return getCGIJSON(prefix(`page/publish/${key}`));
}

export interface PublishStatusResponse {
  status: PublishStatus;
  result?: GeneratorResult | PublisherResult;
  error?: Error;
}

export enum PublishStatus {
  START = 'start',
  BUILD_SUCCESS = 'build_success',
  SUCCESS = 'success',
  FAILED = 'failed',
}
