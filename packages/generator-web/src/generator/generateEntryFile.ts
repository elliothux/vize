import { DSL, PageMode, ValueOfPromise, WorkspacePaths } from '@vize/types';
import { prepareFiles } from './prepareFiles';
import { getTpl } from '../template';
import { stringify } from './utils';
import path from 'path';
import * as fs from 'fs-extra';

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
  { srcPath }: ValueOfPromise<ReturnType<typeof prepareFiles>>,
) {
  const tpl = await getTpl('singleEntry');
  const params = generateSingleTplParams(dsl);
  const result = tpl(params);

  const target = path.resolve(srcPath, 'index.tsx');
  await fs.writeFile(target, result, { encoding: 'utf-8' });
  return target;
}

interface SingleEntryTplParams {
  pages: string;
  pageImports: string;
  entry: string;
}

function generateSingleTplParams({ pageInstances }: DSL): SingleEntryTplParams {
  let pageImports = stringify(
    pageInstances.reduce<{ [key: number]: string }>((imports, { key }) => {
      imports[key] = `import('./pages/${key}')`;
      return imports;
    }, {}),
  );

  pageInstances.forEach(({ key }) => {
    pageImports = pageImports.replace(`"import('./pages/${key}')"`, `import('./pages/${key}')`);
  });

  return {
    pages: stringify(
      pageInstances.map(({ key, name, path, isHome }) => ({
        key,
        name,
        path,
        isHome,
      })),
    ),
    pageImports,
    entry: '#vize-main-entry',
  };
}
