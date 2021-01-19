import * as fs from 'fs';
import { LibPaths } from '../utils';

export enum LibConfigRuntime {
  REACT = 'react',
  RAX = 'rax',
}

export interface LibConfig {
  libName: string;
  author?: string;
  runtime: LibConfigRuntime;
  __isBuildIn?: boolean;
}

let libConfig: Maybe<LibConfig> = null;

export function getLibConfig({ config: configPath }: LibPaths): LibConfig {
  if (libConfig) {
    return libConfig;
  }

  if (!fs.existsSync(configPath)) {
    throw `no config file "${configPath}"`;
  }

  const { libName, author, runtime, __isBuildIn } = JSON.parse(fs.readFileSync(configPath, 'utf-8')) as Partial<
    LibConfig
  >;

  if (typeof libName !== 'string') {
    throw `invalid libName: ${libName} in "${configPath}"`;
  }

  if (!Object.values(LibConfigRuntime).includes(runtime)) {
    throw `invalid runtime: ${runtime} in "${configPath}"`;
  }

  libConfig = { libName, runtime, author, __isBuildIn };

  return libConfig;
}
