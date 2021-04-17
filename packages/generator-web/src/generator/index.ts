import { GeneratorParams, GeneratorResult } from '@vize/types';
import { prepareFiles } from './prepareFiles';
import { generateGlobalFile } from './generateGlobalFile';
import { generatePageFiles } from './generatePageFiles';
import { generateEntryFile } from './generateEntryFile';

export async function generate({ dsl, workspacePaths, isPreview }: GeneratorParams) {
  const paths = await prepareFiles(dsl, workspacePaths);
  await generateGlobalFile(dsl, workspacePaths, paths);
  await generatePageFiles(dsl, workspacePaths, paths);
  await generateEntryFile(dsl, workspacePaths, paths);
  return <GeneratorResult>{ type: 'file', path: paths.pagePath };
}
