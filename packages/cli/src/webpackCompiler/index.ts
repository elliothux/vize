import path from 'path';
import fs from 'fs-extra';
import { Configuration } from 'webpack';
import { LibPaths } from '../utils';
import { LibConfig } from '../config';
import { getLibDefaultWebpackConfig } from './lib.default';

export interface Options {
  libPaths: LibPaths;
  libConfig: LibConfig;
  isProd: boolean;
  withForms: boolean;
  useSWC?: boolean;
}

export function getLibWebpackConfig(options: Options): Configuration {
  const { libPaths } = options;
  const { webpackConfigs } = libPaths;
  let config = getLibDefaultWebpackConfig(options);

  const libConfigPath = path.resolve(webpackConfigs, './lib.dev.js');
  if (fs.existsSync(libConfigPath)) {
    // eslint-disable-next-line
    config = require(libConfigPath)(config);
  }

  return config;
}
