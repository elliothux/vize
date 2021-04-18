import { GeneratorParams, GeneratorResult } from '@vize/types';
import { prepareFiles } from './prepareFiles';
import { generateGlobalFile } from './generateGlobalFile';
import { generatePageFiles } from './generatePageFiles';
import { generateEntryFile } from './generateEntryFile';
import { runBuild } from '../builder';

export async function generate({ dsl, workspacePaths, isPreview }: GeneratorParams) {
  const generatorPaths = await prepareFiles(dsl, workspacePaths);
  await generateGlobalFile(dsl, workspacePaths, generatorPaths);
  await generatePageFiles(dsl, workspacePaths, generatorPaths);
  const entries = await generateEntryFile(dsl, workspacePaths, generatorPaths);
  await runBuild({
    entries,
    dsl,
    workspacePaths,
    generatorPaths,
    isProd: !isPreview,
  });
  return <GeneratorResult>{ type: 'file', path: generatorPaths.pagePath };
}
