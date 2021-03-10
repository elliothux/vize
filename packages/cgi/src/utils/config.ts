import * as path from 'path';
import { Maybe } from '../types';
import { VizeCGIConfigWithPaths, VizeCGIConfig } from '../types';

let config: Maybe<VizeCGIConfigWithPaths> = null;

export function setConfig(c: VizeCGIConfig) {
  const { workspacePath } = c;
  const buildPath = path.join(workspacePath, 'build');
  const previewPath = path.join(workspacePath, 'preview');
  const publishPath = path.join(workspacePath, 'publish');
  const materialsPath = path.join(workspacePath, 'materials');
  const materialsVersionsPath = path.join(workspacePath, 'materials_version');
  const uploadFilesPath = path.join(workspacePath, 'upload');
  config = {
    ...c,
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
