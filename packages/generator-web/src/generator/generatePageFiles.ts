import { DSL, PageInstanceDSL, ValueOfPromise, WorkspacePaths } from '@vize/types';
import { prepareFiles } from './prepareFiles';
import { getTpl } from '../template';
import { Seeds } from '../types';
import { generateComponentsSeeds, generateEventsSeeds, generatePluginsSeeds } from './generateSeed';
import { generateImportWithVars } from './generateImport';
import { stringify } from './utils';
import path from 'path';
import * as fs from 'fs-extra';

export async function generatePageFiles(
  dsl: DSL,
  workspacePaths: WorkspacePaths,
  paths: ValueOfPromise<ReturnType<typeof prepareFiles>>,
) {
  return Promise.all(dsl.pageInstances.map(page => generatePage(page, workspacePaths, paths)));
}

async function generatePage(
  page: PageInstanceDSL,
  workspacePaths: WorkspacePaths,
  { pagesPath }: ValueOfPromise<ReturnType<typeof prepareFiles>>,
) {
  const tpl = await getTpl('page');
  const seeds = generatePageSeeds(page);
  const params = generatePageTplParams(page, seeds);
  const result = tpl(params);

  const targetPath = path.resolve(pagesPath, page.key.toString());
  await fs.ensureDir(targetPath);

  const target = path.resolve(targetPath, 'index.tsx');
  await fs.writeFile(target, result, { encoding: 'utf-8' });
  return target;
}

interface PageTplParams {
  imports: string;
  componentsVars: string;
  pluginVars: string;
  actionVars: string;
  pageInfo: string;
  data: string;
  style: string;
  componentInstances: string;
  pluginInstances: string;
  events: string;
}

function generatePageTplParams(
  { key, name, path, isHome, componentInstances, pluginInstances, data, style, events }: PageInstanceDSL,
  seeds: Seeds,
): PageTplParams {
  const { imports, componentsVars, pluginVars, actionVars } = generateImportWithVars(seeds);
  const page = { key, name, path, isHome };

  return {
    imports,
    componentsVars,
    pluginVars,
    actionVars,
    pageInfo: stringify(page),
    data: stringify(data),
    style: stringify(style),
    componentInstances: stringify(componentInstances),
    pluginInstances: stringify(pluginInstances),
    events: stringify(events),
  };
}

function generatePageSeeds({ componentInstances, pluginInstances, events }: PageInstanceDSL): Seeds {
  const seeds: Seeds = {
    components: {},
    plugins: {},
    actions: {},
  };
  if (componentInstances?.length) {
    generateComponentsSeeds(componentInstances, seeds);
  }
  if (pluginInstances?.length) {
    generatePluginsSeeds(pluginInstances, seeds);
  }
  if (events?.length) {
    generateEventsSeeds(events, seeds);
  }
  return seeds;
}
