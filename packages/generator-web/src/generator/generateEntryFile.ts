import { DSL, PageMode, ValueOfPromise, WorkspacePaths } from '@vize/types';
import { prepareFiles } from './prepareFiles';
import { getTpl } from '../template';

export function generateEntryFile(
  dsl: DSL,
  workspacePaths: WorkspacePaths,
  paths: ValueOfPromise<ReturnType<typeof prepareFiles>>,
) {
  if (dsl.editInfo.pageMode === PageMode.SINGLE) {
    return generateSingleEntryFile(dsl, workspacePaths, paths);
  }
}

async function generateSingleEntryFile(
  dsl: DSL,
  workspacePaths: WorkspacePaths,
  { globalPath }: ValueOfPromise<ReturnType<typeof prepareFiles>>,
) {
  const tpl = await getTpl('singleEntry');
}
