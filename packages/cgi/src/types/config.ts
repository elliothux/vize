import { Generator, Publisher, WorkspacePaths } from '@vize/types';
import { CGIMiddleware } from './middleware';
import { UploadResourceCallback, DeleteResourceCallback } from '../types';

export interface DBConfig {
  type: 'mysql' | 'mariadb';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface VizeCGIConfig {
  workspacePath: string;
  port: number;
  db: DBConfig;
  npmRegistry?: string;
  editorPath?: string;
  managementUIPath?: string;
  middlewares?: {
    [name: string]: CGIMiddleware | CGIMiddleware[];
  };
  generators?: {
    web?: Generator;
    [name: string]: Generator;
  };
  publishers?: {
    web?: Publisher;
    [name: string]: Publisher;
  };
  resources?: {
    onUpload?: UploadResourceCallback;
    onDelete?: DeleteResourceCallback;
  };
}

export interface VizeCGIConfigWithPaths extends VizeCGIConfig {
  paths: WorkspacePaths;
  generators: {
    web: Generator;
    [name: string]: Generator;
  };
  publishers: {
    web: Publisher;
    [name: string]: Publisher;
  };
  resources: {
    onUpload: UploadResourceCallback;
    onDelete: DeleteResourceCallback;
  };
}
