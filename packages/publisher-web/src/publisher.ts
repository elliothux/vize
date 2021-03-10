import * as fs from 'fs-extra';
import * as path from 'path';
import { PublisherParams, PublisherResult, Maybe } from '@vize/types';

export async function publisher({
  dsl: { pageKey },
  workspacePaths: { publishPath },
  generatorResult,
}: PublisherParams): Promise<Maybe<PublisherResult>> {
  if (generatorResult.type === 'url') {
    return {
      type: 'url',
      url: generatorResult.url,
    };
  }

  const target = path.resolve(publishPath, pageKey);
  await fs.ensureDir(target);
  await fs.copy(generatorResult.path, target, { recursive: true });
  return { type: 'file' };
}
