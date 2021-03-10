import { Generator, Publisher, WorkspacePaths } from '@vize/types';
import { CGIMiddleware } from './middleware';

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
  middlewares?: {
    [name: string]: CGIMiddleware | CGIMiddleware[];
  };
  generators: {
    web: Generator;
    [name: string]: Generator;
  };
  publishers: {
    web: Publisher;
    [name: string]: Publisher;
  };
}

export interface VizeCGIConfigWithPaths extends VizeCGIConfig {
  paths: WorkspacePaths;
}
