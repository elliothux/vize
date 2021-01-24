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

let config: Maybe<VizeCGIConfig> = null;

export function setConfig(c: VizeCGIConfig) {
  config = c;
}

export function getConfig(): Maybe<VizeCGIConfig> {
  return config;
}
