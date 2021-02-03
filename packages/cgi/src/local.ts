import * as path from 'path';
import * as process from 'process';
import { bootstrap, VizeCGIConfig } from './main';

export function runLocalServer() {
  if (!isRunningLocally()) {
    return;
  }

  const workspacePath = path.resolve(__dirname, '../workspace');
  const editorPath = path.resolve(__dirname, '../../editor/build');
  const managementUIPath = path.resolve(__dirname, '../../management-ui/build');

  const config: VizeCGIConfig = {
    port: 4001,
    workspacePath,
    editorPath,
    managementUIPath,
    npmRegistry: 'https://registry.npm.taobao.org',
    db: {
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '2333',
      database: 'vize',
    },
    generators: {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      web: require(path.resolve(__dirname, '../../generator-web')).default,
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      pegasus: require(path.resolve(__dirname, '../../generator-pegasus'))
        .default,
    },
  };

  return bootstrap(config);
}

function isRunningLocally() {
  const runPath = process.cwd();
  const currentPath = path.resolve(__dirname, '../');
  return runPath === currentPath;
}
