import * as path from 'path';
import * as process from 'process';
import { bootstrap, VizeCGIConfig } from './main';

export function runLocalServer() {
  if (!isRunningLocally()) {
    return;
  }

  const workspacePath = path.resolve(__dirname, '../../workspace');

  const config: VizeCGIConfig = {
    port: 4001,
    workspacePath,
    npmRegistry: 'https://registry.npm.taobao.org',
    db: {
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '2333',
      database: 'vize',
    },
  };

  return bootstrap(config);
}

function isRunningLocally() {
  const runPath = process.cwd();
  const currentPath = path.resolve(__dirname, '../../');
  return runPath === currentPath;
}
