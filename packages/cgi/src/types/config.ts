import { Generator } from '@vize/types';
import { CGIMiddlewareItem } from './middleware';

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
  editorPath?: string;
  managementUIPath?: string;
  npmRegistry?: string;
  db: DBConfig;
  generators?: {
    [name: string]: Generator;
  };
  middlewares?: {
    [name: string]: CGIMiddlewareItem;
  };
}

export interface VizeCGIConfigWithPaths extends VizeCGIConfig {
  paths: {
    workspacePath: string;
    buildPath: string;
    previewPath: string;
    materialsPath: string;
    materialsVersionsPath: string;
    editorPath: string;
    managementUIPath: string;
  };
}
