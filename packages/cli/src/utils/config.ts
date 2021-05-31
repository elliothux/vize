import * as fs from 'fs';
import { MaterialsLibConfig, MaterialsLibRuntime } from '@vize/types';
import { LibPaths } from './paths';

let libConfig: Maybe<MaterialsLibConfig> = null;

export function getLibConfig({ config: configPath }: LibPaths): MaterialsLibConfig {
  if (libConfig) {
    return libConfig;
  }

  if (!fs.existsSync(configPath)) {
    throw `no config file "${configPath}"`;
  }

  const { libName, displayName, desc, thumb, author, runtime, server, __isBuildIn } = JSON.parse(
    fs.readFileSync(configPath, 'utf-8'),
  ) as Partial<MaterialsLibConfig>;

  if (typeof libName !== 'string') {
    throw `invalid field "libName": ${libName} in "${configPath}"`;
  }

  if (typeof server !== 'string') {
    throw `invalid field "server": ${server} in "${configPath}"`;
  }

  if (!Object.values(MaterialsLibRuntime).includes(runtime)) {
    throw `invalid field "runtime": ${runtime} in "${configPath}"`;
  }

  libConfig = { libName, displayName: displayName || libName, desc, thumb, runtime, server, author, __isBuildIn };

  return libConfig;
}
