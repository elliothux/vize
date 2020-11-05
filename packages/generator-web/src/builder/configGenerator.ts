import * as fs from 'fs';
import * as path from 'path';
import { Configuration } from 'webpack';
import { getBabelConfig, getSWConfig } from './babel';
import { BaseConfigParams, getBaseWebpackConfig } from './base';

export interface BuildConfigParams extends Pick<BaseConfigParams, 'containerPath'> {
  root: string;
  isMultiPage: boolean;
  entryPaths: { pageKey: number; entryPath?: string; pagePath: string }[];
  useSWC?: boolean;
  isProd?: boolean;
  containerParams: { [key: string]: BaseConfigParams['containerParams'] };
}

export function generateWebpackConfig({
  root,
  useSWC,
  entryPaths,
  isMultiPage,
  containerPath,
  containerParams,
  isProd = false,
}: BuildConfigParams): Configuration[] {
  const libs = path.resolve(root, './libs');
  const deps = path.resolve(root, './deps');
  const src = path.resolve(root, './src');
  const dist = path.resolve(root, `./dist`);

  const libPaths = fs.readdirSync(libs).map(name => path.resolve(libs, name));
  const libsNodeModules = libPaths.map(i => path.resolve(i, 'node_modules'));
  const libsSrc = libPaths.map(i => path.resolve(i, 'src'));

  const babelConfig = useSWC ? getSWConfig() : getBabelConfig();

  if (isMultiPage) {
    return entryPaths.map(({ pageKey, entryPath }) => {
      const config = getBaseWebpackConfig({ containerParams: containerParams[pageKey], containerPath, isProd });
      const output = entryPaths.length > 1 ? path.resolve(dist, pageKey.toString()) : dist;
      const modules = [src, deps, ...libsNodeModules, ...libsSrc];
      modules.push(entryPath!);

      config.entry = entryPath;
      config.output = { path: output };
      config.resolve.modules = modules;
      config.module.rules.unshift(babelConfig);
      return config;
    });
  }

  const config = getBaseWebpackConfig({ containerParams: containerParams['single'], containerPath, isProd });
  const mainEntry = path.resolve(root, './index');
  const entry = entryPaths.reduce<{ [key: string]: string }>(
    (accu, { pageKey, pagePath }) => {
      accu[`page-${pageKey}`] = pagePath!;
      return accu;
    },
    { index: mainEntry },
  );
  const modules = [src, deps, ...libsNodeModules, ...libsSrc, mainEntry];

  config.entry = entry;
  config.output = { path: dist, filename: '[name].js' };
  config.resolve.modules = modules;
  config.module.rules.unshift(babelConfig);
  config.optimization.splitChunks = {
    chunks: 'all',
  };
  return [config];
}
