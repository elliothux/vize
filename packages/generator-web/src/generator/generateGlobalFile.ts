import * as path from 'path';
import * as fs from 'fs-extra';
import { DSL, ValueOfPromise, WorkspacePaths } from '@vize/types';
import { Seeds } from '../types';
import { getTpl } from '../template';
import { prepareFiles } from './prepareFiles';
import { generateComponentsSeeds, generateEventsSeeds, generatePluginsSeeds } from './generateSeed';
import { generateImportWithVars } from './generateImport';
import { stringify } from './utils';

export async function generateGlobalFile(
  dsl: DSL,
  workspacePaths: WorkspacePaths,
  { globalPath }: ValueOfPromise<ReturnType<typeof prepareFiles>>,
) {
  const tpl = await getTpl('global');
  const seeds = generateGlobalSeeds(dsl);
  const params = generateGlobalTplParams(dsl, seeds);
  const result = tpl(params);

  const target = path.resolve(globalPath, './index.ts');
  await fs.writeFile(target, result, { encoding: 'utf-8' });
  return target;
}

interface GlobalTplParams {
  imports: string;
  componentsVars: string;
  pluginVars: string;
  actionVars: string;
  meta: string;
  globalData: string;
  globalStyle: string;
  globalEvents: string;
  sharedComponentInstances: string;
  sharedPluginInstances: string;
}

function generateGlobalTplParams(
  {
    meta,
    data: globalData,
    style: globalStyle,
    events: globalEvents,
    sharedComponentInstances,
    sharedPluginInstances,
  }: DSL,
  seeds: Seeds,
): GlobalTplParams {
  const { imports, componentsVars, pluginVars, actionVars } = generateImportWithVars(seeds);

  return {
    imports,
    componentsVars,
    pluginVars,
    actionVars,
    meta: stringify(meta),
    globalData: stringify(globalData),
    globalStyle: stringify(globalStyle),
    globalEvents: stringify(globalEvents),
    sharedComponentInstances: stringify(sharedComponentInstances || []),
    sharedPluginInstances: stringify(sharedPluginInstances || []),
  };
}

function generateGlobalSeeds({ sharedComponentInstances, sharedPluginInstances, events }: DSL): Seeds {
  const seeds: Seeds = {
    components: {},
    plugins: {},
    actions: {},
  };
  if (sharedComponentInstances?.length) {
    generateComponentsSeeds(sharedComponentInstances, seeds);
  }
  if (sharedPluginInstances?.length) {
    generatePluginsSeeds(sharedPluginInstances, seeds);
  }
  if (events?.length) {
    generateEventsSeeds(events, seeds);
  }
  return seeds;
}
