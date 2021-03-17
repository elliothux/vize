/* eslint-disable @typescript-eslint/no-var-requires */
import * as path from 'path';
import { Maybe } from '../types';
import { VizeCGIConfigWithPaths, VizeCGIConfig } from '../types';

let config: Maybe<VizeCGIConfigWithPaths> = null;

export function setConfig(c: VizeCGIConfig) {
  const { workspacePath, generators = {}, publishers = {}, resources = {} } = c;
  const buildPath = path.join(workspacePath, 'build');
  const previewPath = path.join(workspacePath, 'preview');
  const publishPath = path.join(workspacePath, 'publish');
  const materialsPath = path.join(workspacePath, 'materials');
  const materialsVersionsPath = path.join(workspacePath, 'materials_version');
  const uploadFilesPath = path.join(workspacePath, 'upload');

  config = {
    ...c,
    generators: {
      ...generators,
      web:
        generators.web ||
        require(require.resolve('@vize/generator-web')).default,
    },
    publishers: {
      ...publishers,
      web:
        publishers.web ||
        require(require.resolve('@vize/publisher-web')).default,
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
      editorPath: c.editorPath || require.resolve('@vize/editor/build'),
      managementUIPath:
        c.managementUIPath || require.resolve('@vize/management-ui/build'),
    },
  };
}

export function getConfig(): Maybe<VizeCGIConfigWithPaths> {
  return config;
}
