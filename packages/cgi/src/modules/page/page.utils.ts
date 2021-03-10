import * as path from 'path';
import * as fs from 'fs-extra';
import { DSL, PublisherResult } from '@vize/types';
import { GeneratorResult, Maybe, PublishStatus } from '../../types';
import { getConfig } from '../../utils';

export type PublishStatusResponse = {
  status: PublishStatus;
  result?: GeneratorResult | PublisherResult;
  error?: Error;
};

const publishStatus = new Map<
  string,
  [PublishStatus, Maybe<GeneratorResult | PublisherResult>, Maybe<Error>]
>();

export function setPublishStatus(
  key: string,
  status: PublishStatus,
  error?: Error,
  result?: GeneratorResult | PublisherResult,
) {
  return publishStatus.set(key, [status, result, error]);
}

export function getPublishStatus(key: string): Maybe<PublishStatusResponse> {
  const [status, result, error] = publishStatus.get(key)!;
  return { status, result, error };
}

export const dslMap = new Map<string, DSL>();

export function createPreviewSoftlink(key: string, distPath: string) {
  const {
    paths: { previewPath },
  } = getConfig();
  const to = path.resolve(previewPath, key);
  return fs.ensureSymlink(distPath, to);
}
