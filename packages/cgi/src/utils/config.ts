/* eslint-disable @typescript-eslint/no-var-requires */
import * as path from 'path';
import { Maybe } from '../types';
import { VizeCGIConfigWithPaths, VizeCGIConfig } from '../types';

let config: Maybe<VizeCGIConfigWithPaths> = null;

const resolveOptions = {
  paths: [path.resolve(process.cwd(), 'node_modules')],
};

export function setConfig(c: VizeCGIConfig) {
  const { workspacePath, generators = {}, publishers = {}, resources = {} } = c;
  const buildPath = path.join(workspacePath, 'build');
  const previewPath = path.join(workspacePath, 'preview');
  const publishPath = path.join(workspacePath, 'publish');
  const materialsPath = path.join(workspacePath, 'materials');
  const materialsVersionsPath = path.join(workspacePath, 'materials_version');
  const uploadFilesPath = path.join(workspacePath, 'upload');
  const logsPath = path.join(workspacePath, 'logs');

  config = {
    ...c,
    generators: {
      ...generators,
      web:
        generators.web ||
        require(require.resolve('@vize/generator-web', resolveOptions)).default,
    },
    publishers: {
      ...publishers,
      web:
        publishers.web ||
        require(require.resolve('@vize/publisher-web', resolveOptions)).default,
    },
    resources: {
      onUpload: resources.onUpload || (() => Promise.resolve(null)),
      onDelete: resources.onDelete || (() => Promise.resolve(null)),
    },
    paths: {
      root: workspacePath,
      buildPath,
      previewPath,
      publishPath,
      materialsPath,
      materialsVersionsPath,
      uploadFilesPath,
      logsPath,
      editorPath: c.editorPath || resolvePackageBuildPath('editor'),
      managementUIPath:
        c.managementUIPath || resolvePackageBuildPath('management-ui'),
    },
  };
}

function resolvePackageBuildPath(packageName: string) {
  return path.resolve(
    path.dirname(require.resolve(`@vize/${packageName}`, resolveOptions)),
    'build',
  );
}

export function getConfig(): Maybe<VizeCGIConfigWithPaths> {
  return config;
}
