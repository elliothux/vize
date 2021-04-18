import * as fs from 'fs';
import * as path from 'path';
import { Configuration } from 'webpack';
import { PageMode } from '@vize/types';
import { getBabelConfig, getSWConfig } from './babel';
import { getWebpackConfig } from './config';
import { BuildConfigParams } from './types';

export function generateWebpackConfig({
  entries,
  dsl: {
    data: globalData,
    style: globalStyle,
    meta,
    editInfo: { pageMode },
  },
  generatorPaths,
  useSWC = false,
  isProd = false,
}: BuildConfigParams): Configuration[] {
  const { libsPath, srcPath, previewPath, distPath } = generatorPaths;
  const dist = isProd ? distPath : previewPath;
  const libPaths = fs
    .readdirSync(libsPath)
    .filter(i => !/\.DS_Store/.test(i))
    .map(name => path.resolve(libsPath, name));
  const libsNodeModules = libPaths.map(i => path.resolve(i, 'node_modules'));
  const libsSrc = libPaths.map(i => path.resolve(i, 'src'));
  const runNodeModulesPath = path.resolve(process.cwd(), './node_modules');
  const runtimePath = path.resolve(runNodeModulesPath, '@vize/runtime');

  const babelConfig = useSWC ? getSWConfig() : getBabelConfig();
  const modules = [srcPath, runNodeModulesPath, runtimePath, ...libsNodeModules, ...libsSrc];
  console.log('modules: ', modules);

  const containerParams = {
    meta,
    globalData,
    globalStyle,
  };
  if (pageMode === PageMode.MULTI) {
    return entries.map(entry => {
      const config = getWebpackConfig({ isProd, generatorPaths, containerParams });
      const output = entries.length > 1 ? path.resolve(dist, path.basename(entry)) : dist;
      modules.push(entry);

      config.entry = entry;
      config.output = { path: output };
      config.resolve.modules = modules;
      config.module.rules.unshift(babelConfig);
      return config;
    });
  }

  const config = getWebpackConfig({ isProd, generatorPaths, containerParams });
  // const mainEntry = path.resolve(root, './index');
  // const entry = entryPaths.reduce<{ [key: string]: string }>(
  //   (accu, { pageKey, pagePath }) => {
  //     accu[`page-${pageKey}`] = pagePath!;
  //     return accu;
  //   },
  //   { index: mainEntry },
  // );

  config.entry = entries[0];
  config.output = { path: dist, filename: '[name].js' };
  config.resolve.modules = modules;
  config.module.rules.unshift(babelConfig);
  config.optimization.splitChunks = {
    chunks: 'all',
  };
  return [config];
}
