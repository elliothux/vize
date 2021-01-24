import * as path from 'path';
import { Maybe } from 'types';

export interface DBConfig {
  type: 'mysql' | 'mariadb';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface VizeCGIConfig {
  port: number;
  workspacePath: string;
  db: DBConfig;
}

export interface VizeCGIConfigWithPaths extends VizeCGIConfig {
  paths: {
    workspacePath;
    buildPath;
    materialsPath;
    materialsVersionsPath;
  };
}

let config: Maybe<VizeCGIConfigWithPaths> = null;

export function setConfig(c: VizeCGIConfig) {
  const { workspacePath } = c;
  const buildPath = path.join(workspacePath, 'build');
  const materialsPath = path.join(workspacePath, 'materials');
  const materialsVersionsPath = path.join(workspacePath, 'materials_version');
  config = {
    ...c,
    paths: {
      workspacePath,
      buildPath,
      materialsPath,
      materialsVersionsPath,
    },
  };
}

export function getConfig(): Maybe<VizeCGIConfigWithPaths> {
  return config;
}
